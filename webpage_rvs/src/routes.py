import os
import sys
import uuid
import logging
from webpage_rvs import (
    app,
    #db
    dynamo,
    mail
)

from flask import request, jsonify
from flask_mail import Message
from dotenv import load_dotenv, find_dotenv
from webpage_rvs.src.constants import (
    LOGGING_FORMAT,
    CLINICAL_QUESTIONS,
    FUNCTIONAL_QUESTIONS,
    PHYLOP_CUTOFF,
    PHASTCONS_CUTOFF,
    CADD_CUTOFF,
    AF_CUTOFF,
    DEFAULT_DICT,
    ADDITIONAL_INFO_DICT,
    EXTERNAL_LINKS_DICT,
    GNOMAD_ASSEMBLY,
)
from webpage_rvs.src.templates import (
    FAMILIAL_SEGREGATION_MAP,
    #C_3_1_MAP,
    EMAIL_MSG_TEMPLATE,
    EMAIL_RECIPIENT_MAP,
    DBSNP_URL_TEMPLATE,
    GNOMAD_URL_TEMPLATE,
    CLINVAR_URL_TEMPLATE,
    GNOMAD_DATASETS
)
from webpage_rvs.src.variant import (
    SNV
)
from webpage_rvs.src.helpers import (
    get_rve_density,
    get_nearest,
    get_evidence_labels
)

# Load the environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(find_dotenv())

# Set up logging
logging.basicConfig(format=LOGGING_FORMAT, stream=sys.stderr, level=logging.INFO)

@app.route('/')
def index():
    output = "{}".format(request.method)
    return output


