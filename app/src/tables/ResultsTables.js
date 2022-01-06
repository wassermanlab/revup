import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    FormLabel,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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
            height: "100%",
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
        marginLeft: "auto",
    },
    infoIcon: {
        fontSize: 15,
        color: "#BCBCBC",
    },
}))



export function GeneralInfoTable(props) {
    const classes = useStyles();
    return(
        <Grid item xs={12}>
            <Grid justify="center" container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" align="left" color="secondary" gutterBottom>
                        <b>General Information</b>
                    </Typography>
                </Grid> 
            </Grid>
            {(function () {
                if(props.variantInfo["variant_id"]) {
                    return (
                        <React.Fragment>
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={4}>
                                    <FormLabel>
                                        Variant ID:
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={8}>
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
                                <Grid item xs={4}>
                                    <FormLabel>
                                        Patient ID:
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={8}>
                                    <FormLabel>{props.variantInfo["patient_id"]}</FormLabel>
                                </Grid>
                            </Grid>
                        </React.Fragment>)}
            })()}
            <Grid justify="center" container spacing={3}>
                <Grid item xs={4}>
                    <FormLabel>hg19 position: </FormLabel>
                </Grid>
                <Grid item xs={8}>
                    <FormLabel>{props.assemblies["hg19"]}</FormLabel>
                </Grid>
            </Grid>
            <Grid justify="center" container spacing={3}>
                <Grid item xs={4}>
                    <FormLabel>hg38 position: </FormLabel>
                </Grid>
                <Grid item xs={8}>
                    <FormLabel>{props.assemblies["hg38"]}</FormLabel>
                </Grid>
            </Grid>
            <Grid justify="center" container spacing={3}>
                <Grid item xs={4}>
                    <FormLabel>Reference Assembly:</FormLabel>
                </Grid> 
                <Grid item xs={8}>
                    <FormLabel>{props.variantInfo["ref_genome"]}</FormLabel>
                </Grid> 
            </Grid>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={4}>
                    <FormLabel>Patient's Genotype:</FormLabel>
                </Grid>
                <Grid item xs={8}>
                    <FormLabel>{props.variantInfo["genotype"]}</FormLabel>
                </Grid>
            </Grid>
            {(function () {
                if(props.variantInfo["phenotype"]) {
                    return (
                        <React.Fragment>
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={4}>
                                    <FormLabel>
                                        Patient's Phenotype:
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={8}>
                                    <FormLabel>{props.variantInfo["phenotype"]}</FormLabel>
                                </Grid>
                            </Grid>
                        </React.Fragment>)}
            })()}
            <Grid container justify="center" spacing={3}>
                <Grid item xs={4}>
                    <FormLabel>Identification Method:</FormLabel>
                </Grid>
                <Grid item xs={8}>
                    <FormLabel>{props.variantInfo["identification_method"]}</FormLabel>
                </Grid>
            </Grid>
            <Grid justify="center" container spacing={3}>
                <Grid item xs={4}>
                    <FormLabel>Target Gene:</FormLabel>
                </Grid> 
                <Grid item xs={8}>
                    <FormLabel><i>{props.variantInfo["target_gene"]}</i></FormLabel>
                </Grid> 
            </Grid>
        </Grid>
    )
}

