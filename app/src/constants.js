export const testVars = [
    {
        "patientId": "Test Patient",
        "variantId": "Test Variant",
        "chro": "17",
        "pos": "4987635",
        "alt": "T",
        "refGenome": "hg38",
        "gnomadCoor": "17-4987635-C-T",
        "targetGene": "CAMTA2"
    },
    {
        "patientId": "Proband 1",
        "variantId": "test variant",
        "chro": "9",
        "pos": "139444949",
        "alt": "A",
        "refGenome": "hg19",
        "gnomadCoor": "9-139444949-C-A",
        "targetGene": "NOTCH1"
    }
]

export const defaultQueryDict = {
    "patient_id": "",
    "variant_id": "",
    "target_gene": "",
    "ref_genome": "",
    "chro": "",
    "pos": "",
    "alt": "",
    "gnomad_coord": "",
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
    "genotype": "unknown",
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
    "target_gene": "",
    "genotype": "",
    "test_variant": false,
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
    "c_3_1": "",
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

export const CLINICAL_RANGE_MAXIMUMS = {
    "weak": 15.0,
    "moderate": 40.0,
    "strong": 114.0,
}
export const FUNCTIONAL_RANGE_MAXIMUMS = {
    "weak": 9.0,
    "moderate": 25.0,
    "strong": 38.0
}

export const UCSC_API_URL = "https://api.genome.ucsc.edu/getData/sequence?"

export const CLINICAL_TITLE_TEXT = ["Clinical Score", "Is there a causal link between genotype and phenotype?"]
export const FUNCTIONAL_TITLE_TEXT = ["Functional Score", "Does the variant have a damaging effect on the gene?"]

export const CITATION = "Van der Lee R, Correard S, Wasserman WW. Deregulated Regulators: Disease-Causing cis Variants in Transcription Factor Genes. Trends Genet. 2020 Jul;36(7):523-539. doi: 10.1016/j.tig.2020.04.006. Epub 2020 May 22."
