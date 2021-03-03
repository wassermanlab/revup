import React from 'react';
import {Line} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import GaugeChart from 'react-gauge-chart'
import { makeStyles } from '@material-ui/core/styles';
import { 
    Container,
    Divider,
    FormLabel,
    Grid,
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
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {
    MAX_FUNCTIONAL_SCORE,
    MAX_CLINICAL_SCORE,
} from '../constants'

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
    const functionalPercentage = parseFloat(props.finalResults["functional"])/MAX_FUNCTIONAL_SCORE;
    const clinicalPercentage = parseFloat(props.finalResults["clinical"])/MAX_CLINICAL_SCORE;
    const classes = useStyles();

    const data = {
        labels: props.finalResults["standard_rve"]["x"],
        datasets: [
          {
            label: 'Known Rare Disease Regulatory Variants',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.finalResults["standard_rve"]["y"]
          }
        ],
    };

    const options = {
        annotation: {
            annotations: [
              {
                //drawTime: "afterDatasetsDraw",
                type: "line",
                mode: "vertical",
                scaleID: "x-axis-0",
                value: props.finalResults["standard_rve"]["nearest_val"],
                borderWidth: 3,
                borderColor: "red",
                label: {
                  content: "RVE Score = ".concat(props.finalResults["rve"]),
                  enabled: true,
                  position: "top"
                }
              }
            ]
          },
        scales: {
            xAxes: [{
                ticks: {
                    callback: function(value, index, values) {
                        return parseFloat(value).toFixed(2);
                    },
                    //suggestedMin: -20,
                    //autoSkip: true,
                    //maxTicksLimit: 12,
                    //stepSize: 20
                    
                    //min: -20,
                    //max: 100,
                    //stepSize: 20,
                    //autoSkip: true,
                    maxTicksLimit: 12,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'RVE Scores'
                  }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Density'
                  }
            }]
        },
        layout: {
            padding: {
                top: 5,
                left: 15,
                right: 15,
                bottom: 15
            }
        },
        legend: {
            display: false
         },
        maintainAspectRatio: false,
        //aspectRatio: 4
    }

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Container maxWidth="lg" className={classes.greyBackground}>
                    <Grid className={classes.grid} container direction="row" justify="center" alignItems="center" alignContent="flex-end" spacing={3}>
                        <Paper className={classes.paper}>
                            <Grid justify="center" container spacing={3}>
                                <Grid item xs={10}>
                                    <Typography variant="h5" align="left" gutterBottom>
                                        General Info
                                    </Typography>
                                </Grid> 
                            </Grid>
                            <Grid justify="center" container spacing={3}>
                                <Grid item xs={3}>
                                    <FormLabel>Patient ID:</FormLabel>
                                </Grid> 
                                <Grid item xs={7}>
                                    <FormLabel>{props.variantInfo["patient_id"]}</FormLabel>
                                </Grid> 
                            </Grid>
                            <Grid justify="center" container spacing={3}>
                                <Grid item xs={3}>
                                    <FormLabel>Variant ID:</FormLabel>
                                </Grid> 
                                <Grid item xs={7}>
                                    <FormLabel>{props.variantInfo["variant_id"]}</FormLabel>
                                </Grid> 
                            </Grid>
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
                            <Grid justify="center" container spacing={3}>
                                <Grid item xs={3}>
                                    <FormLabel>Reference Assembly:</FormLabel>
                                </Grid> 
                                <Grid item xs={7}>
                                    <FormLabel>{props.variantInfo["ref_genome"]}</FormLabel>
                                </Grid> 
                            </Grid>
                            <Grid justify="center" container spacing={3}>
                                <Grid item xs={3}>
                                    <FormLabel>Target Gene:</FormLabel>
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
                                    <Typography variant="h5" align="left" gutterBottom>
                                        Scores
                                    </Typography>
                                </Grid> 
                            </Grid>
                            <Grid justify="center" container spacing={3}>
                                <Grid item xs={7}>
                                    <Grid justify="center" container spacing={3}>
                                        <Grid item xs={12}>
                                            <Line
                                                data={data}
                                                options={options}
                                                height={400}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid justify="center" container spacing={3}>
                                        <Typography variant="h6">Clinical Score:</Typography>
                                    </Grid>
                                    <Grid justify="center" container spacing={3}>
                                        <Grid item xs={12}>
                                            <FormLabel>Is there a causal link between genotype and phenotype?</FormLabel>
                                        </Grid>
                                    </Grid>
                                    <Grid justify="center" container spacing={3}>
                                        <Grid item xs={12}>
                                            <GaugeChart id="clinical-chart" 
                                                nrOfLevels={3} 
                                                colors={["#FFC371", "#FF5F6D"]} 
                                                arcWidth={0.3} 
                                                percent={clinicalPercentage} 
                                                formatTextValue={() => props.finalResults["clinical"]}
                                                textColor={"#464A4F"}
                                                needleColor={"#D1D5D5"}
                                                needleBaseColor={"#D1D5D5"}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid justify="center" container spacing={3}>
                                        <FormLabel>{clinicalPercentage > 0.5 ? "Likely": "Unlikely"}</FormLabel>
                                    </Grid>
                                    <br></br>
                                    <Grid justify="center" container spacing={3}>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                    </Grid>
                                    <Grid justify="center" container spacing={3}>
                                        <Typography variant="h6">Functional Score:</Typography>
                                    </Grid>
                                    <Grid justify="center" container spacing={3}>
                                        <Grid item xs={12}>
                                            <FormLabel>Does the variant have a damaging effect on the gene?</FormLabel>
                                        </Grid>
                                    </Grid>
                                    <Grid justify="center" container spacing={3}>
                                        <Grid item xs={12}>
                                            <GaugeChart id="functional-chart" 
                                                nrOfLevels={3} 
                                                colors={["#FFC371", "#FF5F6D"]} 
                                                arcWidth={0.3} 
                                                percent={functionalPercentage} 
                                                formatTextValue={() => props.finalResults["functional"]}
                                                textColor={"#464A4F"}
                                                needleColor={"#D1D5D5"}
                                                needleBaseColor={"#D1D5D5"}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid justify="center" container spacing={3}>
                                        <FormLabel>{functionalPercentage > 0.5 ? "Likely": "Unlikely"}</FormLabel>
                                    </Grid>
                                </Grid>
                            </Grid>
                            

                            <Grid justify="center" container spacing={3}>
                                <Grid item xs={10}>
                                    <Typography variant="h5">Clinical Results</Typography>
                                    <TableContainer>
                                        <Table aria-label="simple table">
                                            <colgroup>
                                                <col style={{width:'45%'}}/>
                                                <col style={{width:'10%'}}/>
                                                <col style={{width:'45%'}}/>
                                            </colgroup>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Evidence Description</TableCell>
                                                    <TableCell>Score</TableCell>
                                                    <TableCell>Additional Information/Comments</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow key={"c_1_1_row"}>
                                                    <TableCell>
                                                        C1.1 - {props.variantInfo["variant_pos"]} is evolutionarily conserved
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["c_1_1"] ? props.modifiedScores["c_1_1"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["c_1_1"] ? props.comments["c_1_1"]: ""}
                                                        <br></br>
                                                        <b>phyloP Score:</b> {props.additionalInfo["c_1_1"]["phylop"]}
                                                        <br></br>
                                                        <b>phastCons Score:</b> {props.additionalInfo["c_1_1"]["phastcons"]}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"c_1_2_row"}>
                                                    <TableCell>
                                                        C1.2 - {props.variantInfo["variant_name"]} is rare in unaffected individuals in specific sets of controls or reference population databases
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["c_1_2"] ? props.modifiedScores["c_1_2"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["c_1_2"] ? props.comments["c_1_2"]: ""}
                                                        <br></br>
                                                        <b>gnomAD AF
                                                        <Tooltip title={"gnomAD Allele Frequency"}>
                                                            <InfoOutlinedIcon fontSize="small"/>
                                                        </Tooltip> :</b> {props.additionalInfo["c_1_2"]["af"]}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"c_1_3_row"}>
                                                    <TableCell>
                                                        C1.3 - {props.variantInfo["variant_name"]} or locus previously statistically associated with the same or a similar disease phenotype
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["c_1_3"] ? props.modifiedScores["c_1_3"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["c_1_3"] ? props.comments["c_1_3"]: "-"}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"c_2_1_row"}>
                                                    <TableCell>
                                                        C2.1 - <i>{props.variantInfo["target_gene"]}</i> has been implicated in the same or a similar disease phenotype, or is otherwise relevant
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["c_2_1"] ? props.modifiedScores["c_2_1"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["c_2_1"] ? props.comments["c_2_1"]: "-"}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"c_2_2_row"}>
                                                    <TableCell>
                                                        C2.2 - <i>{props.variantInfo["target_gene"]}</i> does not contain coding variants in the same individual
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["c_2_2"] ? props.modifiedScores["c_2_2"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["c_2_2"] ? props.comments["c_2_2"]: "-"}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"c_2_3_row"}>
                                                    <TableCell>
                                                        C2.3 - {props.variantInfo["variant_name"]} is considered deleterious by computational prediction methods
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["c_2_3"] ? props.modifiedScores["c_2_3"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["c_2_3"] ? props.comments["c_2_3"]: ""}
                                                        <br></br>
                                                        <b>CADD Score:</b> {props.additionalInfo["c_2_3"]["cadd_score"]}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"c_2_4_row"}>
                                                    <TableCell>
                                                        C2.4 - {props.variantInfo["variant_name"]} is similar to another regulatory variant associated to <i>{props.variantInfo["target_gene"]}</i> and implicated in the same or a similar disease phenotype
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["c_2_4"] ? props.modifiedScores["c_2_4"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["c_2_4"] ? props.comments["c_2_4"]: "-"}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"c_2_5_row"}>
                                                    <TableCell>
                                                        C2.5 - {props.variantInfo["variant_name"]} is a striking noncoding event
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["c_2_5"] ? props.modifiedScores["c_2_5"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["c_2_5"] ? props.comments["c_2_5"]: "-"}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"c_3_1_row"}>
                                                    <TableCell>
                                                        C3.1 - {props.variantInfo["variant_name"]} shows familial segregation with the disease
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["c_3_1"] ? props.modifiedScores["c_3_1"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["c_3_1"] ? props.comments["c_3_1"] + "\n": ""}
                                                        <br></br>
                                                        {props.additionalInfo["c_3_1"]}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"c_4_1_row"}>
                                                    <TableCell>
                                                        C4.1 - {props.variantInfo["variant_name"]} observed in multiple, unrelated families with the same disease phenotype
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["c_4_1"] ? props.modifiedScores["c_4_1"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["c_4_1"] ? props.comments["c_4_1"]: "-"}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"c_4_2_row"}>
                                                    <TableCell>
                                                        C4.2 - {props.variantInfo["variant_name"]} introduction in a cell line leads to a cellular phenotype consistent with the disease phenotype
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["c_4_2"] ? props.modifiedScores["c_4_2"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["c_4_2"] ? props.comments["c_4_2"]: "-"}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"c_5_1_row"}>
                                                    <TableCell>
                                                        C5.1 - {props.variantInfo["variant_name"]} neutralization, in a model organism or cell line, rescues or reverses the phenotype
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["c_5_1"] ? props.modifiedScores["c_5_1"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["c_5_1"] ? props.comments["c_5_1"]: "-"}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"c_5_2_row"}>
                                                    <TableCell>
                                                        C5.2 - {props.variantInfo["variant_name"]} introduction, in a model organism or a cell line, results in a phenotype that is consistent with the human disease
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["c_5_2"] ? props.modifiedScores["c_5_2"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["c_5_2"] ? props.comments["c_5_2"]: "-"}
                                                    </TableCell>
                                                </TableRow>   
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>

                            <Grid justify="center" container spacing={3}>
                                <Grid item xs={10}>
                                    <Typography variant="h5">Functional Results</Typography>
                                    <TableContainer>
                                        <Table aria-label="simple table">
                                            <colgroup>
                                                <col style={{width:'45%'}}/>
                                                <col style={{width:'10%'}}/>
                                                <col style={{width:'45%'}}/>
                                            </colgroup>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Evidence Description</TableCell>
                                                    <TableCell>Score</TableCell>
                                                    <TableCell>Additional Information/Comments</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            <TableRow key={"f_1_1_row"}>
                                                    <TableCell>
                                                        F1.1 - {props.variantInfo["variant_pos"]} is implicated in TF binding based on experimental data
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["f_1_1"] ? props.modifiedScores["f_1_1"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["f_1_1"] ? props.comments["f_1_1"]: ""}
                                                        <br></br>
                                                        <b>ReMap 2020 Peaks 
                                                        <Tooltip title={"ReMap is a database of transcriptional regulators peaks derived from curated ChIP-seq, ChIP-exo, DAP-seq experiments in Human"}>
                                                            <InfoOutlinedIcon fontSize="small"/>
                                                        </Tooltip> :</b> {props.additionalInfo["f_1_1"]["crms"]}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"f_1_2_row"}>
                                                    <TableCell>
                                                        F1.2 - {props.variantInfo["variant_pos"]} localizes to a regulatory region based on genome annotations
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["f_1_2"] ? props.modifiedScores["f_1_2"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["f_1_2"] ? props.comments["f_1_2"]: ""}
                                                        <br></br>
                                                        <b>cCREs
                                                        <Tooltip title={"Candidate cis-Regulatory Elements by ENCODE / SCREEN"}>
                                                            <InfoOutlinedIcon fontSize="small"/>
                                                        </Tooltip> :</b> {props.additionalInfo["f_1_2"]["ccre_descriptions"]}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"f_1_3_row"}>
                                                    <TableCell>
                                                        F1.3 - Regulatory region and <i>{props.variantInfo["target_gene"]}</i> are directly linked based on annotation or experimental data
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["f_1_3"] ? props.modifiedScores["f_1_3"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["f_1_3"] ? props.comments["f_1_3"]: ""}
                                                        <br></br>
                                                        <b>Supporting Experiment
                                                        <Tooltip title={"Information by ENCODE / SCREEN"}>
                                                            <InfoOutlinedIcon fontSize="small"/>
                                                        </Tooltip> :</b> {props.additionalInfo["f_1_3"]}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"f_1_4_row"}>
                                                    <TableCell>
                                                        F1.4 - {props.variantInfo["variant_name"]} is statistically associated with expression levels of <i>{props.variantInfo["target_gene"]}</i>
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["f_1_4"] ? props.modifiedScores["f_1_4"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["f_1_4"] ? props.comments["f_1_4"]: ""}
                                                        <br></br>
                                                        <b>Supporting Experiment
                                                        <Tooltip title={"Information by ENCODE / SCREEN"}>
                                                            <InfoOutlinedIcon fontSize="small"/>
                                                        </Tooltip> :</b> {props.additionalInfo["f_1_4"]}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"f_1_5_row"}>
                                                    <TableCell>
                                                        F1.5 - Regulatory region is shown to regulate gene expression of <i>{props.variantInfo["target_gene"]}</i>
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["f_1_5"] ? props.modifiedScores["f_1_5"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["f_1_5"] ? props.comments["f_1_5"]: "-"}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"f_2_1_row"}>
                                                    <TableCell>
                                                        F2.1 - {props.variantInfo["variant_name"]} causes a change in TF binding and/or chromatin environment
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["f_2_1"] ? props.modifiedScores["f_2_1"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["f_2_1"] ? props.comments["f_2_1"]: "-"}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"f_2_2_row"}>
                                                    <TableCell>
                                                        F2.2 - {props.variantInfo["variant_name"]} leads to changes in expression of <i>{props.variantInfo["target_gene"]}</i> in patient tissue
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["f_2_2"] ? props.modifiedScores["f_2_2"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["f_2_2"] ? props.comments["f_2_2"]: "-"}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"f_3_1_row"}>
                                                    <TableCell>
                                                        F3.1 - {props.variantInfo["variant_name"]} introduction, in a cell line, leads to changes in expression of <i>{props.variantInfo["target_gene"]}</i>, a reported gene or chromatin environment
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["f_3_1"] ? props.modifiedScores["f_3_1"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["f_3_1"] ? props.comments["f_3_1"]: "-"}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={"f_4_1_row"}>
                                                    <TableCell>
                                                        F4.1 - {props.variantInfo["variant_name"]} introduction, in a model organism, leads to changes in expression of <i>{props.variantInfo["target_gene"]}</i> or a reported gene or chromatin environment
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.modifiedScores["f_4_1"] ? props.modifiedScores["f_4_1"]: "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {props.comments["f_4_1"] ? props.comments["f_4_1"]: "-"}
                                                    </TableCell>
                                                </TableRow>   
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>


                            <Grid justify="center" container spacing={3}>
                                <Grid item xs={10}>
                                    <Typography variant="h5" align="left" gutterBottom>
                                        Citing Webpage Regulatory Variants
                                    </Typography>
                                </Grid> 
                            </Grid>
                            <Grid justify="center" container spacing={3}>
                                <Grid item xs={10}>
                                    <Typography variant="body1" align="left" gutterBottom>
                                        Van der Lee R, Correard S, Wasserman WW. Deregulated Regulators: Disease-Causing 
                                        cis Variants in Transcription Factor Genes. Trends Genet. 2020 Jul;36(7):523-539. 
                                        doi: 10.1016/j.tig.2020.04.006. Epub 2020 May 22.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Container>
            </div>
        </React.Fragment>
    )
}