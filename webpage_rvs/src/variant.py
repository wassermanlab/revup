import os
import pandas as pd

from webpage_rvs.src.constants import (
    LOGGING_FORMAT,
    GNOMAD_API_URL,
    GNOMAD_ALLELE_QUERY,
    CADD_API_URL_TEMPLATE,
    UCSC_API_URL,
    UCSC_ASSEMBLY,
    GNOMAD_ASSEMBLY,
    CADD_ASSEMBLY,
    CADD_VERSION,
    REMAP_ASSEMBLY,
)

from webpage_rvs.src.helpers import (
    make_request,
    graphql_query,
    liftover
)


class Variant:
    def __init__(self, patient_id=None, variant_id=None):
        """
        """
        self.patient_id = patient_id
        self.variant_id = variant_id


class SNV(Variant):
    def __init__(self, ref_genome, chro, pos, alt, patient_id=None, variant_id=None):
        """
        """
        super().__init__(patient_id, variant_id)

        self.remap_file = "Remap_Variant_interest.tsv"
        self.remap_df = pd.read_csv(self.remap_file, sep='\t', header=None)

        self.ref_genome = ref_genome
        self.chro = chro
        self.pos = pos
        self.alt = alt
        self.ref = ""
        self.cadd_score = 0
        self.phylop_score = 0
        self.phastcons_score = 0
        self.af = 0
        self.ccre_info = []
        self.crms = []

        hg19_pos = liftover(self.pos, self.chro, self.ref_genome, 'hg19')
        hg38_pos = liftover(self.pos, self.chro, self.ref_genome, 'hg38')
        self.ref_assemblies = {
            "hg19": hg19_pos,
            "hg38": hg38_pos
        }

        #self.ucsc_pos = liftover(self.pos, self.chro, self.ref_genome, UCSC_ASSEMBLY)
        #self.cadd_pos = liftover(self.pos, self.chro, self.ref_genome, CADD_ASSEMBLY)
        #self.gnomad_pos = liftover(self.pos, self.chro, self.ref_genome, GNOMAD_ASSEMBLY)
        self.set_ref_allele()
        

    def set_ref_allele(self):
        """
        UCSC
        """
        chro = "chr" + str(self.chro)
        start = self.ref_assemblies[UCSC_ASSEMBLY]
        end = start + 1

        track_query = "sequence?genome={};chrom={};start={};end={}".format(
            UCSC_ASSEMBLY,
            chro, 
            str(start), 
            str(end)
        )
        ref_allele_query = os.path.join(UCSC_API_URL, "getData", track_query)

        ref_allele_results = make_request(ref_allele_query)
        self.ref = ref_allele_results["dna"].upper()
        print(self.ref)

        # TODO: Check if there are results or not

    
    def set_cadd_score(self):
        """
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
        """
        chro = "chr" + str(self.chro)
        start = self.ref_assemblies[UCSC_ASSEMBLY] - 1
        end = self.ref_assemblies[UCSC_ASSEMBLY]

        track_query = "track?track=phyloP100way;genome={};chrom={};start={};end={}".format(
            UCSC_ASSEMBLY,
            chro, 
            str(start), 
            str(end)
        )
        phylop_query = os.path.join(UCSC_API_URL, "getData", track_query)

        phylop_results = make_request(phylop_query)
        print(phylop_results)
        if len(phylop_results[chro]) > 0:
            self.phylop_score = float(phylop_results[chro][0]["value"])

        # TODO: Check if there are no results


    def set_phastcons_score(self):
        """
        """
        # Convert coordinates
        chro = "chr" + str(self.chro)
        start = self.ref_assemblies[UCSC_ASSEMBLY] - 1
        end = self.ref_assemblies[UCSC_ASSEMBLY]

        track_query = "track?track=phastCons100way;genome={};chrom={};start={};end={}".format(
            UCSC_ASSEMBLY,
            chro, 
            start, 
            end
        )
        phastcons_query = os.path.join(UCSC_API_URL, "getData", track_query)

        phastcons_results = make_request(phastcons_query)
        if len(phastcons_results[chro]) > 0:
            self.phastcons_score = float(phastcons_results[chro][0]["value"])

        # TODO: Check if there are no results


    def set_af(self):
        """
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

        # TODO: Check if results is empty
        if results["data"]["variant"]:
            an = results["data"]["variant"]["genome"]["an"]
            ac = results["data"]["variant"]["genome"]["ac"]
            self.af = int(an)/int(ac)
        else:
            # TODO: What to do here....?
            
            # Log the errors
            print("gnomAD errors:")
            for error in results["errors"]:
                print(error["message"])


    def set_ccre_info(self):
        """
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
    

    def set_remap_score(self):
        """
        """
        pos = self.ref_assemblies[REMAP_ASSEMBLY]
        subset = self.remap_df[self.remap_df.loc[:, 0] == ('chr' + str(self.chro))]
        subset = subset[(subset.loc[:, 1] < pos) & (subset.loc[:, 2] > pos)]

        # TODO: Error checking here
        for index, row in subset.iterrows():
            crm = row[3].split(':')[0]
            self.crms.append(crm)
