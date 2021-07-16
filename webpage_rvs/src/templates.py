import os


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


# URL Templates
CADD_API_URL_TEMPLATE = "https://cadd.gs.washington.edu/api/v1.0/{version}/{chro}:{pos}"


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
    }
}
"""


# Text Templates
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
EMAIL_MSG_TEMPLATE = """
New request from RevUP at revup-classifier.ca:\n
{query_body}
\n
Please respond to: {respond_to}
"""

