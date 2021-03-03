import sys
import logging
from webpage_rvs import app

from flask import request, jsonify
from webpage_rvs.src.constants import (
    LOGGING_FORMAT,
    CLINICAL_QUESTIONS,
    FUNCTIONAL_QUESTIONS,
    PHYLOP_CUTOFF,
    PHASTCONS_CUTOFF,
    CADD_CUTOFF,
    AF_CUTOFF,
    C_3_1_LABELS,
)
from webpage_rvs.src.variant import (
    SNV
)
from webpage_rvs.src.helpers import (
    get_rve_density,
    get_nearest
)

# Set up logging
logging.basicConfig(format=LOGGING_FORMAT, stream=sys.stderr, level=logging.INFO)

@app.route('/')
def index():
    output = "{}".format(request.method)
    return output


@app.route('/initial_scores', methods=["POST"])
def calculate_initial_scores():
    """
    """
    response = {}
    if request.method == "POST":
        response = {
            "scores": {},
            "additional_info": {
                "c_1_1": {
                    "phylop": "",
                    "phastcons": "",
                },
                "c_1_2": {
                    "af": "",
                },
                "c_2_3": {
                    "cadd_score": "",
                },
                "c_3_1": "",
                "f_1_1": {
                    "crms": "None",
                },
                "f_1_2": {
                    "ccres": [],
                    "ccre_descriptions": [],
                },
                "f_1_3": "",
                "f_1_4": ""
            }
        }
        #try:
        #print(request.json)
        results = request.json
        snv = SNV(
            ref_genome=results["ref_genome"],
            chro=int(results["chro"]),
            pos=int(results["pos"]),
            alt=results["alt"].upper(),
            target_gene=results["target_gene"],
            patient_id=results["patient_id"],
            variant_id=results["variant_id"],
        )
        for key, value in results.items():
            if key in CLINICAL_QUESTIONS or key in FUNCTIONAL_QUESTIONS:
                if value == "yes":
                    response["scores"][key] = "1"
                else:
                    response["scores"][key] = "0"

        # Check CADD and FATHMM scores
        snv.set_cadd_score()
        # TODO: FATHMM
        #response["additional_info"]["c_2_3"] = "CADD score: {}".format(snv.cadd_score)
        response["additional_info"]["c_2_3"]["cadd_score"] = str(snv.cadd_score)
        if snv.cadd_score > CADD_CUTOFF:
            response["scores"]["c_2_3"] = "1"
        else:
            response["scores"]["c_2_3"] = "0"

        # Check PhyloP and PhastCons scores
        snv.set_phylop_score()
        snv.set_phastcons_score()
        #response["additional_info"]["c_1_1"] = "PhyloP {{\n}}score: {0}{{\n}}PhastCons score: {1}".format(snv.phylop_score, snv.phastcons_score)
        response["additional_info"]["c_1_1"]["phylop"] = str(snv.phylop_score)
        response["additional_info"]["c_1_1"]["phastcons"] = str(snv.phastcons_score)
        if snv.phylop_score > PHASTCONS_CUTOFF or snv.phastcons_score > PHASTCONS_CUTOFF:
            response["scores"]["c_1_1"] = "1"
        else:
            response["scores"]["c_1_1"] = "0"

        # Check gnomAD AF
        snv.set_af()
        #response["additional_info"]["c_1_2"] = "gnomAD Allele Frequency: {}".format(snv.af)
        response["additional_info"]["c_1_2"]["af"] = '%.4E' % snv.af #str(snv.af)
        if snv.af < AF_CUTOFF:
            response["scores"]["c_1_2"] = "1"
        else:
            response["scores"]["c_1_2"] = "0"

        # Check cCRE info
        snv.set_ccre_info()
        if len(snv.ccre_info) > 0:
            response["scores"]["f_1_2"] = "1"
            # ccre_string = ""
            # for ccre in snv.ccre_info:
            #     ccre_string += " {}\n".format(ccre["ccre"], ccre["description"])
            # out_string = "cCREs:\n\n{}".format(ccre_string)
            # response["additional_info"]["f_1_2"] = out_string
            ccres, ccre_descriptions = [], []
            for ccre in snv.ccre_info:
                ccres.append(ccre["ccre"])
                ccre_descriptions.append(ccre["description"])
            response["additional_info"]["f_1_2"]["ccres"] = ccres
            response["additional_info"]["f_1_2"]["ccre_descriptions"] = ccre_descriptions
        else:
            response["scores"]["f_1_2"] = "0"
            response["additional_info"]["f_1_2"]["ccres"] = "None"
            response["additional_info"]["f_1_2"]["ccre_descriptions"] = "None"

        # Check CRM
        snv.set_remap_score()
        if len(snv.crms) > 0:
            #print(snv.crms)
            response["scores"]["f_1_1"] = "1"

            # TODO: Check for string error???
            crm_string = ", ".join(snv.crms[0:3])
            if len(snv.crms) > 2:
                crm_string += ", and more"
            response["additional_info"]["f_1_1"]["crms"] = crm_string
            #response["additional_info"]["f_1_1"]["crms"] = list(snv.crms)
        else:
            response["scores"]["f_1_1"] = "0"
            # response["additional_info"]["f_1_1"] = "No ReMap 2020 peaks found"\

        # Check Hi-C
        snv.set_ccre_method()
        if "Hi-C" in snv.ccre_methods:
            response["scores"]["f_1_3"] = "1"
            response["additional_info"]["f_1_3"] = "Hi-C"
        elif "RNAPII ChIA-PET" in snv.ccre_methods:
            response["scores"]["f_1_3"] = "1"
            response["additional_info"]["f_1_3"] = "ChIA-PET"
        else:
            response["scores"]["f_1_3"] = "0"
            response["additional_info"]["f_1_3"] = "None"

        # Check eQTL
        if "eQTL" in snv.ccre_methods:
            response["scores"]["f_1_4"] = "1"
            response["additional_info"]["f_1_4"] = "eQTL"
        else:
            response["scores"]["f_1_4"] = "0"
            response["additional_info"]["f_1_4"] = "None"

        # Check c3.1
        if results["c_3_1"] == "yes":
            # Add additional info
            response["additional_info"]["c_3_1"] = C_3_1_LABELS[results["c_3_1_additional"]]
        else:
            response["additional_info"]["c_3_1"] = ""

        # Ask about C2.5
        response["scores"]["c_2_5"] = "0"

        #except Exception as e:
        #    print(e)
        #    response = jsonify({"error": str(e)})
        #    return response
        response["positions"] = {
            "hg19": "-".join([str(snv.chro), str(snv.ref_assemblies["hg19"]), snv.ref, snv.alt]),
            "hg38": "-".join([str(snv.chro), str(snv.ref_assemblies["hg38"]), snv.ref, snv.alt]),
        }

        #print(response)
    return jsonify(response)
    #return response


