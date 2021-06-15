# Logging stuff
LOGGING_FORMAT = "%(asctime)s - %(levelname)s - %(lineno)d - %(message)s"

FAMILIAL_SEGREGATION_MAP = {
    "trio": "Variant segregates as expected in a trio ** (parents and proband)",
    "small_family": "Variant segregates as expected in a small family ** (trio and 1 or 2 siblings)",
    "large_family": "Variant segregates as expected in a large family ** (over 5 individuals)"
}


CLINICAL_QUESTIONS = [
    "c_5_2",
    "c_5_1",
    "c_4_2",
    "c_4_1",
    "c_3_1",
    "c_2_5",
    "c_2_4",
    "c_2_3",
    "c_2_2",
    "c_2_1",
    "c_1_3",
    "c_1_2",
    "c_1_1"
]

FUNCTIONAL_QUESTIONS = [
    "f_4_1",
    "f_3_1",
    "f_2_2",
    "f_2_1",
    "f_1_5",
    "f_1_4",
    "f_1_3",
    "f_1_2",
    "f_1_1",
    "f_0_2",
    "f_0_1"
]

CADD_VERSION_CHOICES = [
    "v1.0",
    "v1.1",
    "v1.2",
    "v1.3",
    "GRCh37-v1.4",
    "GRCh38-v1.4",
    "GRCh38-v1.5",
    "GRCh37-v1.6",
    "GRCh38-v1.6"
]

LIFTOVER_ASSEMBLY_CHOICES = [
    "hg15",
    "hg16",
    "hg17",
    "hg18",
    "hg19",
    "hg38"
]

UCSC_API_URL = "https://api.genome.ucsc.edu"
CADD_API_URL = "https://cadd.gs.washington.edu.api/v1.0"
CADD_API_URL_TEMPLATE = "https://cadd.gs.washington.edu/api/v1.0/{version}/{chro}:{pos}"
GNOMAD_API_URL = "https://gnomad.broadinstitute.org/api"
SCREEN_URL = "https://api.wenglab.org/screen_graphql/graphql"

GNOMAD_ALLELE_QUERY = """
query getVariant($variantId: String!) {
    variant(variantId: $variantId, dataset: gnomad_r3) {
        exome {
            ac
            an
        }
        genome {
            ac
            ac_hom
            an
        }
    }
}
"""
SCREEN_CCRE_QUERY = """{{
    ccres(
        assembly: GRCh38
        range: {{chrom: \"{0}\", start: {1}, end: {2}}}
    ) {{
        total,
        ccres {{
            accession,
            details {{
                linkedGenes {{
                    gene,
                    method
                }}
            }}
        }}
    }}
}}"""

PHYLOP_CUTOFF = 1.5
PHASTCONS_CUTOFF = 0.5
CADD_CUTOFF = 15
AF_CUTOFF = 0.05

UCSC_ASSEMBLY = "hg38"
GNOMAD_ASSEMBLY = "hg38"
CADD_ASSEMBLY = "hg38"
REMAP_ASSEMBLY = "hg38"
CADD_VERSION = "GRCh38-v1.6"
SCREEN_ASSEMBLY = "hg38"

RVE_SCORES_FILE = "RVE-score.txt"
REMAP_VARIANT_FILE = "Remap_Variant_interest.tsv"


C_3_1_LABELS = {
    "trio": "Variant segregates as expected in a trio (parents and proband)",
    "small_family": "Variant segregates as expected in a small family (trio and 1 or 2 siblings)",
    "large_family": "Variant segregates as expected in a large family ** (over 5 individuals)"
}

CLINICAL_DESCRIPTIONS = {
    "c_1_1": "C1.1 - {variant_pos} is evolutionarily conserved",
    "c_1_2": "C1.2 - {variant_name} is rare in unaffected individuals in specific sets of controls or reference population databases",
    "c_1_3": "C1.3 - {variant_name} or locus previously statistically associated with the same or a similar disease phenotype",
    "c_2_1": "C2.1 - <i>{target_gene}</i> has been implicated in the same or a similar disease phenotype, or is otherwise relevant",
    "c_2_2": "C2.2 - <i>{target_gene}</i> does not contain coding variants in the same individual",
    "c_2_3": "C2.3 - {variant_name} is considered deleterious by computational prediction methods",
    "c_2_4": "C2.4 - {variant_name} is similar to another regulatory variant associated to <i>{target_gene}</i> and implicated in the same or a similar disease phenotype",
    "c_2_5": "C2.5 - {variant_name} is a striking noncoding event",
    "c_3_1": "C3.1 - {variant_name} shows familial segregation with the disease",
    "c_4_1": "C4.1 - {variant_name} observed in multiple, unrelated families with the same disease phenotype",
    "c_4_2": "C4.2 - {variant_name} introduction in a cell line leads to a cellular phenotype consistent with the disease phenotype",
    "c_5_1": "C5.1 - {variant_name} neutralization, in a model organism or cell line, rescues or reverses the phenotype",
    "c_5_2": "C5.2 - {variant_name} introduction, in a model organism or a cell line, results in a phenotype that is consistent with the human disease",
}

FUNCTIONAL_DESCRIPTIONS = {
    "f_1_1": "F1.1 - {variant_pos} is implicated in TF binding based on experimental data",
    "f_1_2": "F1.2 - {variant_pos} localizes to a regulatory region based on genome annotations",
    "f_1_3": "F1.3 - Regulatory region and <i>{target_gene}</i> are directly linked based on annotation or experimental data",
    "f_1_4": "F1.4 - {variant_name} is statistically associated with expression levels of <i>{target_gene}</i>",
    "f_1_5": "F1.5 - Regulatory region is shown to regulate gene expression of <i>{target_gene}</i>",
    "f_2_1": "F2.1 - {variant_name} causes a change in TF binding and/or chromatin environment",
    "f_2_2": "F2.2 - {variant_name} leads to changes in expression of <i>{target_gene}</i> in patient tissue",
    "f_3_1": "F3.1 - {variant_name} introduction, in a cell line, leads to changes in expression of <i>{target_gene}</i>, a reported gene or chromatin environment",
    "f_4_1": "F4.1 - {variant_name} introduction, in a model organism, leads to changes in expression of <i>{target_gene}</i> or a reported gene or chromatin environment"
}

DEFAULT_DICT = {
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

ADDITIONAL_INFO_DICT = {
    "c_1_1": {
        "phylop": "",
        "phastcons": "",
    },
    "c_1_2": {
        "af": "",
    },
    "c_1_3": "",
    "c_2_1": "",
    "c_2_2": "",
    "c_2_3": {
        "cadd_score": "",
    },
    "c_2_4": "",
    "c_2_5": "",
    "c_3_1": "",
    "c_4_1": "",
    "c_4_2": "",
    "c_5_1": "",
    "c_5_2": "",
    "f_0_1": "",
    "f_0_2": "",
    "f_1_1": {
        "crms": [],
    },
    "f_1_2": {
        "ccres": [],
        "ccre_descriptions": [],
    },
    "f_1_3": "",
    "f_1_4": "",
    "f_1_5": "",
    "f_2_1": "",
    "f_2_2": "",
    "f_3_1": "",
    "f_4_1": ""
}