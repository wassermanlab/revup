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

export default function FunctionalEvidenceClassificationTable () {
    const classes = useStyles();
    return (
        <TableContainer>
            <Table aria-label="clinical table" style={{whiteSpace: 'pre-line' }}>
                <colgroup>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'20%'}}/>
                    <col style={{width:'35%'}}/>
                    <col style={{width:'35%'}}/>
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
                        <TableCell rowspan={1} align="center">
                            4 {"\n"} (High)
                        </TableCell>
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
                            Variant introduction (in a model organism) leads to changes in expression of target/reporter gene orchromatin environment {"\n"}
                            - CRISPR genome editing, Cre-Lox recombination (endogenous) {"\n"}
                            - Reporter gene constructs (exogenous)
                        </TableCell>
                        <TableCell>
                            - Any relevant technique listed under F2, below
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowspan={1} align="center">
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
                            Variant introduction (in a cell line) leads to changes in expression of target/reporter gene or chromatin environment {"\n"}
                            - Engineered cell line or in vitro model system
                        </TableCell>
                        <TableCell>
                            - Luciferase/LacZ reporter assay {"\n"}
                            - MPRA/STARR-seq {"\n"}
                            - Any relevant technique listed under F2
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowspan={2} align="center">
                            2
                        </TableCell>
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
                                    V
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Variant leads to changes in expression of the target gene (in patient tissue) {"\n"}
                            - Patient material compared with controls. Material from for example, tissue biopsy, cultured cells, iPSCs
                        </TableCell>
                        <TableCell>
                            - RT-qPCR/RNA-seq expression analysis {"\n"}
                            - Allele-specific expression (ASE) {"\n"}
                            - Staining, immunohistochemistry
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    2.1
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
                            Variant causes a change in TF binding and/or chromatin environment{"\n"}
                            - Strongest if the studied TF binding site and regulatory region are key proven regulators of target gene expression
                        </TableCell>
                        <TableCell>
                            - ChIP-seq/ChIP-qPCR/ChIP-MS (in vivo) {"\n"}
                            - EMSA (in vitro) {"\n"}
                            - Allele-specific binding (ASB) {"\n"}
                            - Changes to chromatin domains/environment, DNA methylation
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowspan={5} align="center">
                            1 {"\n"} (Low)
                        </TableCell>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    1.5
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    *
                                </Grid>
                                <Grid item xs={3}>
                                    R-G
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Regulatory region is shown to regulate gene expression of the target gene {"\n"}
                            - Typically involves characterization of a newly identified enhancer
                        </TableCell>
                        <TableCell>
                            - Transgene reporter expression
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    1.4
                                </Grid>
                                <Grid item xs={3}>
                                    @
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    V-G
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Variant is statistically associated with expression levels of the target gene
                        </TableCell>
                        <TableCell>
                            - cis-eQTL
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    1.3
                                </Grid>
                                <Grid item xs={3}>
                                    @
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    R-G
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Regulatory region and target gene are directly linked based on annotation or experimental data
                        </TableCell>
                        <TableCell>
                            - Core and proximal promoter annotations {"\n"}
                            - Chromosome conformation capture (e.g., 3C, 5C, Hi-C), ChIAPET
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
                            Variant localizes to a regulatory region based on genome annotations
                        </TableCell>
                        <TableCell>
                            - Known or predicted regulatory elements (enhancers, promoters) {"\n"}
                            - Chromatin accessibility and histone ChIP-seq data
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
                            Variant position is implicated in TF binding based on experimental data
                        </TableCell>
                        <TableCell>
                            - TF ChIP-seq datasets (e.g., ENCODE and ReMAP)
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowspan={2} align="center">
                            0 {"\n"} (No Value)
                        </TableCell>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    0.2
                                </Grid>
                                <Grid item xs={3}>
                                    @
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    V-G
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            Variant and target gene locate to the same structural domain according to chromatin annotations
                        </TableCell>
                        <TableCell>
                            - 3D genome browser, TADs
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container justify="flex-start" spacing={3}>
                                <Grid item xs={3}>
                                    0.1
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
                            Variant predicted to change a TF binding (sequence) motif
                        </TableCell>
                        <TableCell>
                            - TFBS resources, (e.g., JASPAR, CIS-BP, Hocomoco)
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}