@app.route('/calc_scores', methods=["POST"])
def calculate_scores():
    """
    """
    if request.method == "POST":
        # try:
            #clinical, functional = 0, 0

            #for key, val in request.json.items():
            #    print(key)
            #    print(val)
        scores = calc_all_scores(request.json)
        print(request.json)
        
        rve = scores[0] + scores[1]
        response = {
            "clinical": str(scores[0]),
            "functional": str(scores[1]),
            "rve": str(rve)
        }
        #except Exception as e:
        #    response = jsonify({"error": str(e)})
        #    return response
        rve_density = get_rve_density()
        rve_density["nearest_val"] = str(get_nearest(rve_density["x"], rve))
        response["standard_rve"] = rve_density

    return jsonify(response)


def calc_all_scores(data):
    """
    """
    clinical = 0
    functional = 0
    for key, val in data.items():
        if key.startswith("c_") and not key.endswith("_comments"):
            base = key.split("_")[1]
            new_score = int(val)*(int(base)**2)
            clinical += int(val)*(int(base)**2)
            print("KEY: {}, INITIAL: {}, SCORE: {}".format(key, val, new_score))
        elif key.startswith("f_") and not key.endswith("_comments"):
            base = key.split("_")[1]
            new_score = int(val)*(int(base)**2)
            functional += int(val)*(int(base)**2)
            print("KEY: {}, INITIAL: {}, SCORE: {}".format(key, val, new_score))

    return (clinical, functional)
