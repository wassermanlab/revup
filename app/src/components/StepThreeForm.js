import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Button,
    Divider,
    FormControl,
    FormLabel,
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
    Tooltip,
    Typography,
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

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
    }

    const handleCommentChange = (key, event) => {
        props.setComments({...props.comments, [key]: event.target.value});
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
                    <Grid container justify="center" spacing={3}>
                        <Grid item xs={10}>
                            <Typography variant="h5" align="left" gutterBottom>
                                Variant Details
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" spacing={3}>
                        {(function () {
                            if(props.variantInfo["variant_id"]) {
                            return (
                            <React.Fragment>
                                <Grid item xs={3}>
                                    <FormLabel>
                                        Variant ID:
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={7}>
                                    <FormLabel>{props.variantInfo["variant_id"]}</FormLabel>
                                </Grid>
                            </React.Fragment>)
                            } else {return ("")}
                        })()}
                    </Grid>
                    <Grid container justify="center" spacing={3}>
                        {(function () {
                            if(props.variantInfo["patient_id"]) {
                            return (
                            <React.Fragment>
                                <Grid item xs={3}>
                                    <FormLabel>
                                        Patient ID:
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={7}>
                                    <FormLabel>{props.variantInfo["patient_id"]}</FormLabel>
                                </Grid>
                            </React.Fragment>)
                            } else {return ("")}
                        })()}
                    </Grid>
                    {/* 
                    <Grid justify="center" container spacing={3}>
                        <Grid item xs={3}>
                            <FormLabel>Variant Description: </FormLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <FormLabel>{props.variantInfo["variant_description"]}</FormLabel>
                        </Grid>
                    </Grid>
                    */}
                    <Grid justify="center" container spacing={3}>
                        <Grid item xs={3}>
                            <FormLabel>hg19 position: </FormLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <FormLabel>{props.assemblies["hg19"]}</FormLabel>
                        </Grid>
                    </Grid>
                    <Grid justify="center" container spacing={3}>
                        <Grid item xs={3}>
                            <FormLabel>hg38 position: </FormLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <FormLabel>{props.assemblies["hg38"]}</FormLabel>
                        </Grid>
                    </Grid>
                    {/* 
                    <Grid justify="center" container spacing={3}>
                        <Grid item xs={3}>
                            <FormLabel>Reference Assembly: </FormLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <FormLabel>{props.variantInfo["ref_genome"]}</FormLabel>
                        </Grid>
                    </Grid>
                    */}
                    <Grid justify="center" container spacing={3}>
                        <Grid item xs={3}>
                            <FormLabel>Target Gene: </FormLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <FormLabel><i>{props.variantInfo["target_gene"]}</i></FormLabel>
                        </Grid>
                    </Grid>
                    <Grid justify="center" container spacing={3}>
                        <Grid item xs={10}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Grid justify="center" container spacing={3}>
                        <Grid item xs={10}>
                            <Typography variant="h5">Clinical Table</Typography>
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
                                                C1.1 - {props.variantInfo["variant_pos"]} is evolutionarily conserved
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
                                                <b>phyloP Score:</b> {props.additionalInfo["c_1_1"]["phylop"]}
                                                <br></br>
                                                <b>phastCons Score:</b> {props.additionalInfo["c_1_1"]["phastcons"]}
                                            </TableCell>
                                            <TableCell>
                                                <TextField fullWidth id="c_1_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["c_1_1"]} onChange={(e) => handleCommentChange('c_1_1', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"c_1_2_row"}>
                                            <TableCell>
                                                {props.initialScores["c_1_2"] ? props.initialScores["c_1_2"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                C1.2 - {props.variantInfo["variant_name"]} is rare in unaffected individuals in specific sets of controls or reference population databases
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
                                                <b>gnomAD AF</b>
                                                <Tooltip title={"gnomAD Allele Frequency"}>
                                                    <InfoOutlinedIcon fontSize="small"/>
                                                </Tooltip> : {props.additionalInfo["c_1_2"]["af"]}
                                            </TableCell>
                                            <TableCell>
                                                <TextField fullWidth id="c_1_2_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["c_1_2"]} onChange={(e) => handleCommentChange('c_1_2', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"c_1_3_row"}>
                                            <TableCell>
                                                {props.initialScores["c_1_3"] ? props.initialScores["c_1_3"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                C1.3 - {props.variantInfo["variant_name"]} or locus previously statistically associated with the same or a similar disease phenotype
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
                                                <TextField fullWidth id="c_1_3_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["c_1_3"]} onChange={(e) => handleCommentChange('c_1_3', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"c_2_1_row"}>
                                            <TableCell>
                                                {props.initialScores["c_2_1"] ? props.initialScores["c_2_1"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                C2.1 - <i>{props.variantInfo["target_gene"]}</i> has been implicated in the same or a similar disease phenotype, or is otherwise relevant
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
                                                <TextField fullWidth id="c_2_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["c_2_1"]} onChange={(e) => handleCommentChange('c_2_1', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"c_2_2_row"}>
                                            <TableCell>
                                                {props.initialScores["c_2_2"] ? props.initialScores["c_2_2"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                C2.2 - <i>{props.variantInfo["target_gene"]}</i> does not contain coding variants in the same individual
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
                                                <TextField fullWidth id="c_2_2_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["c_2_2"]} onChange={(e) => handleCommentChange('c_2_2', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"c_2_3_row"}>
                                            <TableCell>
                                                {props.initialScores["c_2_3"] ? props.initialScores["c_2_3"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                C2.3 - {props.variantInfo["variant_name"]} is considered deleterious by computational prediction methods
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
                                                <b>CADD Score:</b> {props.additionalInfo["c_2_3"]["cadd_score"]}    
                                            </TableCell>
                                            <TableCell>
                                                <TextField fullWidth id="c_2_3_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["c_2_3"]} onChange={(e) => handleCommentChange('c_2_3', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"c_2_4_row"}>
                                            <TableCell>
                                                {props.initialScores["c_2_4"] ? props.initialScores["c_2_4"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                C2.4 - {props.variantInfo["variant_name"]} is similar to another regulatory variant associated to <i>{props.variantInfo["target_gene"]}</i> and implicated in the same or a similar disease phenotype
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
                                                <TextField fullWidth id="c_2_4_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["c_2_4"]} onChange={(e) => handleCommentChange('c_2_4', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"c_2_5_row"}>
                                            <TableCell>
                                                {props.initialScores["c_2_5"] ? props.initialScores["c_2_5"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                C2.5 - {props.variantInfo["variant_name"]} is a striking noncoding event
                                            </TableCell>
                                            <TableCell>
                                                <FormControl fullWidth className={classes.formControl}>
                                                    <Select fullWidth id="c_2_5" value={props.modifiedScores["c_2_5"] ? props.modifiedScores["c_2_5"] : " "} onChange={(e) => handleChange('c_2_5', e)} variant="outlined">
                                                        <MenuItem value={"1"}>1</MenuItem>
                                                        <MenuItem value={"0"}>0</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell>
                                                -
                                            </TableCell>
                                            <TableCell>
                                                <TextField fullWidth id="c_2_5_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["c_2_5"]} onChange={(e) => handleCommentChange('c_2_5', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"c_3_1_row"}>
                                            <TableCell>
                                                {props.initialScores["c_3_1"] ? props.initialScores["c_3_1"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                C3.1 - {props.variantInfo["variant_name"]} shows familial segregation with the disease
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
                                                {props.additionalInfo["c_3_1"] ? props.additionalInfo["c_3_1"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                <TextField fullWidth id="c_3_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["c_3_1"]} onChange={(e) => handleCommentChange('c_3_1', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"c_4_1_row"}>
                                            <TableCell>
                                                {props.initialScores["c_4_1"] ? props.initialScores["c_4_1"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                C4.1 - {props.variantInfo["variant_name"]} observed in multiple, unrelated families with the same disease phenotype
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
                                                <TextField fullWidth id="c_4_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["c_4_1"]} onChange={(e) => handleCommentChange('c_4_1', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"c_4_2_row"}>
                                            <TableCell>
                                                {props.initialScores["c_4_2"] ? props.initialScores["c_4_2"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                C4.2 - {props.variantInfo["variant_name"]} introduction in a cell line leads to a cellular phenotype consistent with the disease phenotype
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
                                                <TextField fullWidth id="c_4_2_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["c_4_2"]} onChange={(e) => handleCommentChange('c_4_2', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"c_5_1_row"}>
                                            <TableCell>
                                                {props.initialScores["c_5_1"] ? props.initialScores["c_5_1"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                C5.1 - {props.variantInfo["variant_name"]} neutralization, in a model organism or cell line, rescues or reverses the phenotype
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
                                                <TextField fullWidth id="c_5_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["c_5_1"]} onChange={(e) => handleCommentChange('c_5_1', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"c_5_2_row"}>
                                            <TableCell>
                                                {props.initialScores["c_5_2"] ? props.initialScores["c_5_2"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                C5.2 - {props.variantInfo["variant_name"]} introduction, in a model organism or a cell line, results in a phenotype that is consistent with the human disease
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
                                                <TextField fullWidth id="c_5_2_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["c_5_2"]} onChange={(e) => handleCommentChange('c_5_2', e)}/>
                                            </TableCell>
                                        </TableRow>                        
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>


                    <Grid justify="center" container spacing={3}>
                        <Grid item xs={10}>
                            <Typography variant="h5">Functional Table</Typography>
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
                                                F1.1 - {props.variantInfo["variant_pos"]} is implicated in TF binding based on experimental data
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
                                                <b>ReMap 2020 Peaks
                                                <Tooltip title={"ReMap is a database of transcriptional regulators peaks derived from curated ChIP-seq, ChIP-exo, DAP-seq experiments in Human"}>
                                                    <InfoOutlinedIcon fontSize="small"/>
                                                </Tooltip> :</b> {props.additionalInfo["f_1_1"]["crms"]}
                                            </TableCell>
                                            <TableCell>
                                                <TextField fullWidth id="f_1_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["f_1_1"]} onChange={(e) => handleCommentChange('f_1_1', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"f_1_2_row"}>
                                            <TableCell>
                                                {props.initialScores["f_1_2"] ? props.initialScores["f_1_2"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                F1.2 - {props.variantInfo["variant_pos"]} localizes to a regulatory region based on genome annotations
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
                                                <b>cCREs
                                                <Tooltip title={"Candidate cis-Regulatory Elements by ENCODE / SCREEN"}>
                                                    <InfoOutlinedIcon fontSize="small"/>
                                                </Tooltip> :</b> {props.additionalInfo["f_1_2"]["ccre_descriptions"]}
                                            </TableCell>
                                            <TableCell>
                                                <TextField fullWidth id="f_1_2_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["f_1_2"]} onChange={(e) => handleCommentChange('f_1_2', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"f_1_3_row"}>
                                            <TableCell>
                                                {props.initialScores["f_1_3"] ? props.initialScores["f_1_3"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                F1.3 - Regulatory region and <i>{props.variantInfo["target_gene"]}</i> are directly linked based on annotation or experimental data
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
                                                <b>Supporting Experiment
                                                <Tooltip title={"Information by ENCODE / SCREEN"}>
                                                    <InfoOutlinedIcon fontSize="small"/>
                                                </Tooltip> :</b> {props.additionalInfo["f_1_3"]}
                                            </TableCell>
                                            <TableCell>
                                                <TextField fullWidth id="f_1_3_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["f_1_3"]} onChange={(e) => handleCommentChange('f_1_3', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"f_1_4_row"}>
                                            <TableCell>
                                                {props.initialScores["f_1_4"] ? props.initialScores["f_1_4"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                F1.4 - {props.variantInfo["variant_name"]} is statistically associated with expression levels of <i>{props.variantInfo["target_gene"]}</i>
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
                                                <b>Supporting Experiment
                                                <Tooltip title={"Information by ENCODE / SCREEN"}>
                                                    <InfoOutlinedIcon fontSize="small"/>
                                                </Tooltip> :</b> {props.additionalInfo["f_1_4"]}
                                            </TableCell>
                                            <TableCell>
                                                <TextField fullWidth id="f_1_4_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["f_1_4"]} onChange={(e) => handleCommentChange('f_1_4', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"f_1_5_row"}>
                                            <TableCell>
                                                {props.initialScores["f_1_5"] ? props.initialScores["f_1_5"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                F1.5 - Regulatory region is shown to regulate gene expression of <i>{props.variantInfo["target_gene"]}</i>
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
                                                <TextField fullWidth id="f_1_5_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["f_1_5"]} onChange={(e) => handleCommentChange('f_1_5', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"f_2_1_row"}>
                                            <TableCell>
                                                {props.initialScores["f_2_1"] ? props.initialScores["f_2_1"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                F2.1 - {props.variantInfo["variant_name"]} causes a change in TF binding and/or chromatin environment
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
                                                <TextField fullWidth id="f_2_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["f_2_1"]} onChange={(e) => handleCommentChange('f_2_1', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"f_2_2_row"}>
                                            <TableCell>
                                                {props.initialScores["f_2_2"] ? props.initialScores["f_2_2"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                F2.2 - {props.variantInfo["variant_name"]} leads to changes in expression of <i>{props.variantInfo["target_gene"]}</i> in patient tissue
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
                                                <TextField fullWidth id="f_2_2_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["f_2_2"]} onChange={(e) => handleCommentChange('f_2_2', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"f_3_1_row"}>
                                            <TableCell>
                                                {props.initialScores["f_3_1"] ? props.initialScores["f_3_1"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                F3.1 - {props.variantInfo["variant_name"]} introduction, in a cell line, leads to changes in expression of <i>{props.variantInfo["target_gene"]}</i>, a reported gene or chromatin environment
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
                                                <TextField fullWidth id="f_3_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["f_3_1"]} onChange={(e) => handleCommentChange('f_3_1', e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={"f_4_1_row"}>
                                            <TableCell>
                                                {props.initialScores["f_4_1"] ? props.initialScores["f_4_1"]: "-"}
                                            </TableCell>
                                            <TableCell>
                                                F4.1 - {props.variantInfo["variant_name"]} introduction, in a model organism, leads to changes in expression of <i>{props.variantInfo["target_gene"]}</i> or a reported gene or chromatin environment
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
                                                <TextField fullWidth id="f_4_1_comments" label="Comments" multiline rows={2} variant="outlined" value={props.comments["f_4_1"]} onChange={(e) => handleCommentChange('f_4_1', e)}/>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Paper>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Note: Once you click Submit, you will obtain the final score as well as a document outlining the details you just provided
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
        </React.Fragment>
    )
}