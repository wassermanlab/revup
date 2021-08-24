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
import ReactHtmlParser from 'react-html-parser';

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


export default function StepThreeForm(props) {
    window.scrollTo(0, 0)
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
                            <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                <b>Variant Details</b>
                            </Typography>
                        </Grid>
                    </Grid>
                    {(function () {
                        if(props.variantInfo["variant_id"]) {
                            return (
                                <React.Fragment>
                                    <Grid container justify="center" spacing={3}>
                                        <Grid item xs={3}>
                                            <FormLabel>
                                                Variant ID:
                                            </FormLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <FormLabel>{props.variantInfo["variant_id"]}</FormLabel>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>)}
                    })()}
                    {(function () {
                        if(props.variantInfo["patient_id"]) {
                            return (
                                <React.Fragment>
                                    <Grid container justify="center" spacing={3}>
                                        <Grid item xs={3}>
                                            <FormLabel>
                                                Patient ID:
                                            </FormLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <FormLabel>{props.variantInfo["patient_id"]}</FormLabel>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>)}
                    })()}
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
                    <Grid container justify="center" spacing={3}>
                        <Grid item xs={3}>
                            <FormLabel>Patient's Genotype:</FormLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <FormLabel>{props.variantInfo["genotype"]}</FormLabel>
                        </Grid>
                    </Grid>
                    {(function () {
                        if(props.variantInfo["phenotype"]) {
                            return (
                                <React.Fragment>
                                    <Grid container justify="center" spacing={3}>
                                        <Grid item xs={3}>
                                            <FormLabel>
                                                    Patient's Phenotype:
                                            </FormLabel>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <FormLabel>{props.variantInfo["phenotype"]}</FormLabel>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>)}
                    })()}
                    <Grid container justify="center" spacing={3}>
                        <Grid item xs={3}>
                            <FormLabel>Identification Method:</FormLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <FormLabel>{props.variantInfo["identification_method"]}</FormLabel>
                        </Grid>
                    </Grid>
                    <Grid justify="center" container spacing={3}>
                        <Grid item xs={3}>
                            <FormLabel>Target Gene: </FormLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <FormLabel><i>{props.variantInfo["target_gene"]}</i></FormLabel>
                        </Grid>
                    </Grid>
                    <br></br>
                    <Divider />
                    <br></br>
                    <Grid justify="center" container spacing={3}>
                        <Grid item xs={10}>
                            <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                <b>Clinical Table</b>
                            </Typography>
                            <TableContainer>
                                <Table aria-label="simple table">
                                    <colgroup>
                                        <col style={{width:'11%'}}/>
                                        <col style={{width:'25%'}}/>
                                        <col style={{width:'10%'}}/>
                                        <col style={{width:'24%'}}/>
                                        <col style={{width:'30%'}}/>
                                    </colgroup>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Initial {" "}
                                                <Tooltip title={"Value calculated based on external database and user's input"}>
                                                    <InfoOutlinedIcon className={classes.infoIcon}/>
                                                </Tooltip>
                                                <br></br>Value
                                            </TableCell>
                                            <TableCell>
                                                Evidence {" "}
                                                <Tooltip title={"Evidence level used in the scoring framework"}>
                                                    <InfoOutlinedIcon className={classes.infoIcon}/>
                                                </Tooltip>
                                                <br></br>Description
                                            </TableCell>
                                            <TableCell>
                                                Final {" "}
                                                <Tooltip title={"Final value to be used in the calculation of RVE score. This value is modifiable based on information the user may have."}>
                                                    <InfoOutlinedIcon className={classes.infoIcon}/>
                                                </Tooltip>
                                                <br></br>Result
                                            </TableCell>
                                            <TableCell>
                                                Additional {" "}
                                                <Tooltip title={"Additional information related to queries from external databases"}>
                                                    <InfoOutlinedIcon className={classes.infoIcon}/>
                                                </Tooltip>
                                                <br></br>Information
                                            </TableCell>
                                            <TableCell style={{ verticalAlign: 'top' }}>
                                                Comments {" "}
                                                <Tooltip title={"For the user to record any information they feel is relevant to the topic"}>
                                                    <InfoOutlinedIcon className={classes.infoIcon}/>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.keys(props.clinicalEvidenceLabels).map((key, index) => (
                                            <TableRow key={key + '_row'}>
                                                <TableCell>
                                                    {props.initialScores[key]}
                                                </TableCell>
                                                <TableCell>
                                                    {ReactHtmlParser(props.clinicalEvidenceLabels[key])}
                                                </TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth className={classes.formControl}>
                                                        <Select fullWidth id={key} value={props.modifiedScores[key] ? props.modifiedScores[key] : ""} onChange={(e) => handleChange(key, e)} variant="outlined">
                                                            <MenuItem value={"1"}>1</MenuItem>
                                                            <MenuItem value={"0"}>0</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>
                                                    {(function () {
                                                        if(key === "c_1_1") {
                                                            return (
                                                                <React.Fragment>
                                                                    <b>phyloP Score</b>
                                                                    <Tooltip title={"phyloP score > 1.5 indicates variant is more conserved"}>
                                                                        <InfoOutlinedIcon className={classes.infoIcon}/>
                                                                    </Tooltip> : {props.additionalInfo["c_1_1"]["phylop"]}
                                                                    <br></br>
                                                                    <b>phastCons Score</b> 
                                                                    <Tooltip title={"phastCons score > 0.5 indicates variant is more conserved"}>
                                                                        <InfoOutlinedIcon className={classes.infoIcon}/>
                                                                    </Tooltip> : {props.additionalInfo["c_1_1"]["phastcons"]}
                                                                </React.Fragment>
                                                            )
                                                        } else if(key === "c_1_2") {
                                                            if(props.variantInfo["genotype"] === "Homozygous") {
                                                                return (
                                                                    <React.Fragment>
                                                                        <b>Num. of homozygotes</b>
                                                                        <Tooltip title={"Number of homozygotes determined from gnomAD"}>
                                                                            <InfoOutlinedIcon className={classes.infoIcon}/>
                                                                        </Tooltip> : {props.additionalInfo["c_1_2"]["num_homozygotes"]}
                                                                        <br></br>
                                                                        <b>gnomAD AF</b>
                                                                        <Tooltip title={"gnomAD allele frequency < 0.05 indicates variant is rare in reference population databases"}>
                                                                            <InfoOutlinedIcon className={classes.infoIcon}/>
                                                                        </Tooltip> : {props.additionalInfo["c_1_2"]["af"]}
                                                                    </React.Fragment>
                                                                )
                                                            } else {
                                                                return (
                                                                    <React.Fragment>
                                                                        <b>gnomAD AF</b>
                                                                        <Tooltip title={"gnomAD allele frequency < 0.05 indicates variant is rare in reference population databases"}>
                                                                            <InfoOutlinedIcon className={classes.infoIcon}/>
                                                                        </Tooltip> : {props.additionalInfo["c_1_2"]["af"]}
                                                                    </React.Fragment>
                                                                )
                                                            }
                                                        } else if(key === "c_2_3") {
                                                            return (
                                                                <React.Fragment>
                                                                    <b>CADD Score</b> 
                                                                    <Tooltip title={"CADD can quantitatively prioritize functional, deleterious, and disease causal variants across a wide range of functional categories, effect sizes and genetic architectures and can be used prioritize causal variation in both research and clinical settings. CADD score > 15 indicates variant is deleterious"}>
                                                                        <InfoOutlinedIcon className={classes.infoIcon}/>
                                                                    </Tooltip> : {props.additionalInfo["c_2_3"]["cadd_score"]}
                                                                </React.Fragment>
                                                            )
                                                        } else if(key === "c_3_1") {
                                                            return (
                                                                <React.Fragment>
                                                                    {props.additionalInfo["c_3_1"]}
                                                                </React.Fragment>
                                                            )
                                                        } else {
                                                            return (
                                                                <React.Fragment>
                                                                    -
                                                                </React.Fragment>
                                                            )
                                                        }
                                                    })()}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField fullWidth id={key + "_comments"} label="Comments" multiline rows={2} variant="outlined" value={props.comments[key]} onChange={(e) => handleCommentChange(key, e)}/>
                                                </TableCell>
                                            </TableRow>
                                        ))}                        
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Grid justify="center" container spacing={3}>
                        <Grid item xs={10}>
                            <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                <b>Functional Table</b>
                            </Typography>
                            <TableContainer>
                                <Table aria-label="simple table">
                                <colgroup>
                                        <col style={{width:'11%'}}/>
                                        <col style={{width:'25%'}}/>
                                        <col style={{width:'10%'}}/>
                                        <col style={{width:'24%'}}/>
                                        <col style={{width:'30%'}}/>
                                    </colgroup>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Initial {" "}
                                                <Tooltip title={"Value calculated based on external database and user's input"}>
                                                    <InfoOutlinedIcon className={classes.infoIcon}/>
                                                </Tooltip>
                                                <br></br>Value
                                            </TableCell>
                                            <TableCell>
                                                Evidence {" "}
                                                <Tooltip title={"Evidence level used in the scoring framework"}>
                                                    <InfoOutlinedIcon className={classes.infoIcon}/>
                                                </Tooltip>
                                                <br></br>Description
                                            </TableCell>
                                            <TableCell>
                                                Final {" "}
                                                <Tooltip title={"Final value to be used in the calculation of RVE score. This value is modifiable based on information the user may have."}>
                                                    <InfoOutlinedIcon className={classes.infoIcon}/>
                                                </Tooltip>
                                                <br></br>Result
                                            </TableCell>
                                            <TableCell>
                                                Additional {" "}
                                                <Tooltip title={"Additional information related to queries from external databases"}>
                                                    <InfoOutlinedIcon className={classes.infoIcon}/>
                                                </Tooltip>
                                                <br></br>Information
                                            </TableCell>
                                            <TableCell style={{ verticalAlign: 'top' }}>
                                                Comments {" "}
                                                <Tooltip title={"For the user to record any information they feel is relevant to the topic"}>
                                                    <InfoOutlinedIcon className={classes.infoIcon}/>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.keys(props.functionalEvidenceLabels).map((key, index) => (
                                            <TableRow key={key + '_row'}>
                                                <TableCell>
                                                    {props.initialScores[key]}
                                                </TableCell>
                                                <TableCell>
                                                    {ReactHtmlParser(props.functionalEvidenceLabels[key])}
                                                </TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth className={classes.formControl}>
                                                        <Select fullWidth id={key} value={props.modifiedScores[key] ? props.modifiedScores[key] : ""} onChange={(e) => handleChange(key, e)} variant="outlined">
                                                            <MenuItem value={"1"}>1</MenuItem>
                                                            <MenuItem value={"0"}>0</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>
                                                    {(function () {
                                                        if(key === "f_1_1") {
                                                            return (
                                                                <React.Fragment>
                                                                    <b>ReMap 2020 Peaks
                                                                    <Tooltip title={"ReMap is a database of transcriptional regulators peaks derived from curated ChIP-seq, ChIP-exo, DAP-seq experiments in Human. Intersection with one or more ReMap 2020 peaks indicates variant is implicated in TF binding"}>
                                                                        <InfoOutlinedIcon className={classes.infoIcon}/>
                                                                    </Tooltip> :</b> {props.additionalInfo["f_1_1"]["crms"]}
                                                                </React.Fragment>
                                                            )
                                                        } else if(key === "f_1_2") {
                                                            return (
                                                                <React.Fragment>
                                                                    <b>cCREs
                                                                    <Tooltip title={"Candidate cis-Regulatory Elements by ENCODE / SCREEN. Intersection with a cCRE in SCREEN indicates variant localizes to a regulatory region"}>
                                                                        <InfoOutlinedIcon className={classes.infoIcon}/>
                                                                    </Tooltip> :</b> {props.additionalInfo["f_1_2"]["ccre_descriptions"]}
                                                                </React.Fragment>
                                                            )
                                                        } else if(key === "f_1_3") {
                                                            if(props.additionalInfo["f_1_3"] !== "-") {
                                                                return (
                                                                    <React.Fragment>
                                                                        <b>Supporting Experiment
                                                                        <Tooltip title={"Information by ENCODE / SCREEN. cCRE and target genes linked based on Hi-C or CHIA-PET"}>
                                                                            <InfoOutlinedIcon className={classes.infoIcon}/>
                                                                        </Tooltip> :</b> {props.additionalInfo["f_1_3"]}
                                                                    </React.Fragment>
                                                                )
                                                            } else {
                                                                return (
                                                                    <React.Fragment>
                                                                        -
                                                                    </React.Fragment>
                                                                )
                                                            }
                                                        } else if(key === "f_1_4") {
                                                            if(props.additionalInfo["f_1_4"] !== "-") {
                                                                return (
                                                                    <React.Fragment>
                                                                        <b>Supporting Experiment
                                                                        <Tooltip title={"Information by ENCODE / SCREEN. cCRE and targete genes linked based on eQTL"}>
                                                                            <InfoOutlinedIcon className={classes.infoIcon}/>
                                                                        </Tooltip> :</b> {props.additionalInfo["f_1_4"]}
                                                                    </React.Fragment>
                                                                )
                                                            } else {
                                                                return (
                                                                    <React.Fragment>
                                                                        -
                                                                    </React.Fragment>
                                                                )
                                                            }
                                                        } else {
                                                            return (
                                                                <React.Fragment>
                                                                    -
                                                                </React.Fragment>
                                                            )
                                                        }
                                                    })()}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField fullWidth id={key + "_comments"} label="Comments" multiline rows={2} variant="outlined" value={props.comments[key]} onChange={(e) => handleCommentChange(key, e)}/>
                                                </TableCell>
                                            </TableRow>
                                        ))}                        
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            </form>  

            <div style={{display:'flex', justifyContent:'flex-end', alignItems:'flex-end'}}>
                <Typography variant="caption">
                    Note: Once you click Submit, you will obtain the final score as well as a document outlining the details you just provided
                </Typography>
            </div>
            <div style={{display:'flex', justifyContent:'flex-end', alignItems:'flex-end'}}>
                <Button onClick={handleBack} className={classes.backButton}>
                    Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    Submit
                </Button>
            </div>
        </React.Fragment>
    )
}