export function ClinicalTable(props){
    const classes = useStyles();
    return(
        <TableContainer>
            <Table aria-label="simple table">
                <colgroup>
                    <col style={{width:'45%'}}/>
                    <col style={{width:'11%'}}/>
                    <col style={{width:'44%'}}/>
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ verticalAlign: 'top'}}>
                            Evidence Description {" "}
                            <Tooltip title={"Evidence level used in the scoring framework"}>
                                <InfoOutlinedIcon className={classes.infoIcon}/>
                            </Tooltip>
                        </TableCell>
                        <TableCell style={{ verticalAlign: 'top'}}>
                            Score {" "}
                            <Tooltip title={"Final value after external queries and modifications made by the user"}>
                                <InfoOutlinedIcon className={classes.infoIcon}/>
                            </Tooltip>
                        </TableCell>
                        <TableCell style={{ verticalAlign: 'top'}}>
                            Additional Information/Comments {" "}
                            <Tooltip title={"Additional information related to queries from external databases and user recorded comments relevant to the topic"}>
                                <InfoOutlinedIcon className={classes.infoIcon}/>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(props.clinicalEvidenceLabels).map((key, index) => (
                        <TableRow key={key + '_row'}>
                            <TableCell>
                                {ReactHtmlParser(props.clinicalEvidenceLabels[key])}
                            </TableCell>
                            <TableCell>
                                {props.modifiedScores[key]}
                            </TableCell>
                            <TableCell>
                                {(function () {
                                    if(key === "c_1_1") {
                                        return (
                                            <React.Fragment>
                                                {ReactHtmlParser(props.comments["c_1_1"] ? props.comments["c_1_1"]+"<br><\br>": "")}
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
                                                    {ReactHtmlParser(props.comments["c_1_2"] ? props.comments["c_1_2"]+"<br><\br>": "")}
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
                                                    {ReactHtmlParser(props.comments["c_1_2"] ? props.comments["c_1_2"]+"<br><\br>": "")}
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
                                                {ReactHtmlParser(props.comments["c_2_3"] ? props.comments["c_2_3"]+"<br><\br>": "")}
                                                <b>CADD Score</b> 
                                                <Tooltip title={"CADD can quantitatively prioritize functional, deleterious, and disease causal variants across a wide range of functional categories, effect sizes and genetic architectures and can be used prioritize causal variation in both research and clinical settings. CADD score > 15 indicates variant is deleterious"}>
                                                    <InfoOutlinedIcon className={classes.infoIcon}/>
                                                </Tooltip> : {props.additionalInfo["c_2_3"]["cadd_score"]}
                                            </React.Fragment>
                                        )
                                    } else if(key === "c_3_1") {
                                        return (
                                            <React.Fragment>
                                                {ReactHtmlParser(props.comments["c_3_1"] ? props.comments["c_3_1"]+"<br><\br>": "")}
                                                {props.additionalInfo["c_3_1"]}
                                            </React.Fragment>
                                        )
                                    } else {
                                        return (
                                            <React.Fragment>
                                                {props.comments[key] ? props.comments[key]: "-"}
                                            </React.Fragment>
                                        )
                                    }
                                })()}
                            </TableCell>
                        </TableRow>
                    ))}                        
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export function FunctionalTable(props){
    const classes = useStyles();
    return(
        <TableContainer>
            <Table aria-label="simple table">
                <colgroup>
                    <col style={{width:'45%'}}/>
                    <col style={{width:'11%'}}/>
                    <col style={{width:'44%'}}/>
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ verticalAlign: 'top'}}>
                            Evidence Description {" "}
                            <Tooltip title={"Evidence level used in the scoring framework"}>
                                <InfoOutlinedIcon className={classes.infoIcon}/>
                            </Tooltip>
                        </TableCell>
                        <TableCell style={{ verticalAlign: 'top'}}>
                            Score {" "}
                            <Tooltip title={"Final value after external queries and modifications made by the user"}>
                                <InfoOutlinedIcon className={classes.infoIcon}/>
                            </Tooltip>
                        </TableCell>
                        <TableCell style={{ verticalAlign: 'top'}}>
                            Additional Information/Comments {" "}
                            <Tooltip title={"Additional information related to queries from external databases and user recorded comments relevant to the topic"}>
                                <InfoOutlinedIcon className={classes.infoIcon}/>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(props.functionalEvidenceLabels).map((key, index) => (
                        <TableRow key={key + '_row'}>
                            <TableCell>
                                {ReactHtmlParser(props.functionalEvidenceLabels[key])}
                            </TableCell>
                            <TableCell>
                                {props.modifiedScores[key]}
                            </TableCell>
                            <TableCell>
                                {(function () {
                                    if(key === "f_1_1") {
                                        return (
                                            <React.Fragment>
                                                {ReactHtmlParser(props.comments["f_1_1"] ? props.comments["f_1_1"]+"<br><\br>": "")}
                                                <b>ReMap 2020 Peaks
                                                <Tooltip title={"ReMap is a database of transcriptional regulators peaks derived from curated ChIP-seq, ChIP-exo, DAP-seq experiments in Human. Intersection with one or more ReMap 2020 peaks indicates variant is implicated in TF binding"}>
                                                    <InfoOutlinedIcon className={classes.infoIcon}/>
                                                </Tooltip> :</b> {props.additionalInfo["f_1_1"]["crms"]}
                                            </React.Fragment>
                                        )
                                    } else if(key === "f_1_2") {
                                        return (
                                            <React.Fragment>
                                                {ReactHtmlParser(props.comments["f_1_2"] ? props.comments["f_1_2"]+"<br><\br>": "")}
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
                                                    {ReactHtmlParser(props.comments["f_1_3"] ? props.comments["f_1_3"]+"<br><\br>": "")}
                                                    <b>Supporting Experiment
                                                    <Tooltip title={"Information by ENCODE / SCREEN. cCRE and target genes linked based on Hi-C or CHIA-PET"}>
                                                        <InfoOutlinedIcon className={classes.infoIcon}/>
                                                    </Tooltip> :</b> {props.additionalInfo["f_1_3"]}
                                                </React.Fragment>
                                            )
                                        } else {
                                            return (
                                                <React.Fragment>
                                                    {props.comments["f_1_3"] ? props.comments["f_1_3"]: "-"}
                                                </React.Fragment>
                                            )
                                        }
                                    } else if(key === "f_1_4") {
                                        if(props.additionalInfo["f_1_4"] !== "-") {
                                            return (
                                                <React.Fragment>
                                                    {ReactHtmlParser(props.comments["f_1_4"] ? props.comments["f_1_4"]+"<br><\br>": "")}
                                                    <b>Supporting Experiment
                                                    <Tooltip title={"Information by ENCODE / SCREEN. cCRE and targete genes linked based on eQTL"}>
                                                        <InfoOutlinedIcon className={classes.infoIcon}/>
                                                    </Tooltip> :</b> {props.additionalInfo["f_1_4"]}
                                                </React.Fragment>
                                            )
                                        } else {
                                            return (
                                                <React.Fragment>
                                                    {props.comments["f_1_4"] ? props.comments["f_1_4"]: "-"}
                                                </React.Fragment>
                                            )
                                        }
                                    } else {
                                        return (
                                            <React.Fragment>
                                                {props.comments[key] ? props.comments[key]: ""}
                                            </React.Fragment>
                                        )
                                    }
                                })()}
                            </TableCell>
                        </TableRow>
                    ))}                        
                </TableBody>
            </Table>
        </TableContainer>
    )
}