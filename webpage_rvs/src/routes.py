from webpage_rvs import app

from flask import request, jsonify
from webpage_rvs.src.constants import (
    CLINICAL_QUESTIONS,
    FUNCTIONAL_QUESTIONS,
    PHYLOP_CUTOFF,
    PHASTCONS_CUTOFF,
    CADD_CUTOFF,
    AF_CUTOFF
)
from webpage_rvs.src.variant import (
    SNV
)

@app.route('/')
def index():
    output = "{}".format(request.method)
    return output


@app.route('/initial_scores', methods=["POST"])
def calculate_initial_scores():
    """
    """
    if request.method == "POST":
        response = {
            "scores": {},
            "additional_info": {}
        }
        #try:
        #print(request.json)
        results = request.json
        snv = SNV(
            ref_genome=results["ref_genome"],
            chro=int(results["chro"]),
            pos=int(results["pos"]),
            alt=results["alt"].upper(),
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
        response["additional_info"]["c_2_3"] = "CADD score: {}".format(snv.cadd_score)
        if snv.cadd_score > CADD_CUTOFF:
            response["scores"]["c_2_3"] = "1"
        else:
            response["scores"]["c_2_3"] = "0"

        # Check PhyloP and PhastCons scores
        snv.set_phylop_score()
        snv.set_phastcons_score()
        response["additional_info"]["c_1_1"] = "PhyloP score: {}\nPhastCons score: {}".format(snv.phylop_score, snv.phastcons_score)
        if snv.phylop_score > PHASTCONS_CUTOFF or snv.phastcons_score > PHASTCONS_CUTOFF:
            response["scores"]["c_1_1"] = "1"
        else:
            response["scores"]["c_1_1"] = "0"

        # Check gnomAD AF
        snv.set_af()
        response["additional_info"]["c_1_2"] = "Allele Frequency: {}".format(snv.af)
        if snv.af < AF_CUTOFF:
            response["scores"]["c_1_2"] = "1"
        else:
            response["scores"]["c_1_2"] = "0"

        # Check cCRE info
        snv.set_ccre_info()
        response["additional_info"]["f_1_2"] = "temp"
        if len(snv.ccre_info) > 0:
            response["scores"]["f_1_2"] = "1"
        else:
            response["scores"]["f_1_2"] = "0"

        # Check CRM
        response["additional_info"]["f_1_1"] = "temp"

        # Check Hi-C
        response["additional_info"]["f_1_3"] = "temp"

        # Check eQTL
        response["additional_info"]["f_1_4"] = "temp"

        #except Exception as e:
        #    print(e)
        #    response = jsonify({"error": str(e)})
        #    return response
    print(response)
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
        
        rve = scores[0] + scores[1]
        response = {
            "clinical": str(scores[0]),
            "functional": str(scores[1]),
            "rve": str(rve)
        }
        #except Exception as e:
        #    response = jsonify({"error": str(e)})
        #    return response
    print(response)
    return jsonify(response)


def calc_all_scores(data):
    """
    """
    clinical = 0
    functional = 0
    for key, val in data.items():
        if key.startswith("c_"):
            base = key.split("_")[1]
            new_score = int(val)*(int(base)**2)
            clinical += int(val)*(int(base)**2)
            print("KEY: {}, INITIAL: {}, SCORE: {}".format(key, val, new_score))
        elif key.startswith("f_"):
            base = key.split("_")[1]
            new_score = int(val)*(int(base)**2)
            functional += int(val)*(int(base)**2)
            print("KEY: {}, INITIAL: {}, SCORE: {}".format(key, val, new_score))

    return (clinical, functional)
