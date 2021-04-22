import os
import sys
import json
import logging
import requests
import matplotlib

import seaborn as sns
import statsmodels.api as sm
import numpy as np

from pyliftover import LiftOver

from webpage_rvs.src.constants import (
    LOGGING_FORMAT,
    RVE_SCORES_FILE,
    CLINICAL_DESCRIPTIONS,
    FUNCTIONAL_DESCRIPTIONS
)

logging.basicConfig(format=LOGGING_FORMAT, stream=sys.stderr, level=logging.INFO)

def make_request(query):
    """
    """
    response = requests.get(query)

    if response.status_code != 200:
        logging.error("Error: {}".format(response.status_code))

    return response.json()


def graphql_query(url, query, variables=None):
    """
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
    """
    new_arr = np.asarray(arr)
    idx = (np.abs(new_arr-val)).argmin()
    #return arr[idx]
    return idx


def get_standard_rve_scores():
    """
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
    """
    clinical_descriptions = CLINICAL_DESCRIPTIONS
    functional_descriptions = FUNCTIONAL_DESCRIPTIONS
    for key, val in clinical_descriptions.items():
        clinical_descriptions[key] = val.format(
            variant_pos=variant_pos,
            variant_name=variant_name,
            target_gene=target_gene
        )
    for key, val in functional_descriptions.items():
        functional_descriptions[key] = val.format(
            variant_pos=variant_pos,
            variant_name=variant_name,
            target_gene=target_gene
        )

    evidence_labels = {
        "clinical": clinical_descriptions,
        "functional": functional_descriptions
    }
    return evidence_labels
