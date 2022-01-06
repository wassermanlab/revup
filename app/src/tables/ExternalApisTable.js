import React from 'react';
import { 
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, 
} from '@material-ui/core';
import theme from '../styles/theme';


const useStyles = makeStyles((theme) => ({
    grid: {
        padding: "0px",
        marginRight: "auto",
        marginLeft: "auto"
    },
    tableHead: {
        verticalAlign: 'top',
        fontWeight: 'normal',
        fontSize: '17px',
    },
    codeCell: {
        fontFamily: "monospace",
    }
}));



export default function ExternalApiTable () {
    const classes = useStyles();
    return (
        <TableContainer>
            <Table aria-label="clinical table" style={{whiteSpace: 'pre-line' }}>
                <colgroup>
                    <col style={{width:'20%'}}/>
                    <col style={{width:'20%'}}/>
                    <col style={{width:'20%'}}/>
                    <col style={{width:'40%'}}/>
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHead} align="center">
                            Information in RevUP
                        </TableCell>
                        <TableCell className={classes.tableHead} align="center">
                            API
                        </TableCell>
                        <TableCell className={classes.tableHead} align="center">
                            Information Extracted
                        </TableCell>
                        <TableCell className={classes.tableHead} align="center">
                            Query
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell rowspan={2} align="center">
                            Evidence level C1.1: Variant position is evolutionarily conserved
                        </TableCell>
                        <TableCell align="center">
                            <b>UCSC REST API</b> {"\n"}track: phyloP100way {"\n"}hg38
                        </TableCell>
                        <TableCell align="center">
                            PhyloP score
                        </TableCell>
                        <TableCell className={classes.codeCell} align="left">
                            {`https://api.genome.ucsc.edu/getData/track?\ntrack=phyloP100way;genome=hg38;chrom=chr17;\nstart=4987634;end=4987635`}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">
                            <b>UCSC REST API</b> {"\n"}track: phastCons100way {"\n"}hg38
                        </TableCell>
                        <TableCell align="center">
                            PhastCons score
                        </TableCell>
                        <TableCell className={classes.codeCell} align="left">
                            {`https://api.genome.ucsc.edu/getData/track?\ntrack=phastCons100way;genome=hg38;chrom=chr17;\nstart=4987634;end=4987635`}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">
                            rsID
                        </TableCell>
                        <TableCell align="center">
                            <b>UCSC REST API</b> {"\n"}track: snp151 {"\n"}hg38
                        </TableCell>
                        <TableCell align="center">
                            rsID (<i>name</i>)
                        </TableCell>
                        <TableCell className={classes.codeCell} align="left">
                            {`https://api.genome.ucsc.edu/getData/track?\ntrack=snp151;genome=hg38;chrom=chr17;\nstart=4987634;end=4987636`}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">
                            Reference Allele
                        </TableCell>
                        <TableCell align="center">
                            <b>UCSC REST API</b> {"\n"}sequence query {"\n"}hg38
                        </TableCell>
                        <TableCell align="center">
                            Reference allele (<i>dna</i>)
                        </TableCell>
                        <TableCell className={classes.codeCell} align="left">
                            {`https://api.genome.ucsc.edu/getData/sequence?\ngenome=hg38;chrom=chr17;start=4987634;end=4987635`}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">
                            Evidence level F1.2: Variant localizes to a regulatory region based on genome annotations
                        </TableCell>
                        <TableCell align="center">
                            <b>UCSC REST API</b> {"\n"}GRCh38
                        </TableCell>
                        <TableCell align="center">
                            cCRE (<i>ccre</i>) {"\n"}Description (<i>description</i>) {"\n"}Name (<i>name</i>)
                        </TableCell>
                        <TableCell className={classes.codeCell} align="left">
                            {`https://api.genome.ucsc.edu/getData/track?\ntrack=encodeCcreCombined;genome=hg38;chrom=chr17;\nstart=4987634;end=4987635`}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">
                            Evidence level C1.2: Variant is rare in unaffected individuals in specific sets of controls or reference population databases
                        </TableCell>
                        <TableCell align="center">
                            <b>gnomAD GraphQL</b> {"\n"}dataset: gnomad_r3 {"\n"}hg38
                        </TableCell>
                        <TableCell align="center">
                            Allele count (<i>ac</i>) {"\n"}Allele number (<i>an</i>) {"\n"}Number of homozygotes (<i>homozygote_count</i>)
                        </TableCell>
                        <TableCell className={classes.codeCell} align="left" style={{whiteSpace: "pre"}}>
                            {`
query getVariant($variantId: String!) {
    variant(
        variantId: $variantId, 
        dataset: gnomad_r3) {
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
inputs: {
    "variantId": "1-55516888-G-GA"
}
                        `}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">
                            ClinVar number
                        </TableCell>
                        <TableCell align="center">
                            <b>gnomAD GraphQL API</b> {"\n"}dataset: gnomad_r3 {"\n"}hg38
                        </TableCell>
                        <TableCell align="center">
                            ClinVar ID (<i>clinvar_variation_id</i>)
                        </TableCell>
                        <TableCell className={classes.codeCell} align="left" style={{whiteSpace: "pre"}}>
                            {`
query getClinvarVariant($variantId: String!) {
    clinvar_variant(
        variant_id: $variantId, 
        reference_genome: GRCh38) {
            rsid
            clinvar_variation_id
        }
}
inputs: {
    "variantId": "8-101493333-G-T"
}`}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">
                            Evidence level C2.3: Variant is considered deleterious by computational prediction methods
                        </TableCell>
                        <TableCell align="center">
                            <b>CADD REST API</b> {"\n"}version v1.0 {"\n"}GRCh38-v1.6
                        </TableCell>
                        <TableCell align="center">
                            CADD Phred Score (<i>PHRED</i>)
                        </TableCell>
                        <TableCell className={classes.codeCell} align="left">
                            {`https://cadd.gs.washington.edu/api/v1.0/GRCh38-v1.6/17:4987635`}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">
                            Evidence level F1.1: Variant position is implicated in TF binding based on experimental data
                        </TableCell>
                        <TableCell align="center">
                            <b>ReMap</b> (downloaded file) {"\n"}  {"\n"}hg38
                        </TableCell>
                        <TableCell align="center">
                            CRM at variant position
                        </TableCell>
                        <TableCell align="left">
                            Homo sapiens CRMs file downloaded from ReMap 2020 on <Link href="https://remap.univ-amu.fr/download_page" color="secondary">this page</Link>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">
                            Evidence level F1.3: Regulatory region and target gene are directly linked based on annotation or experimental data {"\n"}{"\n"}
                            Evidence level F1.4: Variant is statistically associated with expression levels of the target gene
                        </TableCell>
                        <TableCell align="center">
                            <b>SCREEN GraphQL API</b> {"\n"}GRCh38
                        </TableCell>
                        <TableCell align="center">
                            cCRE Method (<i>ccre["details"]["linkedGenes"]["method"]</i>)
                        </TableCell>
                        <TableCell className={classes.codeCell} align="left" style={{whiteSpace: "pre"}}>
                            {`
{
    ccres(
        assembly: GRCh38
        range: {
            chrom: "chr17", 
            start: 4987634, 
            end: 4987635
        }
    ) {
        total,
        ccres {
            accession,
            details {
                linkedGenes {
                    gene,
                    method
                }
            }
        }
    }
}
                        `}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}