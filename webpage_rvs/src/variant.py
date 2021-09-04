import os
import sys
import logging
import pandas as pd

from webpage_rvs.src.constants import (
    LOGGING_FORMAT,
    GNOMAD_API_URL,
    UCSC_API_URL,
    UCSC_ASSEMBLY,
    GNOMAD_ASSEMBLY,
    CADD_ASSEMBLY,
    CADD_VERSION,
    REMAP_ASSEMBLY,
    SCREEN_URL,
    SCREEN_ASSEMBLY,
    REMAP_VARIANT_FILE
)
from webpage_rvs.src.templates import (
    UCSC_API_URL_TEMPLATE,
    CADD_API_URL_TEMPLATE,
    GNOMAD_ALLELE_QUERY,
    GNOMAD_CLINVAR_QUERY,
    SCREEN_CCRE_QUERY
)

from webpage_rvs.src.helpers import (
    make_request,
    graphql_query,
    liftover
)

# Setup logging
logging.basicConfig(format=LOGGING_FORMAT, stream=sys.stderr, level=logging.INFO)

class Variant:
    def __init__(self, ref_genome, target_gene, patient_id=None, variant_id=None):
        """
        Base class for all types of variants
        """
        self.patient_id = patient_id
        self.variant_id = variant_id
        self.ref_genome = ref_genome
        self.target_gene = target_gene