@app.route('/api/initial_scores', methods=["POST"])
def calculate_initial_scores():
    """
    """
    if request.method == "POST":
        # Get info from body of the request
        body = request.json

        # Create the SNV object
        snv = SNV(
            ref_genome=body["query"]["ref_genome"],
            chro=int(body["query"]["chro"]),
            pos=int(body["query"]["pos"]),
            alt=body["query"]["alt"].upper(),
            target_gene=body["query"]["target_gene"],
            patient_id=body["query"]["patient_id"],
            variant_id=body["query"]["variant_id"],
        )

        # Form the response
        response = {
            "evidence_description": get_evidence_labels(
                                        body["variant_info"]["variant_pos"],
                                        body["variant_info"]["variant_name"],
                                        body["variant_info"]["target_gene"]
                                    ),
            "initial_scores": DEFAULT_DICT,
            "additional_info": ADDITIONAL_INFO_DICT,
            "external_links": EXTERNAL_LINKS_DICT
        }

        # Get initial scores
        for key, value in body["query"].items():
            if key in CLINICAL_QUESTIONS or key in FUNCTIONAL_QUESTIONS:
                if value == "yes":
                    response["initial_scores"][key] = "1"
                else:
                    response["initial_scores"][key] = "0"

        # Familial Segregation
        # if response["initial_scores"]["c_3_1"] == "1":
        #     response["additional_info"]["c_3_1"] = FAMILIAL_SEGREGATION_MAP[body["query"]["c_3_1_additional"]]

        # Check CADD and FATHMM scores
        snv.set_cadd_score()
        # TODO: FATHMM
        response["additional_info"]["c_2_3"]["cadd_score"] = str(snv.cadd_score)
        if snv.cadd_score > CADD_CUTOFF:
            response["initial_scores"]["c_2_3"] = "1"
        else:
            response["initial_scores"]["c_2_3"] = "0"

        # Check PhyloP and PhastCons scores
        snv.set_phylop_score()
        snv.set_phastcons_score()
        response["additional_info"]["c_1_1"]["phylop"] = str(snv.phylop_score)
        response["additional_info"]["c_1_1"]["phastcons"] = str(snv.phastcons_score)
        if snv.phylop_score > PHYLOP_CUTOFF or snv.phastcons_score > PHASTCONS_CUTOFF:
            response["initial_scores"]["c_1_1"] = "1"
        else:
            response["initial_scores"]["c_1_1"] = "0"

        # Check gnomAD AF
        snv.set_gnomad_info()
        response["additional_info"]["c_1_2"]["af"] = '%.4E' % snv.af
        if snv.af < AF_CUTOFF:
            response["initial_scores"]["c_1_2"] = "1"
        else:
            response["initial_scores"]["c_1_2"] = "0"

        # Check number of homozygotes
        if body["variant_info"]["genotype"] == "homozygous":
            response["additional_info"]["c_1_2"]["num_homozygotes"] = str(snv.num_homozygotes)

        # Check cCRE info
        snv.set_ccre_info()
        if len(snv.ccre_info) > 0:
            response["initial_scores"]["f_1_2"] = "1"
            ccres, ccre_descriptions = [], []
            for ccre in snv.ccre_info:
                ccres.append(ccre["ccre"])
                ccre_descriptions.append(ccre["description"])
            response["additional_info"]["f_1_2"]["ccres"] = ccres
            response["additional_info"]["f_1_2"]["ccre_descriptions"] = ccre_descriptions
        else:
            response["initial_scores"]["f_1_2"] = "0"
            response["additional_info"]["f_1_2"]["ccres"] = "None"
            response["additional_info"]["f_1_2"]["ccre_descriptions"] = "None"

        # Check CRM
        snv.set_remap_score()
        if len(snv.crms) > 0:
            response["initial_scores"]["f_1_1"] = "1"

            # TODO: Check for string error???
            crm_string = ", ".join(snv.crms[0:3])
            if len(snv.crms) > 2:
                crm_string += ", and more"
            response["additional_info"]["f_1_1"]["crms"] = crm_string
        else:
            response["initial_scores"]["f_1_1"] = "0"
            response["additional_info"]["f_1_1"]["crms"] = "None"

        # Check Hi-C
        snv.set_ccre_method()
        if "Hi-C" in snv.ccre_methods:
            response["initial_scores"]["f_1_3"] = "1"
            response["additional_info"]["f_1_3"] = "Hi-C"
        elif "RNAPII ChIA-PET" in snv.ccre_methods:
            response["initial_scores"]["f_1_3"] = "1"
            response["additional_info"]["f_1_3"] = "ChIA-PET"
        else:
            response["initial_scores"]["f_1_3"] = "0"
            response["additional_info"]["f_1_3"] = "-"

        # Check eQTL
        if "eQTL" in snv.ccre_methods:
            response["initial_scores"]["f_1_4"] = "1"
            response["additional_info"]["f_1_4"] = "eQTL"
        else:
            response["initial_scores"]["f_1_4"] = "0"
            response["additional_info"]["f_1_4"] = "-"

        # Check c3.1
        if body["query"]["c_3_1"] == "yes":
            # Add additional info
            response["additional_info"]["c_3_1"] = FAMILIAL_SEGREGATION_MAP[body["query"]["c_3_1_additional"]]
        else:
            response["additional_info"]["c_3_1"] = ""

        # Ask about C2.5
        response["initial_scores"]["c_2_5"] = "0"

        response["positions"] = {
            "hg19": "-".join([str(snv.chro), str(snv.ref_assemblies["hg19"]), snv.ref, snv.alt]),
            "hg38": "-".join([str(snv.chro), str(snv.ref_assemblies["hg38"]), snv.ref, snv.alt]),
        }

        print(response)
        print(snv.rsid)
        print(snv.clinvar_variation)

        # Determine external links
        snv.set_rsid()
        snv.set_clinvar_variation()
        print(snv.rsid)
        print(snv.clinvar_variation)
        if snv.rsid != "":
            response["external_links"]["dbsnp"] = DBSNP_URL_TEMPLATE.format(rsid=snv.rsid)
            response["external_links"]["rsid"] = snv.rsid
        else:
            response["external_links"]["dbsnp"] = ""
            response["external_links"]["rsid"] = ""
        if snv.in_gnomad:
            variant_id = "-".join([
                str(snv.chro),
                str(snv.ref_assemblies[GNOMAD_ASSEMBLY]),
                snv.ref,
                snv.alt
            ])
            response["external_links"]["gnomad"] = GNOMAD_URL_TEMPLATE.format(gnomad_id=variant_id, gnomad_dataset=GNOMAD_DATASETS[GNOMAD_ASSEMBLY])
            if snv.clinvar_variation != "":
                response["external_links"]["clinvar"] = CLINVAR_URL_TEMPLATE.format(clinvar_variation=snv.clinvar_variation)
                response["external_links"]["clinvar_variation"] = snv.clinvar_variation
            else:
                response["external_links"]["clinvar_variation"] = ""
        else:
            response["external_links"]["gnomad"] = ""
            response["external_links"]["clinvar_variation"] = ""
        print(response["external_links"])
    return jsonify(response)


