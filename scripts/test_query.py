import os
import json
import click
import requests
import subprocess

from pprint import pprint
from pyliftover import LiftOver


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


@click.group() 
def query():
    """
    Choose which type of query to run
    """
    pass


@query.command()
@click.argument("chro")
@click.argument("pos")
@click.argument("ref")
@click.argument("alt")
# Example Query
# python3 test_query.py gnomad-allele 21 27107251 C G
def gnomad_allele(**kwargs):
    """
    """
    variant_id = "-".join([
        kwargs["chro"],
        kwargs["pos"],
        kwargs["ref"].upper(),
        kwargs["alt"].upper()
    ])
    QUERY = """
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
    response = requests.post(
        "https://gnomad.broadinstitute.org/api",
        data=json.dumps({
            "query": QUERY,
            "variables": {"variantId": variant_id}
        }),
        
        headers={
            "Content-Type": "application/json",
        }
    ).json()
    # print(response)

    allele_num = response["data"]["variant"]["genome"]["an"]
    allele_count = response["data"]["variant"]["genome"]["ac"]
    allele_freq = int(allele_count)/int(allele_num)
    hom_zygotes = response["data"]["variant"]["genome"]["ac_hom"]

    print(allele_num)
    print(allele_count)
    print(allele_freq)
    print(hom_zygotes)
 

@query.command()
@click.argument("chr", nargs=1)
@click.argument("pos", nargs=1)
@click.argument("alt", nargs=1)
@click.argument("ref", nargs=1)
@click.option("--version", default="GRCh38-v1.6", type=click.Choice(CADD_VERSION_CHOICES))
# Example command:
# python3 test_query.py cadd-score 21 27107251 C G --version GRCh38-v1.6
def cadd_score(chr, pos, alt, ref, version):
    """
    """
    url = "https://cadd.gs.washington.edu/api/v1.0/{}/{}:{}".format(version, chr, pos)
    response = requests.get(url)

    if response.status_code != 200:
        raise Exception("Error: {}".format(response.status_code))
    
    results = response.json()
    for result in results:
        if result["Alt"] == alt and result["Ref"] == ref:
            print("PHRED Score {}".format(result["PHRED"]))
            print("Raw Score {}".format(result["RawScore"]))
    
    # TODO: If no results, iterate through different versions?


@query.command()
@click.argument("from_assembly", type=click.Choice(LIFTOVER_ASSEMBLY_CHOICES))
@click.argument("to_assembly", type=click.Choice(LIFTOVER_ASSEMBLY_CHOICES))
@click.argument("chr")
@click.argument("pos")
# Example command:
# python3 test_query.py liftover hg17 hg19 21 27107251
def liftover(from_assembly, to_assembly, chr, pos):
    """
    NOTE:   pyliftover uses base 0, whereas coordinate system uses base 1
            therefore position 27107251 is actially 27107250 in pyliftover
    """
    chromosome = 'chr' + str(chr)
    position = int(pos) - 1

    lo = LiftOver(from_assembly, to_assembly)
    out = lo.convert_coordinate(chromosome, position)
    print(out)


def make_request(query):
    """
    """
    response = requests.get(query)
    return response.json()


def list_ucsc_tracks(api_url, verbose=False):
    """
    """
    query = os.path.join(api_url, "list", "tracks?genome=hg38")
    tracks = make_request(query)

    if verbose:
        for key, val in tracks["hg38"].items():
            print(key)

    return tracks


@query.command()
@click.option("--list_tracks", is_flag=True)
@click.option("--show_track_data")
#@click.argument("genome", default="hg38")
# Example Query
# python3 test_query.py ucsc-query --list_tracks
# python3 test_query ucsc-query --show_track_data cons100way
def ucsc_query(**kwargs):
    """
    """
    ucsc_api_url = "https://api.genome.ucsc.edu"

    if kwargs["list_tracks"]:
        tracks = list_ucsc_tracks(ucsc_api_url, verbose=True)

    elif kwargs["show_track_data"]:
        tracks = list_ucsc_tracks(ucsc_api_url)
        try:
            pprint(tracks["hg38"][kwargs["show_track_data"]])
        except KeyError:
            print("{} not found in track data".format(kwargs["show_track_data"]))


@query.command()
@click.argument("chro")
@click.argument("pos")
# Example Query
# python3 test_query ucsc-get-data 8 101493333
def ucsc_get_data(**kwargs):
    """
    """
    ucsc_api_url = "https://api.genome.ucsc.edu"

    chro = "chr" + kwargs["chro"]
    start = int(kwargs["pos"]) - 1
    end = kwargs["pos"]

    # Get phyloP Score
    track_query = "track?track=phyloP100way;genome=hg38;chrom={};start={};end={}".format(chro, start, end)
    phylop_query = os.path.join(ucsc_api_url, "getData", track_query)

    phylop_results = make_request(phylop_query)
    phylop_score = phylop_results[chro][0]["value"]
    print(phylop_score)

    # Get phastCons Score
    track_query = "track?track=phastCons100way;genome=hg38;chrom={};start={};end={}".format(chro, start, end)
    phastcons_query = os.path.join(ucsc_api_url, "getData", track_query)

    phastcons_results = make_request(phastcons_query)
    phastcons_score = phastcons_results[chro][0]["value"]
    print(phastcons_score)

    # Get ENCODE cCRE 
    track_query = "track?track=encodeCcreCombined;genome=hg38;chrom={};start={};end={}".format(chro, start, end)
    ccre_query = os.path.join(ucsc_api_url, "getData", track_query)

    ccre_results = make_request(ccre_query)
    ccre_data = []
    if len(ccre_results["encodeCcreCombined"]) > 0:
        for ccre_result in ccre_results["encodeCcreCombined"]:
            ccre_data.append({
                "ccre": ccre_result["ccre"],
                "description": ccre_result["description"],
                "name": ccre_result["name"]
            })
    print(ccre_data)

    #ccre_score = ccre_results["encodeCcreCombined"][0]["score"]
    #print(ccre_score)


if __name__=='__main__':
    query()