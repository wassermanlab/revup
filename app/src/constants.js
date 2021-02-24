export const defaultQueryDict = {
    "patient_id": "",
    "variant_id": "",
    "target_gene": "",
    "ref_genome": "",
    "chro": "",
    "pos": "",
    "alt": "",
    "gnomad_coord": "",
    "variant_description":"",
    "c_1_3": "unknown",
    "c_3_1": "unknown",
    "c_3_1_additional": "trio",
    "c_4_1": "unknown",
    "c_2_1": "unknown",
    "c_2_2": "unknown",
    "c_2_4": "unknown",
    "func_analysis": "no",
    "c_4_2": "unknown",
    "c_5_1": "unknown",
    "c_5_2": "unknown",
    "f_1_1": "unknown",
    "f_1_5": "unknown",
    "f_2_1": "unknown",
    "f_2_2": "unknown",
    "f_3_1": "unknown",
    "f_4_1": "unknown",
    "new_c": "unknown",
    "query_ref": false,
    "calc_scores": false
}

export const defaultInfo = {
    "patient_id": "",
    "variant_id": "",
    "variant_name": "", 
    "variant_pos": "",
    "variant_description": "",
    "ref_genome": "",
    "target_gene": ""
}

export const defaultScoresDict = {
    "c_1_1": "0",
    "c_1_2": "0",
    "c_1_3": "0",
    "c_2_1": "0",
    "c_2_2": "0",
    "c_2_3": "0",
    "c_2_4": "0",
    "c_2_5": "0",
    "c_3_1": "0",
    "c_4_1": "0",
    "c_4_2": "0",
    "c_5_1": "0",
    "c_5_2": "0",
    "f_0_1": "0",
    "f_0_2": "0",
    "f_1_1": "0",
    "f_1_2": "0",
    "f_1_3": "0",
    "f_1_4": "0",
    "f_1_5": "0",
    "f_2_1": "0",
    "f_2_2": "0",
    "f_3_1": "0",
    "f_4_1": "0",
    "calc_scores": false
}

export const defaultValsDict = {
    "c_1_1": "",
    "c_1_2": "",
    "c_1_3": "",
    "c_2_1": "",
    "c_2_2": "",
    "c_2_3": "",
    "c_2_4": "",
    "c_2_5": "",
    "c_3_1": "",
    "c_4_1": "",
    "c_4_2": "",
    "c_5_1": "",
    "c_5_2": "",
    "f_0_1": "",
    "f_0_2": "",
    "f_1_1": "",
    "f_1_2": "",
    "f_1_3": "",
    "f_1_4": "",
    "f_1_5": "",
    "f_2_1": "",
    "f_2_2": "",
    "f_3_1": "",
    "f_4_1": ""
}

export const additionalInfoDict = {
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
                "f_1_1": {
                    "crms": [],
                },
                "f_1_2": {
                    "ccres": [],
                    "ccre_descriptions": [],
                },
                "f_1_3": "",
                "f_1_4": ""
            }

export const defaultResultsDict = {
    "clinical": "0",
    "functional": "0",
    "rve": "0",
    "standard_scores": {},
    "variant_info": {},
}

export const MAX_CLINICAL_SCORE = 114.0;
export const MAX_FUNCTIONAL_SCORE = 38.0;

export const UCSC_API_URL = "https://api.genome.ucsc.edu/getData/sequence?"