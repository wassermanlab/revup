from webpage_rvs import app

from flask import request, jsonify

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

@app.route('/')
def test():
    output = "{}".format(request.method)
    return output


@app.route('/initial_scores', methods=["POST"])
def calculate_initial_scores():
    """
    """
    if request.method == "POST":
        response = {}
        try:
            results = request.json["results"]
            for key, value in results.items():
                if key in CLINICAL_QUESTIONS or key in FUNCTIONAL_QUESTIONS:
                    if value == "yes":
                        response[key] = "1"
                    else:
                        response[key] = "0"

                    # Check CADD and FATHMM scores

                    # Check PhyloP and PhastCons scores

                    # Check eQTL score

                    # f_1_2

                    # f_0_1

        except Exception as e:
            response = jsonify({"error": str(e)})
            return response
    return jsonify(response)
    #return response


@app.route('/calc_scores', methods=["POST"])
def calculate_scores():
    """
    """

    if request.method == "POST":
        try:
            clinical, functional = 0, 0

            #for key, val in request.json.items():
            #    print(key)
            #    print(val)
            clinical = calc_clinical_score(request.json)
            functional = calc_functional_score(request.json)
            
            
            
            rve = clinical + functional
            response = {
                'clinical': clinical,
                'functional': functional,
                'rve': rve
            }
        except Exception as e:
            response = jsonify({"error": str(e)})
            return response
    return jsonify(response)


def calc_clinical_score(data):
    """
    """
    return 0


def calc_functional_score(data):
    """
    """
    return 0