@app.route('/api/calc_scores', methods=["POST"])
def calculate_scores():
    """
    """
    if request.method == "POST":
        scores_data = request.json["scores"]
        variant_info = request.json["variantInfo"]
        additional_info = request.json["additionalInfo"]
        # try:
            #clinical, functional = 0, 0

            #for key, val in request.json.items():
            #    print(key)
            #    print(val)
        scores = calc_all_scores(scores_data)
        
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

        # Get external links


        # Save variant in database 
        db_id = str(uuid.uuid4())
        dynamo.tables['revup_snv'].put_item(Item={
            "date_submitted": request.json["timeSubmitted"],
            "id": db_id,
            "variant_id": variant_info["variant_id"],
            "patient_id": variant_info["patient_id"],
            "ref_assembly": variant_info["ref_genome"],
            "target_gene": variant_info["target_gene"],
            "patient_genotype": variant_info["genotype"],
            "patient_phenotype": variant_info["phenotype"],
            "identification_method": variant_info["identification_method"],
            "cadd_score": additional_info["c_2_3"]["cadd_score"],
            "phylop_score": additional_info["c_1_1"]["phylop"],
            "phastcons_score": additional_info["c_1_1"]["phastcons"],
            "af": additional_info["c_1_2"]["af"],
            "ccre_info": additional_info["f_1_2"]["ccre_descriptions"],
            "crms": additional_info["f_1_1"]["crms"],
            "ccre_methods": [additional_info["f_1_3"], additional_info["f_1_4"]],
            "test_variant": variant_info["test_variant"],
            "c_1_1": scores_data["c_1_1"],
            "c_1_2": scores_data["c_1_2"],
            "c_1_3": scores_data["c_1_3"],
            "c_2_1": scores_data["c_2_1"],
            "c_2_2": scores_data["c_2_2"],
            "c_2_3": scores_data["c_2_3"],
            "c_2_4": scores_data["c_2_4"],
            "c_2_5": scores_data["c_2_5"],
            "c_3_1": scores_data["c_3_1"],
            "c_4_1": scores_data["c_4_1"],
            "c_4_2": scores_data["c_4_2"],
            "c_5_1": scores_data["c_5_1"],
            "c_5_2": scores_data["c_5_2"],
            "f_0_1": scores_data["f_0_1"],
            "f_0_2": scores_data["f_0_2"],
            "f_1_1": scores_data["f_1_1"],
            "f_1_2": scores_data["f_1_2"],
            "f_1_3": scores_data["f_1_3"],
            "f_1_4": scores_data["f_1_4"],
            "f_1_5": scores_data["f_1_5"],
            "f_2_1": scores_data["f_2_1"],
            "f_2_2": scores_data["f_2_2"],
            "f_3_1": scores_data["f_3_1"],
            "f_4_1": scores_data["f_4_1"],
            "rve": rve,
            "clinical": scores[0],
            "functional": scores[1]
        })

    return jsonify(response)


def calc_all_scores(data):
    """
    """
    clinical = 0
    functional = 0
    for key, val in data.items():
        if key.startswith("c_") and not key.endswith("_comments") and val != '':
            base = key.split("_")[1]
            clinical += int(val)*(int(base)**2)
        elif key.startswith("f_") and not key.endswith("_comments") and val != '':
            base = key.split("_")[1]
            functional += int(val)*(int(base)**2)

    return (clinical, functional)


@app.route('/api/contact_email', methods=["POST"])
def contact_email():
    """
    """
    if request.method == "POST":
        # Get info from body of the request
        query_body = request.json["message"]
        recipient = EMAIL_RECIPIENT_MAP[request.json["recipient"]]
        respond_to = request.json["respond_to"]

        msg = Message('New message from RevUP classifier', sender=os.environ.get('REVUP_SENDER_EMAIL'), recipients=[recipient])
        msg.body = EMAIL_MSG_TEMPLATE.format(query_body=query_body, respond_to=respond_to)
        mail.send(msg)

    return jsonify("Message Sent")

