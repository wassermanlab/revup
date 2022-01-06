import sys
import logging
import requests

import statsmodels.api as sm
import numpy as np

from pyliftover import LiftOver
from webpage_rvs.src.constants import (
    LOGGING_FORMAT,
    RVE_SCORES_FILE,
)


# Setup logging
logging.basicConfig(format=LOGGING_FORMAT, stream=sys.stderr, level=logging.INFO)

def make_request(query):
    """
    Makes a request to the given query and logs any response error
    """
    response = requests.get(query)

    if response.status_code != 200:
        logging.error("Error: {}".format(response.status_code))

    return response.json()


def graphql_query(url, query, variables=None):
    """
    Makes a graphQL query with provided query and variables
    """
    response = requests.post(
        url,
        json={
            "query": query,
            "variables": variables
        },
        headers={
            "Content-Type": "application/json"
        }
    ).json()

    return response


def liftover(pos, chro, from_assembly, to_assembly):
        """
        LiftOver a specific coordinate between assemblies using the UCSC LiftOver tool

        NOTE:   pyLiftover uses base 0, whereas coordinate system uses base 1
                therefore position 27107251 is actually 27107250 in pyLiftover
        """
        if from_assembly == to_assembly:
            return pos

        chro = 'chr' + str(chro)
        pos = int(pos)

        lo = LiftOver(from_assembly, to_assembly)
        out = lo.convert_coordinate(chro, pos)

        return out[0][1]


def get_nearest(arr, val):
    """
    Gets the index of the element in the array closest to "val"
    """
    new_arr = np.asarray(arr)
    idx = (np.abs(new_arr-val)).argmin()
    return idx


def get_standard_rve_scores():
    """
    Read scores from RVE scores txt file
    """
    rve_scores = []
    with open(RVE_SCORES_FILE) as filename:
        for line in filename:
            if line != "\n":
                rve_scores.append(line.strip("\n"))
    rve_scores = list(map(int, rve_scores))
    return rve_scores


def get_rve_density():
    """
    Creates the density plot for the RVE-score distribution
    """
    rve_scores = get_standard_rve_scores()
    dens = sm.nonparametric.KDEUnivariate(rve_scores)
    dens.fit()

    x = np.linspace(-20, 152, 150)
    y = dens.evaluate(x)

    rve_density = {
        "x": list(x),
        "y": list(y)
    }

    return rve_density


def get_evidence_labels(variant_pos, variant_name, target_gene):
    """
    Get the evidence label associated with each evidence, formatted for display in the front end
    """
    clinical_descriptions = {
        "c_1_1": "C1.1 - {variant_pos} is evolutionarily conserved".format(variant_pos=variant_pos),
        "c_1_2": "C1.2 - {variant_name} is rare in unaffected individuals in specific sets of controls or reference population databases".format(variant_name=variant_name),
        "c_1_3": "C1.3 - {variant_name} or locus previously statistically associated with the same or a similar disease phenotype".format(variant_name=variant_name),
        "c_2_1": "C2.1 - <i>{target_gene}</i> has been implicated in the same or a similar disease phenotype, or is otherwise relevant".format(target_gene=target_gene),
        "c_2_2": "C2.2 - <i>{target_gene}</i> does not contain coding variants in the same individual".format(target_gene=target_gene),
        "c_2_3": "C2.3 - {variant_name} is considered deleterious by computational prediction methods".format(variant_name=variant_name),
        "c_2_4": "C2.4 - {variant_name} is similar to another regulatory variant associated to <i>{target_gene}</i> and implicated in the same or a similar disease phenotype".format(variant_name=variant_name, target_gene=target_gene),
        "c_2_5": "C2.5 - {variant_name} is a striking noncoding event".format(variant_name=variant_name),
        "c_3_1": "C3.1 - {variant_name} shows familial segregation with the disease".format(variant_name=variant_name),
        "c_4_1": "C4.1 - {variant_name} observed in multiple, unrelated families with the same disease phenotype".format(variant_name=variant_name),
        "c_4_2": "C4.2 - {variant_name} introduction in a cell line leads to a cellular phenotype consistent with the disease phenotype".format(variant_name=variant_name),
        "c_5_1": "C5.1 - {variant_name} neutralization, in a model organism or cell line, rescues or reverses the phenotype".format(variant_name=variant_name),
        "c_5_2": "C5.2 - {variant_name} introduction, in a model organism or a cell line, results in a phenotype that is consistent with the human disease".format(variant_name=variant_name),
    }
    functional_descriptions = {
        "f_1_1": "F1.1 - {variant_pos} is implicated in TF binding based on experimental data".format(variant_pos=variant_pos),
        "f_1_2": "F1.2 - {variant_pos} localizes to a regulatory region based on genome annotations".format(variant_pos=variant_pos),
        "f_1_3": "F1.3 - Regulatory region and <i>{target_gene}</i> are directly linked based on annotation or experimental data".format(target_gene=target_gene),
        "f_1_4": "F1.4 - {variant_name} is statistically associated with expression levels of <i>{target_gene}</i>".format(variant_name=variant_name, target_gene=target_gene),
        "f_1_5": "F1.5 - Regulatory region is shown to regulate gene expression of <i>{target_gene}</i>".format(target_gene=target_gene),
        "f_2_1": "F2.1 - {variant_name} causes a change in TF binding and/or chromatin environment".format(variant_name=variant_name),
        "f_2_2": "F2.2 - {variant_name} leads to changes in expression of <i>{target_gene}</i> in patient tissue".format(variant_name=variant_name, target_gene=target_gene),
        "f_3_1": "F3.1 - {variant_name} introduction, in a cell line, leads to changes in expression of <i>{target_gene}</i>, a reported gene or chromatin environment".format(variant_name=variant_name, target_gene=target_gene),
        "f_4_1": "F4.1 - {variant_name} introduction, in a model organism, leads to changes in expression of <i>{target_gene}</i> or a reported gene or chromatin environment".format(variant_name=variant_name, target_gene=target_gene)
    }

    evidence_labels = {
        "clinical": clinical_descriptions,
        "functional": functional_descriptions
    }

    return evidence_labels
