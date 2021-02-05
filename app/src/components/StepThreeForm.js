import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Button,
    FormControl,
    Grid,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            //width: '20%',
            //width: '25ch',
            display: "flex",
            height: "100%"
          },
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
    full_width: {
        width: "100%",
    }
}))


export default function StepThreeForm(props) {
    const classes = useStyles();

    const handleChange = (key, event) => {
        props.setModifiedScores({...props.modifiedScores, [key]: event.target.value});

        if (key === "c_3_1") {
            if (event.target.value === "yes") {
                document.getElementById("c_3_1_additional").style.display="block"
            } else {
                document.getElementById("c_3_1_additional").style.display="none"
            }
        }
    }

    const handleNext = () => {
        props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
        props.setModifiedScores({...props.modifiedScores, "calc_scores": true});
    };
    const handleBack = () => {
        props.setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <React.Fragment>
            <form className={classes.root} autoComplete="off">
            <Grid className={classes.grid} container direction="row" justify="center" alignItems="center" alignContent="flex-end" spacing={3}>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Typography variant="h4">Clinical Table</Typography>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <colgroup>
                                    <col style={{width:'8%'}}/>
                                    <col style={{width:'28%'}}/>
                                    <col style={{width:'8%'}}/>
                                    <col style={{width:'23%'}}/>
                                    <col style={{width:'33%'}}/>
                                </colgroup>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Initial Value</TableCell>
                                        <TableCell>Evidence Description</TableCell>
                                        <TableCell>Final Result</TableCell>
                                        <TableCell>Additional Information</TableCell>
                                        <TableCell>Comments</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                <TableRow key={"c_1_1_row"}>
                                        <TableCell>
                                            {props.initialScores["c_1_1"] ? props.initialScores["c_1_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            C1.1 - Variant position is evolutionarily conserved
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="c_1_1" value={props.modifiedScores["c_1_1"] ? props.modifiedScores["c_1_1"] : " "} onChange={(e) => handleChange('c_1_1', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            {props.additionalInfo["c_1_1"]}
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="c_1_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["c_1_1_comments"]} onChange={(e) => handleChange('c_1_1_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_1_2_row"}>
                                        <TableCell>
                                            {props.initialScores["c_1_2"] ? props.initialScores["c_1_2"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            C1.2 - Variant is rare in unaffected individuals in specific sets of controls or reference population databases - Variant absent in databases of unaffected/control individuals; or present with a frequency less than expected given the penetrance and expressivity of the disease - Publications preceding the appearance of large reference databases tend to depend on custom sets of control samples
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="c_1_2" value={props.modifiedScores["c_1_2"] ? props.modifiedScores["c_1_2"] : " "} onChange={(e) => handleChange('c_1_2', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            {props.additionalInfo["c_1_2"]}
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="c_1_2_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["c_1_2_comments"]} onChange={(e) => handleChange('c_1_2_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_1_3_row"}>
                                        <TableCell>
                                            {props.initialScores["c_1_3"] ? props.initialScores["c_1_3"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            C1.3 - Variant or locus previously statistically associated with the same or a similar disease phenotype
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="c_1_3" value={props.modifiedScores["c_1_3"] ? props.modifiedScores["c_1_3"] : " "} onChange={(e) => handleChange('c_1_3', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="c_1_3_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["c_1_3_comments"]} onChange={(e) => handleChange('c_1_3_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_2_1_row"}>
                                        <TableCell>
                                            {props.initialScores["c_2_1"] ? props.initialScores["c_2_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            C2.1 - Suspected target gene has been implicated in the same or a similar disease phenotype, or is otherwise relevant - OMIM disease genes, literature, and gene function can provide insight - Dosage sensitive and haploinsufficient genes may be of increased interest
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="c_2_1" value={props.modifiedScores["c_2_1"] ? props.modifiedScores["c_2_1"] : " "} onChange={(e) => handleChange('c_2_1', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="c_2_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["c_2_1_comments"]} onChange={(e) => handleChange('c_2_1_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_2_2_row"}>
                                        <TableCell>
                                            {props.initialScores["c_2_2"] ? props.initialScores["c_2_2"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            C2.2 - Suspected target gene does not contain coding variants in the same individual - In the gene targeted by the regulatory variant or in other key genes for the phenotype under study - Assess accordance with expected inheritance of the phenotype; that is, present in one or both alleles
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="c_2_2" value={props.modifiedScores["c_2_2"] ? props.modifiedScores["c_2_2"] : " "} onChange={(e) => handleChange('c_2_2', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="c_2_2_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["c_2_2_comments"]} onChange={(e) => handleChange('c_2_2_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_2_3_row"}>
                                        <TableCell>
                                            {props.initialScores["c_2_3"] ? props.initialScores["c_2_3"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            C2.3 - Variant is considered deleterious by computational prediction methods
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="c_2_3" value={props.modifiedScores["c_2_3"] ? props.modifiedScores["c_2_3"] : " "} onChange={(e) => handleChange('c_2_3', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            {props.additionalInfo["c_2_3"]}
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="c_2_3_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["c_2_3_comments"]} onChange={(e) => handleChange('c_2_3_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_2_4_row"}>
                                        <TableCell>
                                            {props.initialScores["c_2_4"] ? props.initialScores["c_2_4"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            C2.4 - Variant is similar to another regulatory variant associated to the same suspected target gene and implicated in the same or a similar disease phenotype - Variants are often not the exact same, but should be justifiably similar: for example, strong overlap, affect the same TFBS.
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="c_2_4" value={props.modifiedScores["c_2_4"] ? props.modifiedScores["c_2_4"] : " "} onChange={(e) => handleChange('c_2_4', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="c_2_4_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["c_2_4_comments"]} onChange={(e) => handleChange('c_2_4_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_3_1_row"}>
                                        <TableCell>
                                            {props.initialScores["c_3_1"] ? props.initialScores["c_3_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            C3.1 - Variant shows familial segregation with the disease
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="c_3_1" value={props.modifiedScores["c_3_1"] ? props.modifiedScores["c_3_1"] : " "} onChange={(e) => handleChange('c_3_1', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="c_3_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["c_3_1_comments"]} onChange={(e) => handleChange('c_3_1_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_4_1_row"}>
                                        <TableCell>
                                            {props.initialScores["c_4_1"] ? props.initialScores["c_4_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            C4.1 - Variant observed in multiple, unrelated families with the same disease phenotype - Typically only relevant when multiple well-described pedigrees are available, and in which the variant segregates with disease
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="c_4_1" value={props.modifiedScores["c_4_1"] ? props.modifiedScores["c_4_1"] : " "} onChange={(e) => handleChange('c_4_1', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="c_4_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["c_4_1_comments"]} onChange={(e) => handleChange('c_4_1_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_4_2_row"}>
                                        <TableCell>
                                            {props.initialScores["c_4_2"] ? props.initialScores["c_4_2"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            C4.2 - Variant results (in a cellular phenotype) consistent with the disease phenotype - Insights are only relevant if the endophenotype assayed is consistent with the disease phenotype
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="c_4_2" value={props.modifiedScores["c_4_2"] ? props.modifiedScores["c_4_2"] : " "} onChange={(e) => handleChange('c_4_2', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="c_4_2_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["c_4_2_comments"]} onChange={(e) => handleChange('c_4_2_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_5_1_row"}>
                                        <TableCell>
                                            {props.initialScores["c_5_1"] ? props.initialScores["c_5_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            C5.1 - Variant neutralization (in a model organism or cell line) rescues or reverses phenotype
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="c_5_1" value={props.modifiedScores["c_5_1"] ? props.modifiedScores["c_5_1"] : " "} onChange={(e) => handleChange('c_5_1', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="c_5_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["c_5_1_comments"]} onChange={(e) => handleChange('c_5_1_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"c_5_2_row"}>
                                        <TableCell>
                                            {props.initialScores["c_5_2"] ? props.initialScores["c_5_2"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            C5.2 - Variant introduction (in a model organism) results in a phenotype that is consistent with the human disease
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="c_5_2" value={props.modifiedScores["c_5_2"] ? props.modifiedScores["c_5_2"] : " "} onChange={(e) => handleChange('c_5_2', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="c_5_2_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["c_5_2_comments"]} onChange={(e) => handleChange('c_5_2_comments', e)}/>
                                        </TableCell>
                                    </TableRow>                        
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography variant="h4">Functional Table</Typography>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <colgroup>
                                    <col style={{width:'8%'}}/>
                                    <col style={{width:'28%'}}/>
                                    <col style={{width:'8%'}}/>
                                    <col style={{width:'23%'}}/>
                                    <col style={{width:'33%'}}/>
                                </colgroup>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Initial Value</TableCell>
                                        <TableCell>Evidence Description</TableCell>
                                        <TableCell>Final Result</TableCell>
                                        <TableCell>Additional Information</TableCell>
                                        <TableCell>Comments</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={"f_1_1_row"}>
                                        <TableCell>
                                            {props.initialScores["f_1_1"] ? props.initialScores["f_1_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            F1.1 - Variant position is implicated in TF binding based on experimental data
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="f_1_1" value={props.modifiedScores["f_1_1"] ? props.modifiedScores["f_1_1"] : " "} onChange={(e) => handleChange('f_1_1', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            {props.additionalInfo["f_1_1"]}
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="f_1_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["f_1_1_comments"]} onChange={(e) => handleChange('f_1_1_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_1_2_row"}>
                                        <TableCell>
                                            {props.initialScores["f_1_2"] ? props.initialScores["f_1_2"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            F1.2 - Variant localizes to a regulatory region based on genome annotations
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="f_1_2" value={props.modifiedScores["f_1_2"] ? props.modifiedScores["f_1_2"] : " "} onChange={(e) => handleChange('f_1_2', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            {props.additionalInfo["f_1_2"]}
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="f_1_2_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["f_1_2_comments"]} onChange={(e) => handleChange('f_1_2_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_1_3_row"}>
                                        <TableCell>
                                            {props.initialScores["f_1_3"] ? props.initialScores["f_1_3"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            F1.3 - Regulatory region and target gene are directly linked based on annotation or experimental data
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="f_1_3" value={props.modifiedScores["f_1_3"] ? props.modifiedScores["f_1_3"] : " "} onChange={(e) => handleChange('f_1_3', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            {props.additionalInfo["f_1_3"]}
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="f_1_3_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["f_1_3_comments"]} onChange={(e) => handleChange('f_1_3_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_1_4_row"}>
                                        <TableCell>
                                            {props.initialScores["f_1_4"] ? props.initialScores["f_1_4"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            F1.4 - Variant is statistically associated with expression levels of the target gene
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="f_1_4" value={props.modifiedScores["f_1_4"] ? props.modifiedScores["f_1_4"] : " "} onChange={(e) => handleChange('f_1_4', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            {props.additionalInfo["f_1_4"]}
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="f_1_4_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["f_1_4_comments"]} onChange={(e) => handleChange('f_1_4_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_1_5_row"}>
                                        <TableCell>
                                            {props.initialScores["f_1_5"] ? props.initialScores["f_1_5"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            F1.5 - Regulatory region is shown to regulate gene expression of the target gene - Typically involves characterization of a newly identified enhancer
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="f_1_5" value={props.modifiedScores["f_1_5"] ? props.modifiedScores["f_1_5"] : " "} onChange={(e) => handleChange('f_1_5', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="f_1_5_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["f_1_5_comments"]} onChange={(e) => handleChange('f_1_5_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_2_1_row"}>
                                        <TableCell>
                                            {props.initialScores["f_2_1"] ? props.initialScores["f_2_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            F2.1 - Variant causes a change in TF binding and/or chromatin environment
                                            - Strongest if the studied TF binding site and regulatory region are key proven regulators of target gene expression
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="f_2_1" value={props.modifiedScores["f_2_1"] ? props.modifiedScores["f_2_1"] : " "} onChange={(e) => handleChange('f_2_1', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="f_2_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["f_2_1_comments"]} onChange={(e) => handleChange('f_2_1_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_2_2_row"}>
                                        <TableCell>
                                            {props.initialScores["f_2_2"] ? props.initialScores["f_2_2"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            F2.2 - Variant leads to changes in expression of the target gene (in patient tissue)
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="f_2_2" value={props.modifiedScores["f_2_2"] ? props.modifiedScores["f_2_2"] : " "} onChange={(e) => handleChange('f_2_2', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="f_2_2_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["f_2_2_comments"]} onChange={(e) => handleChange('f_2_2_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_3_1_row"}>
                                        <TableCell>
                                            {props.initialScores["f_3_1"] ? props.initialScores["f_3_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            F3.1 - Variant introduction (in a cell line) leads to changes in expression of target/reporter gene or chromatin environment
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="f_3_1" value={props.modifiedScores["f_3_1"] ? props.modifiedScores["f_3_1"] : " "} onChange={(e) => handleChange('f_3_1', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="f_3_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["f_3_1_comments"]} onChange={(e) => handleChange('f_3_1_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={"f_4_1_row"}>
                                        <TableCell>
                                            {props.initialScores["f_4_1"] ? props.initialScores["f_4_1"]: "-"}
                                        </TableCell>
                                        <TableCell>
                                            F4.1 - Variant introduction (in a model organism) leads to changes in expression of target/reporter gene or chromatin environment
                                            - CRISPR genome editing, Cre-Lox recombination (endogenous)
                                            - Reporter gene constructs (exogenous)
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <Select fullWidth id="f_4_1" value={props.modifiedScores["f_4_1"] ? props.modifiedScores["f_4_1"] : " "} onChange={(e) => handleChange('f_4_1', e)} variant="outlined">
                                                    <MenuItem value={"1"}>1</MenuItem>
                                                    <MenuItem value={"0"}>0</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            -
                                        </TableCell>
                                        <TableCell>
                                            <TextField fullWidth id="f_4_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.query["f_4_1_comments"]} onChange={(e) => handleChange('f_4_1_comments', e)}/>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Paper>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Note: Once you click Next, you will obtain the final score as well as a document outlining the details you just provided
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button onClick={handleBack} className={classes.backButton}>
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            </form>
            
                {/*
                
                */}
            
            
        </React.Fragment>
    )
}