class SNV(Variant):
    def __init__(self, ref_genome, chro, pos, alt, target_gene, patient_id=None, variant_id=None):
        """
        Create an SNV object to hold all info from external databases
        """
        super().__init__(ref_genome, target_gene, patient_id, variant_id)

        # Read external files
        self.remap_file = REMAP_VARIANT_FILE
        self.remap_df = pd.read_csv(self.remap_file, sep='\t', header=None)

        # Setup variant information
        self.chro = chro
        self.pos = pos
        self.alt = alt
        self.ref = ""

        # Setup for external links
        self.rsid = ""
        self.clinvar_variation = ""
        self.in_gnomad = True

        # Create default scores
        self.cadd_score = 0
        self.phylop_score = 0
        self.phastcons_score = 0
        self.af = 0
        self.num_homozygotes = 0
        self.ccre_info = []
        self.crms = []
        self.ccre_methods = set()

        # Liftover multiple coordinate systems
        hg19_pos = liftover(self.pos, self.chro, self.ref_genome, 'hg19')
        hg38_pos = liftover(self.pos, self.chro, self.ref_genome, 'hg38')
        self.ref_assemblies = {
            "hg19": hg19_pos,
            "hg38": hg38_pos
        }

        # Find reference allele
        self.set_ref_allele()
        

    def set_ref_allele(self):
        """
        Set the reference allele for this variant using UCSC Genome Browser

        NOTE: UCSC is 0 based, so must subtract 1 from every position in order to obtain
        the correct coordinates. i.e. start is actually start - 1
        """
        chro = "chr" + str(self.chro)
        start = self.ref_assemblies[UCSC_ASSEMBLY] - 1
        end = self.ref_assemblies[UCSC_ASSEMBLY]

        track_query = "sequence?genome={};chrom={};start={};end={}".format(
            UCSC_ASSEMBLY,
            chro, 
            str(start), 
            str(end)
        )
        ref_allele_query = os.path.join(UCSC_API_URL, "getData", track_query)

        ref_allele_results = make_request(ref_allele_query)
        self.ref = ref_allele_results["dna"].upper()

        # TODO: Check if there are results or not

    
    def set_cadd_score(self):
        """
        Queries CADD API for CADD score
        """
        query = CADD_API_URL_TEMPLATE.format(
            version=CADD_VERSION,
            chro=str(self.chro),
            pos=str(self.ref_assemblies[CADD_ASSEMBLY])
        )
        results = make_request(query)
        for result in results:
            if result["Alt"] == self.alt and result["Ref"] == self.ref:
                self.cadd_score = float(result["PHRED"])

        # TODO: If no results, iterate through different versions?


    def set_phylop_score(self):
        """
        Queries UCSC API for PhyloP score

        NOTE: UCSC is 0 based, so must subtract 1 from every position in order to obtain
        the correct coordinates. i.e. start is actually start - 1
        """
        chro = "chr" + str(self.chro)
        start = self.ref_assemblies[UCSC_ASSEMBLY] - 1
        end = self.ref_assemblies[UCSC_ASSEMBLY]

        # Build the query
        phylop_query = UCSC_API_URL_TEMPLATE.format(
            track_query="phyloP100way",
            genome=UCSC_ASSEMBLY,
            chrom=chro,
            start=start,
            end=end
        )

        phylop_results = make_request(phylop_query)
        if len(phylop_results[chro]) > 0:
            self.phylop_score = float(phylop_results[chro][0]["value"])

        # TODO: Check if there are no results


    def set_phastcons_score(self):
        """
        Queries UCSC API for PhastCons score

        NOTE: UCSC is 0 based, so must subtract 1 from every position in order to obtain
        the correct coordinates. i.e. start is actually start - 1
        """
        # Convert coordinates
        chro = "chr" + str(self.chro)
        start = self.ref_assemblies[UCSC_ASSEMBLY] - 1
        end = self.ref_assemblies[UCSC_ASSEMBLY]

        # Build the query
        phastcons_query = UCSC_API_URL_TEMPLATE.format(
            track_query="phastCons100way",
            genome=UCSC_ASSEMBLY,
            chrom=chro,
            start=start,
            end=end
        )
        phastcons_results = make_request(phastcons_query)
        if len(phastcons_results[chro]) > 0:
            self.phastcons_score = float(phastcons_results[chro][0]["value"])

        # TODO: Check if there are no results


    def set_rsid(self):
        """
        Queries UCSC API for rsID
        """
        # Convert coordinates
        chro = "chr" + str(self.chro)
        start = self.ref_assemblies[UCSC_ASSEMBLY] - 1
        end = self.ref_assemblies[UCSC_ASSEMBLY]

        # Build the query
        dbsnp_query = UCSC_API_URL_TEMPLATE.format(
            track_query="snp151",
            genome=UCSC_ASSEMBLY,
            chrom=chro,
            start=start,
            end=str(int(end)+1)
        )
        dbsnp_results = make_request(dbsnp_query)
        if len(dbsnp_results["snp151"]) > 0:
            for dbsnp_result in dbsnp_results["snp151"]:
                # If the start and end position are the same and equal the variant position
                if int(dbsnp_result["chromStart"]) == int(end):
                    if int(dbsnp_result["chromEnd"]) == int(end): 
                        self.rsid = dbsnp_result["name"]
                # Otherwise use start as one position behind the variant position
                elif int(dbsnp_result["chromStart"]) == int(start):
                    # Check that rsID is blank so not overwriting the case where start and 
                    # end position equal the provided variant position
                    if int(dbsnp_result["chromEnd"]) == int(end) and self.rsid == "":
                        self.rsid = dbsnp_result["name"]

        # TODO: Check if there are no results


    def set_clinvar_variation(self):
        """
        Queries gnomAD API for ClinVar number
        """
        variant_id = "-".join([ 
            str(self.chro),
            str(self.ref_assemblies[GNOMAD_ASSEMBLY]),
            self.ref,
            self.alt
        ])
        results = graphql_query(
            GNOMAD_API_URL,
            GNOMAD_CLINVAR_QUERY,
            {"variantId": variant_id}
        )
        # TODO: What to do if results are empty?
        # TODO: This could be an issue if the variant is not present in gnomAD but has an rsID in UCSC
        if results["data"]["clinvar_variant"]:
            self.clinvar_variation = results["data"]["clinvar_variant"]["clinvar_variation_id"]
        else:    
            # Log the errors to console
            # TODO: Log to file instead
            for error in results["errors"]:
                logging.error("gnomAD Error: {}".format(error["message"]))


    def set_gnomad_info(self):
        """
        Queries gnomAD GraphQL API to find allele number, allele count, 
        allele frequency, and number of homozygotes
        """
        variant_id = "-".join([
            str(self.chro),
            str(self.ref_assemblies[GNOMAD_ASSEMBLY]),
            self.ref,
            self.alt
        ])
        results = graphql_query(
            GNOMAD_API_URL, 
            GNOMAD_ALLELE_QUERY, 
            {"variantId": variant_id}
        )

        # TODO: What to do if results are empty??
        if results["data"]["variant"]:
            an = results["data"]["variant"]["genome"]["an"]
            ac = results["data"]["variant"]["genome"]["ac"]
            self.af = int(ac)/int(an)
            self.num_homozygotes = results["data"][ "variant"]["genome"]["homozygote_count"]
        else:
            self.in_gnomad = False
            
            # Log the errors to console
            # TODO: Log to file instead
            for error in results["errors"]:
                logging.error("gnomAD Error: {}".format(error["message"]))


    def set_ccre_info(self):
        """
        Queries UCSC API to determine info about cCREs

        NOTE: UCSC is 0 based, so must subtract 1 from every position in order to obtain
        the correct coordinates. i.e. start is actually start - 1
        """
        
        # Convert coordinates
        chro = "chr" + str(self.chro)
        start = self.ref_assemblies[UCSC_ASSEMBLY] - 1
        end = self.ref_assemblies[UCSC_ASSEMBLY]

        track_query = "track?track=encodeCcreCombined;genome={};chrom={};start={};end={}".format(
            UCSC_ASSEMBLY,
            chro, 
            start, 
            end
        )
        ccre_query = os.path.join(UCSC_API_URL, "getData", track_query)

        ccre_results = make_request(ccre_query)
        if len(ccre_results["encodeCcreCombined"]) > 0:
            for ccre_result in ccre_results["encodeCcreCombined"]:
                self.ccre_info.append({
                    "ccre": ccre_result["ccre"],
                    "description": ccre_result["description"],
                    "name": ccre_result["name"]
                })
    
    def set_ccre_method(self):
        """
        Queries the Screen API to determine the cCRE method for the target gene
        """
        pos = self.ref_assemblies[SCREEN_ASSEMBLY]
        chro = "chr" + str(self.chro)
        start = pos - 1
        end = pos

        query = SCREEN_CCRE_QUERY.format(chro, start, end)
        results = graphql_query(SCREEN_URL, query)
        data = results["data"]["ccres"]

        if data and data["total"] > 0:
            ccres = data["ccres"]
            for ccre in ccres:
                for linked_gene in ccre["details"]["linkedGenes"]:
                    if linked_gene["gene"] == self.target_gene:
                        self.ccre_methods.add(linked_gene["method"])
    

    def set_remap_score(self):
        """
        Finds the ReMAP peaks based on an input file ("Remap_Variant_interest).
        Look for rows in the file for which the position of the variant intersects
        with the position found in the row. 

        Example of row in the file:
        chr12	120977660	120979367	TEAD3:Hep-G2	1	.	120978512	120978513	229,252,207
        - required columns are: chromosome (0), start position(1), end position(2), and ReMAP peak (3)
        - strip the ReMAP peak and keep inforation before the colon
        - save peaks for rows in which the position of the variant is located within the range of the 
          start and end position columns

        Returns a list of the CRM ReMAP peaks
        """
        pos = self.ref_assemblies[REMAP_ASSEMBLY]
        subset = self.remap_df[self.remap_df.loc[:, 0] == ('chr' + str(self.chro))]
        subset = subset[(subset.loc[:, 1] < pos) & (subset.loc[:, 2] > pos)]

        # TODO: Error checking here
        for index, row in subset.iterrows():
            crm = row[3].split(':')[0]
            self.crms.append(crm)
