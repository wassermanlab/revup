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
        display: "flex",
        alignContent: "center",
        justify: "center",
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
    infoIcon: {
        fontSize: 15,
        color: "#BCBCBC",
    },
}))


export default function StepTwoForm(props) {
    window.scrollTo(0, 0)
    const classes = useStyles();

    const handleNext = () => {
        props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
        props.setQuery({...props.query, "calc_scores": true});

    };
    const handleBack = () => {
        props.setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
   const handleChange = (key, event) => {
        props.setQuery({...props.query, [key]: event.target.value});

        if (key === "func_analysis") {
            if (event.target.value === "yes") {
                document.getElementById("func_analysis_questions").style.display="block"
            } else {
                document.getElementById("func_analysis_questions").style.display="none"
                // TODO: Set all func analysis question answers to "unknown" or "no"
                var x = document.getElementById("func_analysis_questions").querySelectorAll(".select");
                console.log(x)
            }
        }
    }


    return (
        <React.Fragment>
            <form className={classes.root} autoComplete="off">
                <Grid className={classes.grid} container direction="row" justify="center" alignItems="center" alignContent="flex-end" spacing={3}>
                    <Paper className={classes.paper}>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={10}>
                                <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                    <b>Variant Details</b>
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
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={3}>
                                <FormLabel>Variant Description:</FormLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <FormLabel>{props.variantInfo["variant_description"]}</FormLabel>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={3}>
                                <FormLabel>Reference Assembly:</FormLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <FormLabel>{props.variantInfo["ref_genome"]}</FormLabel>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={3}>
                                <FormLabel>Patient's Genotype:</FormLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <FormLabel>{props.variantInfo["genotype"]}</FormLabel>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={3}>
                                <FormLabel>Target Gene:</FormLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <FormLabel><i>{props.variantInfo["target_gene"]}</i></FormLabel>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Divider />
                        <br></br>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={10}>
                                <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                    <b>Gene Details</b>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel><i>{props.variantInfo["target_gene"]}</i> does not contain coding variants in the same individual</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Select id="c_2_2" value={props.query["c_2_2"] ? props.query["c_2_2"] : "unknown"} onChange={(e) => handleChange('c_2_2', e)} variant="outlined">
                                        <MenuItem value={"yes"}>Yes (i.e. {props.variantInfo["target_gene"]} contains coding variants)</MenuItem>
                                        <MenuItem value={"no"}>No (i.e. {props.variantInfo["target_gene"]} does not contain coding variants)</MenuItem>
                                        <MenuItem value={"unknown"}>Unknown (i.e. {props.variantInfo["target_gene"]} was not sequenced)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel><i>{props.variantInfo["target_gene"]}</i> has been implicated in the same or a similar disease phenotype, or is otherwise relevant</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Select fullWidth id="c_2_1" value={props.query["c_2_1"] ? props.query["c_2_1"] : "unknown"} onChange={(e) => handleChange('c_2_1', e)} variant="outlined">
                                        <MenuItem value={"yes"}>Yes</MenuItem>
                                        <MenuItem value={"no"}>No</MenuItem>
                                        <MenuItem value={"unknown"}>Unknown</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>{props.variantInfo["variant_name"]} is similar to another regulatory variant associated to <i>{props.variantInfo["target_gene"]}</i> and implicated in the same or a similar disease phenotype</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Select id="c_2_4" value={props.query["c_2_4"] ? props.query["c_2_4"] : "unknown"} onChange={(e) => handleChange('c_2_4', e)} variant="outlined">
                                        <MenuItem value={"yes"}>Yes</MenuItem>
                                        <MenuItem value={"no"}>No</MenuItem>
                                        <MenuItem value={"unknown"}>Unknown</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Divider />
                        <br></br>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={10}>
                                <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                    <b>Functional Analyses</b>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>Functional analyses were performed to study the variant defect </FormLabel>
                                <Tooltip title={"If yes is selected, detailed questions concerning the functional analysis will be asked"}>
                                    <InfoOutlinedIcon className={classes.infoIcon}/>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Select id="func_analysis" value={props.query["func_analysis"] ? props.query["func_analysis"] : "no"} onChange={(e) => handleChange('func_analysis', e)} variant="outlined">
                                        <MenuItem value={"yes"}>Yes</MenuItem>
                                        <MenuItem value={"no"}>No</MenuItem>
                                        <MenuItem value={"unknown"}>Unknown</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <div id="func_analysis_questions" style={{display: "none"}}>
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={1}/>
                                <Grid item xs={4}>
                                    <FormLabel>{props.variantInfo["variant_pos"]} is implicated in TF 
                                        <Tooltip title={"Transcription Factor"}>
                                            <InfoOutlinedIcon className={classes.infoIcon}/>
                                        </Tooltip>
                                    {" "}binding based on experimental data</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="f_1_1" value={props.query["f_1_1"] ? props.query["f_1_1"] : "unknown"} onChange={(e) => handleChange('f_1_1', e)} variant="outlined">
                                            <MenuItem value={"yes"}>Yes</MenuItem>
                                            <MenuItem value={"no"}>No</MenuItem>
                                            <MenuItem value={"unknown"}>Unknown</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={1}/>
                                <Grid item xs={4}>
                                    <FormLabel>{props.variantInfo["variant_name"]} causes a change in TF 
                                        <Tooltip title={"Transcription Factor"}>
                                            <InfoOutlinedIcon className={classes.infoIcon}/>
                                        </Tooltip>
                                    {" "}binding and/or chromatin environment</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="f_2_1" value={props.query["f_2_1"] ? props.query["f_2_1"] : "unknown"} onChange={(e) => handleChange('f_2_1', e)} variant="outlined">
                                            <MenuItem value={"yes"}>Yes</MenuItem>
                                            <MenuItem value={"no"}>No</MenuItem>
                                            <MenuItem value={"unknown"}>Unknown</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={1}/>
                                <Grid item xs={4}>
                                    <FormLabel>Regulatory region is shown to regulate gene expression of <i>{props.variantInfo["target_gene"]}</i></FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="f_1_5" value={props.query["f_1_5"] ? props.query["f_1_5"] : "unknown"} onChange={(e) => handleChange('f_1_5', e)} variant="outlined">
                                            <MenuItem value={"yes"}>Yes</MenuItem>
                                            <MenuItem value={"no"}>No</MenuItem>
                                            <MenuItem value={"unknown"}>Unknown</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={1}/>
                                <Grid item xs={4}>
                                    <FormLabel>{props.variantInfo["variant_name"]} leads to changes in expression of <i>{props.variantInfo["target_gene"]}</i> in patient tissue</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="f_2_2" value={props.query["f_2_2"] ? props.query["f_2_2"] : "unknown"} onChange={(e) => handleChange('f_2_2', e)} variant="outlined">
                                            <MenuItem value={"yes"}>Yes</MenuItem>
                                            <MenuItem value={"no"}>No</MenuItem>
                                            <MenuItem value={"unknown"}>Unknown</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={1}/>
                                <Grid item xs={4}>
                                    <FormLabel>{props.variantInfo["variant_name"]} introduction in a cell line leads to changes in expression of <i>{props.variantInfo["target_gene"]}</i>, a reported gene or chromatin environment</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="f_3_1" value={props.query["f_3_1"] ? props.query["f_3_1"] : "unknown"} onChange={(e) => handleChange('f_3_1', e)} variant="outlined">
                                            <MenuItem value={"yes"}>Yes</MenuItem>
                                            <MenuItem value={"no"}>No</MenuItem>
                                            <MenuItem value={"unknown"}>Unknown</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={1}/>
                                <Grid item xs={4}>
                                    <FormLabel>{props.variantInfo["variant_name"]} introduction in a cell line leads to a cellular phenotype consistent with the disease phenotype</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="c_5_2" value={props.query["c_5_2"] ? props.query["c_5_2"] : "unknown"} onChange={(e) => handleChange('c_5_2', e)} variant="outlined">
                                            <MenuItem value={"yes"}>Yes</MenuItem>
                                            <MenuItem value={"no"}>No</MenuItem>
                                            <MenuItem value={"unknown"}>Unknown</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={1}/>
                                <Grid item xs={4}>
                                    <FormLabel>{props.variantInfo["variant_name"]} neutralization, in a model organism or cell line, rescues or reverses the phenotype</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="c_5_1" value={props.query["c_5_1"] ? props.query["c_5_1"] : "unknown"} onChange={(e) => handleChange('c_5_1', e)} variant="outlined">
                                            <MenuItem value={"yes"}>Yes</MenuItem>
                                            <MenuItem value={"no"}>No</MenuItem>
                                            <MenuItem value={"unknown"}>Unknown</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={1}/>
                                <Grid item xs={4}>
                                    <FormLabel>{props.variantInfo["variant_name"]} introduction, in a model organism, results in a phenotype that is consistent with the human diseases</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="c_4_2" value={props.query["c_4_2"] ? props.query["c_4_2"] : "unknown"} onChange={(e) => handleChange('c_4_2', e)} variant="outlined">
                                            <MenuItem value={"yes"}>Yes</MenuItem>
                                            <MenuItem value={"no"}>No</MenuItem>
                                            <MenuItem value={"unknown"}>Unknown</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={1}/>
                                <Grid item xs={4}>
                                    <FormLabel>{props.variantInfo["variant_name"]} introduction, in a model organism, leads to changes in expression of <i>{props.variantInfo["target_gene"]}</i> or a reported gene or chromatin environment</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="f_4_1" value={props.query["f_4_1"] ? props.query["f_4_1"] : "unknown"} onChange={(e) => handleChange('f_4_1', e)} variant="outlined">
                                            <MenuItem value={"yes"}>Yes</MenuItem>
                                            <MenuItem value={"no"}>No</MenuItem>
                                            <MenuItem value={"unknown"}>Unknown</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                    </Paper>
                </Grid>
            </form>
            <div style={{display:'flex', justifyContent:'flex-end', alignItems:'flex-end'}}>
                <Button onClick={handleBack} className={classes.backButton}>
                    Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                </Button>
            </div>
        </React.Fragment>
    )
}