import React, { /*useEffect,*/ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Button,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography, 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    greyBackground: {
        backgroundColor: '#EFEFEF',
        padding: '50px',
    },
    paper: {
        width: "100%",
        height: "100%",
        padding: "2%",
        
    },
    grid: {
        padding: "0px",
        marginRight: "auto",
        marginLeft: "auto"

    },
}))

export default function Results(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Container maxWidth="lg" className={classes.greyBackground}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" align="left" gutterBottom>
                            Scores
                        </Typography>
                        <Typography variant="body1" align="center">
                            RVE Score: {props.finalResults["rve"]}
                        </Typography>
                        <Typography variant="body1" align="center">
                            Functional Score: {props.finalResults["functional"]}
                        </Typography>
                        <Typography variant="body1" align="center">
                            Clinical Score: {props.finalResults["clinical"]}
                        </Typography>

                        <Grid container spacing={3}>
                        <Typography variant="h4">Results</Typography>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <colgroup>
                                    <col style={{width:'50%'}}/>
                                    <col style={{width:'10%'}}/>
                                    <col style={{width:'40%'}}/>
                                </colgroup>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Evidence Description</TableCell>
                                        <TableCell>Score</TableCell>
                                        <TableCell>Additional Information</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={"c_5_2_row"}>
                                        <TableCell>
                                            C5.2 - Variant introduction (in a model organism) results in a phenotype that is consistent with the human disease
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["c_5_2"] ? props.modifiedScores["c_5_2"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_5_1_row"}>
                                        <TableCell>
                                            C5.1 - Variant neutralization (in a model organism or cell line) rescues or reverses phenotype
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["c_5_1"] ? props.modifiedScores["c_5_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_4_2_row"}>
                                        <TableCell>
                                            C4.2 - Variant results (in a cellular phenotype) consistent with the disease phenotype - Insights are only relevant if the endophenotype assayed is consistent with the disease phenotype
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["c_4_2"] ? props.modifiedScores["c_4_2"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_4_1_row"}>
                                        <TableCell>
                                            C4.1 - Variant observed in multiple, unrelated families with the same disease phenotype - Typically only relevant when multiple well-described pedigrees are available, and in which the variant segregates with disease
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["c_4_1"] ? props.modifiedScores["c_4_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_3_1_row"}>
                                        <TableCell>
                                            C3.1 - Variant shows familial segregation with the disease
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["c_3_1"] ? props.modifiedScores["c_3_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_2_5_row"}>
                                        <TableCell>
                                            C2.5 - Variant is a striking noncoding event - Often involves a large genomic alteration containing many candidate regulatory elements and variants
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["c_2_5"] ? props.modifiedScores["c_2_5"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_2_4_row"}>
                                        <TableCell>
                                            C2.4 - Variant is similar to another regulatory variant associated to the same suspected target gene and implicated in the same or a similar disease phenotype - Variants are often not the exact same, but should be justifiably similar: for example, strong overlap, affect the same TFBS.
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["c_2_4"] ? props.modifiedScores["c_2_4"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_2_3_row"}>
                                        <TableCell>
                                            C2.3 - Variant is considered deleterious by computational prediction methods
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["c_2_3"] ? props.modifiedScores["c_2_3"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            {props.additionalInfo["c_2_3"]}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_2_2_row"}>
                                        <TableCell>
                                            C2.2 - Suspected target gene does not contain coding variants in the same individual - In the gene targeted by the regulatory variant or in other key genes for the phenotype under study - Assess accordance with expected inheritance of the phenotype; that is, present in one or both alleles
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["c_2_2"] ? props.modifiedScores["c_2_2"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_2_1_row"}>
                                        <TableCell>
                                            C2.1 - Suspected target gene has been implicated in the same or a similar disease phenotype, or is otherwise relevant - OMIM disease genes, literature, and gene function can provide insight - Dosage sensitive and haploinsufficient genes may be of increased interest
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["c_2_1"] ? props.modifiedScores["c_2_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_1_3_row"}>
                                        <TableCell>
                                            C1.3 - Variant or locus previously statistically associated with the same or a similar disease phenotype
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["c_1_3"] ? props.modifiedScores["c_1_3"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_1_2_row"}>
                                        <TableCell>
                                            C1.2 - Variant is rare in unaffected individuals in specific sets of controls or reference population databases - Variant absent in databases of unaffected/control individuals; or present with a frequency less than expected given the penetrance and expressivity of the disease - Publications preceding the appearance of large reference databases tend to depend on custom sets of control samples
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["c_1_2"] ? props.modifiedScores["c_1_2"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            {props.additionalInfo["c_1_2"]}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_1_1_row"}>
                                        <TableCell>
                                            C1.1 - Variant position is evolutionarily conserved
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["c_1_1"] ? props.modifiedScores["c_1_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            {props.additionalInfo["c_1_1"]}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_4_1_row"}>
                                        <TableCell>
                                            F4.1 - Variant introduction (in a model organism) leads to changes in expression of target/reporter gene or chromatin environment
                                            - CRISPR genome editing, Cre-Lox recombination (endogenous)
                                            - Reporter gene constructs (exogenous)
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["f_4_1"] ? props.modifiedScores["f_4_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_3_1_row"}>
                                        <TableCell>
                                            F3.1 - Variant introduction (in a cell line) leads to changes in expression of target/reporter gene or chromatin environment
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["f_3_1"] ? props.modifiedScores["f_3_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_2_2_row"}>
                                        <TableCell>
                                            F2.2 - Variant leads to changes in expression of the target gene (in patient tissue)
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["f_2_2"] ? props.modifiedScores["f_2_2"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_2_1_row"}>
                                        <TableCell>
                                            F2.1 - Variant causes a change in TF binding and/or chromatin environment
                                            - Strongest if the studied TF binding site and regulatory region are key proven regulators of target gene expression
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["f_2_1"] ? props.modifiedScores["f_2_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_1_5_row"}>
                                        <TableCell>
                                            F1.5 - Regulatory region is shown to regulate gene expression of the target gene - Typically involves characterization of a newly identified enhancer
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["f_1_5"] ? props.modifiedScores["f_1_5"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_1_4_row"}>
                                        <TableCell>
                                            F1.4 - Variant is statistically associated with expression levels of the target gene
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["f_1_4"] ? props.modifiedScores["f_1_4"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            {props.additionalInfo["f_1_4"]}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_1_3_row"}>
                                        <TableCell>
                                            F1.3 - Regulatory region and target gene are directly linked based on annotation or experimental data
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["f_1_3"] ? props.modifiedScores["f_1_3"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            {props.additionalInfo["f_1_3"]}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_1_2_row"}>
                                        <TableCell>
                                            F1.2 - Variant localizes to a regulatory region based on genome annotations
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["f_1_2"] ? props.modifiedScores["f_1_2"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            {props.additionalInfo["f_1_2"]}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_1_1_row"}>
                                        <TableCell>
                                            F1.1 - Variant position is implicated in TF binding based on experimental data
                                        </TableCell>
                                        <TableCell>
                                            {props.modifiedScores["f_1_1"] ? props.modifiedScores["f_1_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            {props.additionalInfo["f_1_1"]}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    </Paper>
                </Container>
            </div>
        </React.Fragment>
    )
}