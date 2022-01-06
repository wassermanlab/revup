import os

from webpage_rvs.src.constants import (
    UCSC_API_URL,
    CADD_API_URL,
)


# Maps
FAMILIAL_SEGREGATION_MAP = {
    "trio": "Variant segregates as expected in a trio (parents and proband)",
    "small_family": "Variant segregates as expected in a small family (trio and 1 or 2 siblings)",
    "large_family": "Variant segregates as expected in a large family (over 5 individuals)"
}
EMAIL_RECIPIENT_MAP = {
    "bug": os.environ.get("REVUP_BUG_EMAIL"),
    "question_feedback": os.environ.get("REVUP_QUESTION_EMAIL"),
}
GNOMAD_DATASETS = {
    "hg38": "gnomad_r3",
    "hg19": "gnomad_r2_1"
}


# URL Templates
UCSC_API_URL_TEMPLATE = os.path.join(UCSC_API_URL, "getData", "track?track={track_query};genome={genome};chrom={chrom};start={start};end={end}")
CADD_API_URL_TEMPLATE = os.path.join(CADD_API_URL, "{version}/{chro}:{pos}")
DBSNP_URL_TEMPLATE = "https://www.ncbi.nlm.nih.gov/snp/{rsid}?vertical_tab=true"
GNOMAD_URL_TEMPLATE = "https://gnomad.broadinstitute.org/variant/{gnomad_id}?dataset={gnomad_dataset}"
CLINVAR_URL_TEMPLATE = "https://www.ncbi.nlm.nih.gov/clinvar/variation/{clinvar_variation}"


# API Queries
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
            homozygote_count
        }
        rsid
    }
}
"""
GNOMAD_CLINVAR_QUERY = """
query getClinvarVariant($variantId: String!) {
        clinvar_variant(variant_id: $variantId, reference_genome: GRCh38) {
    		rsid
    		clinvar_variation_id
        }
    }
"""


# Text Templates
EMAIL_MSG_TEMPLATE = """
New request from RevUP at revup-classifier.ca:\n
{query_body}
\n
Please respond to: {respond_to}
"""

