import React, { useRef, useState } from 'react';
import {Line, Doughnut} from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Button,
    Divider,
    FormLabel,
    Grid,
    Link,
    Menu,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography, 
} from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GetAppIcon from '@material-ui/icons/GetApp';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ReactHtmlParser from 'react-html-parser'; 

import {
    getLineData,
    getLineOptions,
    getDoughnutData,
    getDoughnutOptions
} from './ResultsCharts'
import ResultsPDF from './ResultsPDF'
import {
    GeneralInfoTablePDF,
    ClinicalResultsTablePDF,
    FunctionalResultsTablePDF,
    CalculationsTablePDF
} from './ResultsTablesPDF'
import {
    ClinicalResultsTableCSV,
    FunctionalResultsTableCSV,
} from './ResultsTablesCSV'
import {
    CITATION
} from '../constants'
import rve_scores from '../images/rve_scores.png'
    
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


export default function Results(props) {
    const classes = useStyles();
    const lineChartRef = useRef(null);
    const clinicalChartRef = useRef(null);
    const functionalChartRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const getDateTime = () => {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return [date, time]
    }
    const copy = (event) => {
        navigator.clipboard.writeText(CITATION).catch((error) => { alert(`Copy failed! ${error}`) });
    }
    function getCalcValues (scoreType, resultsInfo) {
        var calcString = ""
        const regexpScore = /[c,f]_(\d+)_(\d+)/;
        var match = "";

        if (scoreType === "clinical") {
            for (let key in resultsInfo) {
                // do something for each key in the object 
                if (resultsInfo[key] === '1' && key.startsWith("c")) {
                    match = key.match(regexpScore);
                    if (calcString === "") {
                        calcString = calcString + " " + "C" + match[1] + "." + match[2]
                    } else {
                        calcString = calcString + ", " + "C" + match[1] + "." + match[2]
                    }
                    
                }
            }
        } else if (scoreType === "functional") {
            for (let key in resultsInfo) {
                // do something for each key in the object 
                if (resultsInfo[key] === '1' && key.startsWith("f")) {
                    match = key.match(regexpScore);
                    if (calcString === "") {
                        calcString = calcString + " " + "F" + match[1] + "." + match[2]
                    } else {
                        calcString = calcString + ", " + "F" + match[1] + "." + match[2]
                    }
                }
            }
        }
        return calcString
    }

    //const downloadPDF = () => {
    async function downloadPDF () {
        // Genereate Charts/Images
        const lineChart = lineChartRef.current.chartInstance.toBase64Image();
        const clinicalChart = clinicalChartRef.current.chartInstance.toBase64Image();
        const functionalChart = functionalChartRef.current.chartInstance.toBase64Image();
        const dateTime = getDateTime();

        // Get values for calculations
        const posEvidenceLevels = {
            "clinical": getCalcValues('clinical', props.modifiedScores),
            "functional": getCalcValues('functional', props.modifiedScores)
        }

        // Create the PDF
        const doc = <ResultsPDF 
                        finalResults={props.finalResults}
                        additionalInfo={props.additionalInfo}
                        modifiedScores={props.modifiedScores}
                        variantInfo={props.variantInfo}
                        comments={props.comments}
                        assemblies={props.assemblies}
                        lineChart={lineChart}
                        clinicalChart={clinicalChart}
                        functionalChart={functionalChart}
                        posEvidenceLevels={posEvidenceLevels}
                        downloadTime={dateTime[0] + " " + dateTime[1]}
                    />;
        const asPdf = pdf();
        asPdf.updateContainer(doc);
        const blob = await asPdf.toBlob();
        //const blob = generatePDF(doc);
        const filename = 'revup_' + dateTime[0] + "_" + dateTime[1] + '.pdf';
        saveAs(blob, filename);

        // Close the menu icon
        handleClose();
    };

    //const downloadZip = () => {
    async function downloadZip () {
        // Generate Chart Images
        const lineChart = lineChartRef.current.chartInstance.toBase64Image().split(',')[1];
        const clinicalChart = clinicalChartRef.current.chartInstance.toBase64Image().split(',')[1];
        const functionalChart = functionalChartRef.current.chartInstance.toBase64Image().split(',')[1];
        const dateTime = getDateTime();

        // Get values for calculations
        const posEvidenceLevels = {
            "clinical": getCalcValues('clinical', props.modifiedScores),
            "functional": getCalcValues('functional', props.modifiedScores)
        }

        // Generate Table PDFs
        const generalDoc = <GeneralInfoTablePDF
                                variantInfo={props.variantInfo}
                                finalResults={props.finalResults}
                                assemblies={props.assemblies}
                                downloadTime={dateTime[0] + " " + dateTime[1]}
                            />;
        const clinicalDoc = <ClinicalResultsTablePDF 
                                additionalInfo={props.additionalInfo}
                                modifiedScores={props.modifiedScores}
                                variantInfo={props.variantInfo}
                                comments={props.comments}
                                downloadTime={dateTime[0] + " " + dateTime[1]}
                            />;             
        const functionalDoc = <FunctionalResultsTablePDF 
                                additionalInfo={props.additionalInfo}
                                modifiedScores={props.modifiedScores}
                                variantInfo={props.variantInfo}
                                comments={props.comments}
                                downloadTime={dateTime[0] + " " + dateTime[1]}
                            />;
        const calculationsDoc = <CalculationsTablePDF
                                    finalResults={props.finalResults}
                                    modifiedScores={props.modifiedScores}
                                    variantInfo={props.variantInfo}
                                    posEvidenceLevels={posEvidenceLevels}
                                    downloadTime={dateTime[0] + " " + dateTime[1]}
                            />;
        const asPdfGeneral = pdf();
        asPdfGeneral.updateContainer(generalDoc);
        const blobGeneral = await asPdfGeneral.toBlob();
        
        const asPdfClinical = pdf();
        asPdfClinical.updateContainer(clinicalDoc);
        const blobClinical = await asPdfClinical.toBlob();
        
        const asPdfFunctional = pdf();
        asPdfFunctional.updateContainer(functionalDoc);
        const blobFunctional = await asPdfFunctional.toBlob();

        const asPdfCalculations = pdf();
        asPdfCalculations.updateContainer(calculationsDoc);
        const blobCalculations = await asPdfCalculations.toBlob();

        // Create CSV
        const data = {
            "clinicalEvidenceLabels": props.clinicalEvidenceLabels,
            "functionalEvidenceLabels": props.functionalEvidenceLabels,
            "modifiedScores": props.modifiedScores,
            "comments": props.comments,
            "additionalInfo": props.additionalInfo,
            "variantInfo": props.variantInfo
        }
        const clinicalCsvContent = ClinicalResultsTableCSV(data);
        const functionalCsvContent = FunctionalResultsTableCSV(data);

        // Create and Download zip
        const zip = require('jszip')();

        // Add line chart
        zip.file('revup_linechart.png', lineChart, {base64: true});

        // Add gauge charts
        zip.file('revup_clinical_score.png', clinicalChart, {base64: true});
        zip.file('revup_functional_score.png', functionalChart, {base64: true});

        // Add General Info Table PDF
        zip.file('revup_general_info_table.pdf', blobGeneral, {blob: true});
        
        // Add Clinical Table PDF
        zip.file('revup_clinical_table.pdf', blobClinical, {blob: true});

        // Add Functional Table PDF
        zip.file('revup_functional_table.pdf', blobFunctional, {blob: true});

        // Add Calculations Table PDF
        zip.file('revup_calculations.pdf', blobCalculations, {blob: true});

        // Add Clinical CSV
        zip.file('revup_clinical_table.csv', clinicalCsvContent);

        // Add Functional CSV
        zip.file('revup_functional_table.csv', functionalCsvContent);

        const filename = 'revup_' + dateTime[0] + "_" + dateTime[1] + '.zip';
        zip.generateAsync({type: "blob"}).then(content => {
          saveAs(content, filename);
        });
        handleClose();
      }

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Grid className={classes.grid} container direction="row" justify="center" alignItems="center" alignContent="flex-end" spacing={3}>
                    <Grid justify="flex-end" container spacing={3}>
                        <Grid item sx={10}>
                            <Button startIcon={<GetAppIcon />} onClick={handleClick}>
                                Download
                            </Button>
                            <Menu
                                id="download"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={downloadPDF}>as PDF</MenuItem>
                                <MenuItem onClick={downloadZip}>as zip</MenuItem>
                            </Menu>
                        </Grid>    
                    </Grid>
                    <Paper className={classes.paper}>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={7}>
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
                                {/* 
                                <Grid justify="center" container spacing={3}>
                                    <Grid item xs={3}>
                                        <FormLabel>Variant Description:</FormLabel>
                                    </Grid> 
                                    <Grid item xs={7}>
                                        <FormLabel>{props.variantInfo["variant_description"]}</FormLabel>
                                    </Grid> 
                                </Grid>
                                */}
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

                            <Grid item xs={3}>
                                <Grid justify="center" container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                            <b>External Links</b>
                                        </Typography>
                                    </Grid>
                                </Grid> 
                                {(function () {
                                    if(!props.externalLinks["dbsnp"] && !props.externalLinks["gnomad"] && !props.externalLinks["ucsc"]) {
                                        return (
                                            <React.Fragment>
                                                <Grid container justify="center" spacing={3}>
                                                    <Grid item xs={12}>
                                                        <FormLabel>
                                                            No external links associated with this variant
                                                        </FormLabel>
                                                    </Grid>
                                                </Grid>
                                            </React.Fragment>)}
                                })()}
                                {(function () {
                                    if(props.externalLinks["dbsnp"]) {
                                        return (
                                            <React.Fragment>
                                                <Grid container justify="center" spacing={3}>
                                                    <Grid item xs={12}>
                                                        <Link href={props.externalLinks["dbsnp"]} target="_blank" color="primary" underline="none">
                                                            dbSNP ({props.externalLinks["rsid"]})
                                                        </Link>
                                                    </Grid>
                                                </Grid>
                                            </React.Fragment>)}
                                })()}
                                {(function () {
                                    if(props.externalLinks["gnomad"]) {
                                        return (
                                            <React.Fragment>
                                                <Grid container justify="center" spacing={3}>
                                                    <Grid item xs={12}>
                                                        <Link href={props.externalLinks["gnomad"]} target="_blank" color="primary" underline="none">
                                                            gnomAD
                                                        </Link>
                                                    </Grid>
                                                </Grid>
                                            </React.Fragment>)}
                                })()}
                                {(function () {
                                    if(props.externalLinks["clinvar"]) {
                                        return (
                                            <React.Fragment>
                                                <Grid container justify="center" spacing={3}>
                                                    <Grid item xs={12}>
                                                        <Link href={props.externalLinks["clinvar"]} target="_blank" color="primary" underline="none">
                                                            ClinVar ({props.externalLinks["clinvar_variation"]})
                                                        </Link>
                                                    </Grid>
                                                </Grid>
                                            </React.Fragment>)}
                                })()}
                            </Grid>
                        </Grid>

                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={10}>
                                <Divider />
                            </Grid>
                        </Grid>

                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={10}>
                                <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                    <b>Scores</b>
                                </Typography>
                            </Grid> 
                        </Grid>
                        <Grid justify="center" alignItems="center" container spacing={3}>
                            <Grid item xs={7}>
                                <Typography align="center" variant="h6" color="textSecondary" style={{fontSize: '40px', fontWeight: 'lighter'}}>RVE-Score = {props.finalResults["rve"]}</Typography>
                            </Grid>
                        </Grid>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={6}>
                                <Grid justify="center" container spacing={3}>
                                    <Grid item xs={12}>
                                        <Line
                                            id="linechart"
                                            data={getLineData(props.finalResults)}
                                            options={getLineOptions(props.finalResults)}
                                            height={400}
                                            ref={lineChartRef}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid justify="center" container spacing={3}>
                                    <Grid item xs={12}>
                                        <Doughnut 
                                            data={getDoughnutData(props.finalResults["clinical"], 'clinical')} 
                                            options={getDoughnutOptions(props.finalResults["clinical"], 'clinical')}
                                            height={200}
                                            ref={clinicalChartRef}
                                        />
                                    </Grid>
                                </Grid>
                                <br></br>
                                <Grid justify="center" container spacing={3}>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                </Grid>
                                <Grid justify="center" container spacing={3}>
                                    <Grid item xs={12}>
                                        <Doughnut 
                                            data={getDoughnutData(props.finalResults["functional"], 'functional')} 
                                            options={getDoughnutOptions(props.finalResults["functional"], 'functional')}
                                            height={200}
                                            ref={functionalChartRef}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/*
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={8}>
                                <Grid justify="center" container spacing={3}>
                                    <Grid item xs={12}>
                                        <Line
                                            id="linechart"
                                            data={getLineData(props.finalResults)}
                                            options={getLineOptions(props.finalResults)}
                                            height={400}
                                            ref={lineChartRef}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={5}>
                                <Doughnut 
                                    data={getDoughnutData(props.finalResults["clinical"], 'clinical')} 
                                    options={getDoughnutOptions(props.finalResults["clinical"], 'clinical')}
                                    height={200}
                                    ref={clinicalChartRef}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Doughnut 
                                    data={getDoughnutData(props.finalResults["functional"], 'functional')} 
                                    options={getDoughnutOptions(props.finalResults["functional"], 'functional')}
                                    height={200}
                                    ref={functionalChartRef}
                                />
                            </Grid>
                        </Grid>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center" color="primary" gutterBottom>
                                    RVE Score = {props.finalResults["rve"]}
                                </Typography>
                            </Grid>
                        </Grid>
                        */}


                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={10}>
                                <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                    <b>Clinical Table</b>
                                </Typography>
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
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={10}>
                                <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                    <b>Functional Table</b>
                                </Typography>
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
                            </Grid>
                        </Grid>

                        <br></br>

                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={10}>
                                <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                    <b>Calculations</b>
                                </Typography>
                            </Grid> 
                        </Grid>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={7}>
                                <TableContainer>
                                    <Table aria-label="simple table">
                                        <colgroup>
                                            <col style={{width:'20%'}}/>
                                            <col style={{width:'10%'}}/>
                                            <col style={{width:'40%'}}/>
                                        </colgroup>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" style={{ verticalAlign: 'top'}}>
                                                </TableCell>
                                                <TableCell align="center" style={{ verticalAlign: 'top'}}>
                                                    Value
                                                </TableCell>
                                                <TableCell align="center" style={{ verticalAlign: 'top'}}>
                                                    Applicable Evidence Levels
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow key='clinical_row'>
                                                <TableCell>
                                                    Clinical Score
                                                </TableCell>
                                                <TableCell align="center">
                                                    {props.finalResults["clinical"]}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {getCalcValues('clinical', props.modifiedScores)}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key='functional_row'>
                                                <TableCell>
                                                    Functional Score
                                                </TableCell>
                                                <TableCell align="center">
                                                    {props.finalResults["functional"]}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {getCalcValues('functional', props.modifiedScores)}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                        <Grid justify="center" container alignItems="center" alignContent="center" spacing={3}>
                            <Grid item xs={12}>
                                <img src={rve_scores}
                                    style={{
                                        padding: '30px',
                                        display: 'block',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                    }}
                                    width="60%" alt="RVEScore" />
                            </Grid>
                        </Grid>

                        <br></br>

                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={9}>
                                <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                    <b>Citing RevUP</b>
                                </Typography>
                            </Grid> 
                            <Grid item xs={1}>
                                <IconButton aria-label="copy" onClick={copy}>
                                    <Tooltip title={"Copy to Clipboard"}>
                                        <FileCopyIcon fontSize="small" />
                                    </Tooltip>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid justify="center" container spacing={3}>
                            <Grid item xs={10}>
                                <FormLabel>
                                    {CITATION}
                                </FormLabel>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </div>

            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Link href="/scoring" color="secondary" underline="none">
                    <Button variant="contained" color="secondary" size="large" startIcon={<ReplayIcon />}>
                        Score another variant
                    </Button>
                </Link>
            </div>
        </React.Fragment>
    )
}