import React from 'react';
import { 
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Grid,
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
}));

export default function ClinicalEvidenceClassificationTable () {
    const classes = useStyles();
    return (
        <TableContainer>
            <Table aria-label="clinical table" style={{whiteSpace: 'pre-line' }}>
                <colgroup>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'20%'}}/>
                    <col style={{width:'35%'}}/>
                    <col style={{ width:'35%'}}/>
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell colspan={2} className={classes.tableHead}>
                            Evidence Level
                        </TableCell>
                        <TableCell className={classes.tableHead}>
                            Evidence for Pathogenicity
                        </TableCell>
                        <TableCell className={classes.tableHead}>
                            Examples
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell rowspan={2} align="center">
                            5 {"\n"} (High)
                        </TableCell>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    5.2
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    Vb
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Variant introduction (in a model organism results in a phenotype that is consistent with the human disease
                        </TableCell>
                        <TableCell>
                            - Transgenic model organism developed using CRISPR genome editing
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    5.1
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    *
                                </Grid>
                                <Grid item xs={3}>
                                    V
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Variant neutralization (in a model organism or cell line) rescues or reverses phenotype
                        </TableCell>
                        <TableCell>
                            - Knockout/knockdown/silencing of the variant in gain-offunction scenarios {"\n"}
                            - Complementation in loss-of-function scenarios
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowspan={2} align="center">
                            4
                        </TableCell>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    4.2
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    V
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Variant results (in a cellular phenotype) consistent with the disease phenotype {"\n"}
                            - Insights are only relevant if the endophenotype assayed is consistent with the disease phenotype
                        </TableCell>
                        <TableCell>
                        - Patient-derived tissue/cells/induced pluripotent stem cells (iPSCs) {"\n"}
                        - Transgenic cell lines {"\n"}
                        - In vivo essays of cellular function
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    4.1
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    V
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Variant observed in multiple, unrelated families with the same disease phenotype {"\n"}
                            - Typically only relevant when multiple well-described pedigrees are available, and in which the variant segregates with disease
                        </TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">
                            3
                        </TableCell>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    3.1
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    V
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Variant shows familial segregation with the disease {"\n"}
                            - Variant or locus segregates with affected and unaffected disease status in family pedigree{"\n"}
                            - Should be considered stronger with increasing segregation data in larger families. For example, de novo variants
                            identified in a family trio are weak segregation evidence.
                        </TableCell>
                        <TableCell>
                            - Trio whole-genome analysis {"\n"}
                            - Linkage analysis
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowspan={5} align="center">
                            2
                        </TableCell>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    2.5
                                </Grid>
                                <Grid item xs={3}>
                                    @
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    V
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Variant is a striking noncoding event {"\n"}
                            - Often involves a large genomic alteration containing many candidate regulatory elements and variants
                        </TableCell>
                        <TableCell>
                            - Copy number changes, translocation/breakpoint mapping, aCGH, MLPA ...
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    2.4
                                </Grid>
                                <Grid item xs={3}>
                                    @
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    V
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Variant is similar to another regulatory variant associated to the same suspected target gene and implicated in the same or a similar disease phenotype {"\n"}
                            - Variants are often not the exact same, but should be justifiably similar: for example, strong overlap, affect the same TFBS.
                        </TableCell>
                        <TableCell>
                            - ClinVar, DECIPHER, GeneMatcher
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    2.3
                                </Grid>
                                <Grid item xs={3}>
                                    @
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    V
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Variant is considered deleterious by computational prediction methods {"\n"}
                            - Using in silico tools designed to include noncoding variants
                        </TableCell>
                        <TableCell>
                            - CADD, FATHMM, FunSeq2, ReMM, NCBoost, ncGERP ...
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    2.2
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    G
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Suspected target gene does not contain coding variants in the same individual {"\n"}
                            - In the gene targeted by the regulatory variant or in other key genes for the phenotype under study {"\n"}
                            - Assess accordance with expected inheritance of the phenotype; that is, present in one or both alleles {"\n"}
                        </TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    2.1
                                </Grid>
                                <Grid item xs={3}>
                                    @
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    G
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Suspected target gene has been implicated in the same or a similar disease phenotype, or is otherwise relevant {"\n"}
                            - OMIM disease genes, literature, and gene function can provide insight {"\n"}
                            - Dosage sensitive and haploinsufficient genes may be of increased interest {"\n"}
                        </TableCell>
                        <TableCell>
                            - Other human patients {"\n"}
                            - Knockout mice, biological link with phenotype, pLI metric
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowspan={3} align="center">
                            1 {"\n"} (Low)
                        </TableCell>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    1.3
                                </Grid>
                                <Grid item xs={3}>
                                    @
                                </Grid>
                                <Grid item xs={3}>
                                    *
                                </Grid>
                                <Grid item xs={3}>
                                    V
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Variant or locus previously statistically associated with the same or a similar disease phenotype
                        </TableCell>
                        <TableCell>
                            - GWAS, risk alleles {"\n"}
                            - Somatic recurrence in cancer
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    1.2
                                </Grid>
                                <Grid item xs={3}>
                                    @
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    V
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Variant is rare in unaffected individuals in specific sets of controls or reference population databases {"\n"}
                            - Variant absent in databases of unaffected/control individuals; or present with a frequency less than expected given the penetrance and expressivity of the disease {"\n"}
                            - Publications preceeding the appearance of large reference databases tend to depend on custom sets of control samples
                        </TableCell>
                        <TableCell>
                            - gnomAD {"\n"}
                            - Control samples
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    1.1
                                </Grid>
                                <Grid item xs={3}>
                                    @
                                </Grid>
                                <Grid item xs={3}> 
                                </Grid>
                                <Grid item xs={3}>
                                    V
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Variant position is evolutionarily conserved
                        </TableCell>
                        <TableCell>
                            - Genome browser conservation tracks
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

    )

}