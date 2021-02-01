# Logging stuff
LOGGING_FORMAT = "%(asctime)s - %(levelname)s - %(lineno)d - %(message)s"


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
    variant(variantId: $variantId, dataset: gnomad_r2_1) {
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
GNOMAD_ASSEMBLY = "hg19"
CADD_ASSEMBLY = "hg38"
REMAP_ASSEMBLY = "hg38"
CADD_VERSION = "GRCh38-v1.6"
SCREEN_ASSEMBLY = "hg38"

RVE_SCORES_FILE = "RVE-score.txt"
REMAP_VARIANT_FILE = "Remap_Variant_interest.tsv"
