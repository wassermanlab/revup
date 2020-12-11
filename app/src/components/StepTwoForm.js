import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Button,
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


export default function StepTwoForm(props) {
    const classes = useStyles();

    const handleNext = () => {
        props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
        var query = {
            "results": props.results
        }
        props.setQuery(query)

    };
    const handleBack = () => {
        props.setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
   const handleChange = (key, event) => {
        props.setResults({...props.results, [key]: event.target.value});

        if (key === "func_analysis") {
            if (event.target.value === "yes") {
                document.getElementById("func_analysis_questions").style.display="block"
            } else {
                document.getElementById("func_analysis_questions").style.display="none"
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
                                <Typography variant="h4" align="left" gutterBottom>
                                    {props.results["variant_id"] ? "Variant " + props.results["variant_id"] : ""}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>{props.results["target_gene"]} has been implicated in the same or a similar disease phenotype, or is otherwise relevant</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Select fullWidth id="c_2_1" value={props.results["c_2_1"] ? props.results["c_2_1"] : "unknown"} onChange={(e) => handleChange('c_2_1', e)} variant="outlined">
                                        <MenuItem value={"yes"}>Yes</MenuItem>
                                        <MenuItem value={"no"}>No</MenuItem>
                                        <MenuItem value={"unknown"}>Unknown</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>{props.results["target_gene"]} does not contain coding variants in the same individual</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Select id="c_2_2" value={props.results["c_2_2"] ? props.results["c_2_2"] : "unknown"} onChange={(e) => handleChange('c_2_2', e)} variant="outlined">
                                        <MenuItem value={"yes"}>Yes</MenuItem>
                                        <MenuItem value={"no"}>No</MenuItem>
                                        <MenuItem value={"unknown"}>Unknown</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>Variant is similar to another regulatory variant associated to {props.results["target_gene"]} and implicated in the same or a similar disease phenotype</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Select id="c_2_4" value={props.results["c_2_4"] ? props.results["c_2_4"] : "unknown"} onChange={(e) => handleChange('c_2_4', e)} variant="outlined">
                                        <MenuItem value={"yes"}>Yes</MenuItem>
                                        <MenuItem value={"no"}>No</MenuItem>
                                        <MenuItem value={"unknown"}>Unknown</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={5}>
                                <FormLabel>Any functional analyses were performed to study the variant defect?</FormLabel>
                                <Tooltip title={"If yes is selected, detailed questions concerning the functional analysis will be asked"}>
                                    <InfoOutlinedIcon fontSize="small"/>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Select id="func_analysis" value={props.results["func_analysis"] ? props.results["func_analysis"] : "no"} onChange={(e) => handleChange('func_analysis', e)} variant="outlined">
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
                                    <FormLabel>Variant results (in a cellular phenotype) consistent with the disease phenotype</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="c_4_2" value={props.results["c_4_2"] ? props.results["c_4_2"] : "unknown"} onChange={(e) => handleChange('c_4_2', e)} variant="outlined">
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
                                    <FormLabel>Variant neutralization (in a model organism or cell line) rescues or reverses phenotype</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="c_5_1" value={props.results["c_5_1"] ? props.results["c_5_1"] : "unknown"} onChange={(e) => handleChange('c_5_1', e)} variant="outlined">
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
                                    <FormLabel>Variant introduction (in a model organism or cell line) results in a phenotype that is consistent with the human disease</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="c_5_2" value={props.results["c_5_2"] ? props.results["c_5_2"] : "unknown"} onChange={(e) => handleChange('c_5_2', e)} variant="outlined">
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
                                    <FormLabel>Variant position is implicated in TF binding based on experimental data</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="f_1_1" value={props.results["f_1_1"] ? props.results["f_1_1"] : "unknown"} onChange={(e) => handleChange('f_1_1', e)} variant="outlined">
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
                                    <FormLabel>Regulatory region is shown to regulate gene expression of {props.results["target_gene"]}. Typically involves characterization of a newly identified enhancer</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="f_1_5" value={props.results["f_1_5"] ? props.results["f_1_5"] : "unknown"} onChange={(e) => handleChange('f_1_5', e)} variant="outlined">
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
                                    <FormLabel>Variant causes a change in TF binding and/or chromatin environment</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="f_2_1" value={props.results["f_2_1"] ? props.results["f_2_1"] : "unknown"} onChange={(e) => handleChange('f_2_1', e)} variant="outlined">
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
                                    <FormLabel>Variant leads to changes in expression of {props.results["target_gene"]} (in patient tissue)</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="f_2_2" value={props.results["f_2_2"] ? props.results["f_2_2"] : "unknown"} onChange={(e) => handleChange('f_2_2', e)} variant="outlined">
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
                                    <FormLabel>Variant introduction (in a cell line) leads to changes in expression of {props.results["target_gene"]} or a reported gene or chromatin environment</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="f_3_1" value={props.results["f_3_1"] ? props.results["f_3_1"] : "unknown"} onChange={(e) => handleChange('f_3_1', e)} variant="outlined">
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
                                    <FormLabel>Variant introduction (in a model organism) leads to changes in expression of {props.results["target_gene"]} or a reported gene or chromatin environment</FormLabel>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select id="f_4_1" value={props.results["f_4_1"] ? props.results["f_4_1"] : "unknown"} onChange={(e) => handleChange('f_4_1', e)} variant="outlined">
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


            <div>
                
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