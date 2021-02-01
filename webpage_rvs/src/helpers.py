import os
import sys
import json
import logging
import requests
import matplotlib

import seaborn as sns

from pyliftover import LiftOver

from webpage_rvs.src.constants import (
    LOGGING_FORMAT,
    RVE_SCORES_FILE
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
        pos = int(pos) - 1

        lo = LiftOver(from_assembly, to_assembly)
        out = lo.convert_coordinate(chro, pos)

        return out[0][1]


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
    matplotlib.use('agg')
    rve_scores = get_standard_rve_scores()
    kde = sns.kdeplot(rve_scores)
    line = kde.lines[0]
    x, y = line.get_data()
    rve_density = {
        "x": list(x),
        "y": list(y)
    }
    print(rve_density)

    return rve_density