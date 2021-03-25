
import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import {
    CLINICAL_RANGE_MAXIMUMS,
    FUNCTIONAL_RANGE_MAXIMUMS
} from '../constants'

const BORDER_COLOR = '#bfbfbf'
const BORDER_STYLE = 'solid'
const COL_WIDTH_MED = 35
const COL_WIDTH_SM = 10
const COL_WIDTH_LG = 50
const COL_WIDTH_XL = 65
const COLN_WIDTH = (100 - COL_WIDTH_MED) / 3
const styles = StyleSheet.create({
    body: {
        padding: 20
    },
    heading: {
        paddingTop: 15,
        paddingBottom: 15
    },
    resultsTable: { 
        display: "table", 
        width: "auto", 
        border: null, 
    }, 
    resultsTableColHeader: {
        width: COL_WIDTH_MED + "%", 
        borderBottomColor: BORDER_COLOR, 
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0, 
        borderBottomWidth: 1 
    },
    resultsTableColSmHeader: {
        width: COL_WIDTH_SM + '%', 
        borderBottomColor: BORDER_COLOR,  
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        bottomRigthWidth: 0,
        borderBottomWidth: 1
    },
    resultsTableCol: { 
        width: COL_WIDTH_MED + '%', 
        borderBottomColor: BORDER_COLOR,
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        bottomRigthWidth: 0,
        borderBottomWidth: 1
    }, 
    resultsTableColXl: {
        width: COL_WIDTH_XL + '%', 
        borderBottomColor: BORDER_COLOR,
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        bottomRigthWidth: 0,
        borderBottomWidth: 1
    } , 
    resultsTableColSm: { 
        width: COL_WIDTH_SM + "%", 
        borderColor: BORDER_COLOR,
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        bottomRigthWidth: 0,
        borderBottomWidth: 1
    },
    tableRow: { 
        margin: "auto", 
        flexDirection: "row" 
    }, 
    tableCellHeader: {
        margin: 5, 
        fontSize: 12,
        fontWeight: 500
    },  
    tableCell: { 
        margin: 5, 
        fontSize: 10 
    },
    tableCellCentered: {
        margin: 5,
        fontSize: 10,
        textAlign: 'center',
    },
    tableCol: {
        width: COL_WIDTH_MED + '%',
        border: null
    },
    tableColLg: {
        width: COL_WIDTH_LG + '%',
        border: null
    },
    tableColXl: {
        width: COL_WIDTH_XL + '%',
        border: null
    },
    citation: {
        margin: 5,
        fontSize: 10,
        fontWeight: 200,
        //padding: 30,
        //paddingTop: 5,
    },
    normal: {
        margin: 5, 
        fontSize: 10,
        fontWeight: 400
    }
});



export default function ResultsPDF(props) {
    return (
        <React.Fragment>
            <Document>
                <Page style={styles.body}>
                    <View>
                        <Text style={styles.heading}>
                            General Info
                        </Text>
                    </View>
                    <View style={styles.table}>
                        {(function () {
                            if(props.variantInfo["variant_id"]) {
                                return (
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>Variant ID: </Text>
                                        </View>
                                        <View style={styles.tableColLg}>
                                            <Text style={styles.tableCell}>{props.variantInfo["variant_id"]}</Text>
                                        </View>
                                    </View>
                            )} else {return ("")}
                        })()}
                        {(function () {
                            if(props.variantInfo["patient_id"]) {
                                return (
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>Patient ID: </Text>
                                        </View>
                                        <View style={styles.tableColLg}>
                                            <Text style={styles.tableCell}>{props.variantInfo["patient_id"]}</Text>
                                        </View>
                                    </View>
                            )} else {return ("")}
                        })()}
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>hg19 position: </Text>
                            </View>
                            <View style={styles.tableColLg}>
                                <Text style={styles.tableCell}>{props.assemblies["hg19"]}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>hg38 position: </Text>
                            </View>
                            <View style={styles.tableColLg}>
                                <Text style={styles.tableCell}>{props.assemblies["hg38"]}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Reference Assembly: </Text>
                            </View>
                            <View style={styles.tableColLg}>
                                <Text style={styles.tableCell}>{props.variantInfo["ref_genome"]}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Patient's Genotype: </Text>
                            </View>
                            <View style={styles.tableColLg}>
                                <Text style={styles.tableCell}>{props.variantInfo["genotype"]}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Target Gene: </Text>
                            </View>
                            <View style={styles.tableColLg}>
                                <Text style={styles.tableCell}>{props.variantInfo["target_gene"]}</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.heading}>Scores</Text>
                    </View>
                    <View style={styles.table}> 
                        <View style={styles.tableRow}> 
                            <View style={styles.tableColXl}> 
                                <Image src={props.lineChart}></Image>
                            </View> 
                            <View style={styles.tableCol}> 
                                <View style={styles.tableRow}> 
                                    <View style={styles.resultsTableColXl}>
                                        <Text style={styles.tableCellCentered}>
                                            Clinical Score:
                                        </Text>
                                        <Text style={styles.tableCellCentered}>
                                            Is there a causal link between genotype and phenotype?
                                        </Text>
                                        <Image src={props.clinicalChart}></Image>
                                        <Text style={styles.tableCellCentered}>
                                            {(function () {
                                                if(props.finalResults["clinical"] <= CLINICAL_RANGE_MAXIMUMS["weak"] && props.finalResults["clinical"] >= 0.0) {
                                                    return ("Weak Evidence")
                                                } else if(props.finalResults["clinical"] > CLINICAL_RANGE_MAXIMUMS["weak"] && props.finalResults["clinical"] <= CLINICAL_RANGE_MAXIMUMS["moderate"]) {
                                                    return ("Moderate Evidence")
                                                } else {
                                                    return ("Strong Evidence")
                                                }
                                            })()}
                                        </Text>
                                    </View>
                                </View> 
                                <View style={styles.tableRow}> 
                                    <View style={styles.tableColXl}>
                                        <Text style={styles.tableCellCentered}>
                                            Functional Score:
                                        </Text>
                                        <Text style={styles.tableCellCentered}>
                                        Does the variant have a damaging effect on the gene?
                                        </Text>
                                        <Image src={props.functionalChart}></Image>
                                        <Text style={styles.tableCellCentered}>
                                            {(function () {
                                                if(props.finalResults["clinical"] <= FUNCTIONAL_RANGE_MAXIMUMS["weak"] && props.finalResults["clinical"] >= 0.0) {
                                                    return ("Weak Evidence")
                                                } else if(props.finalResults["clinical"] > FUNCTIONAL_RANGE_MAXIMUMS["weak"] && props.finalResults["clinical"] <= FUNCTIONAL_RANGE_MAXIMUMS["moderate"]) {
                                                    return ("Moderate Evidence")
                                                } else {
                                                    return ("Strong Evidence")
                                                }
                                            })()}
                                        </Text>
                                    </View>
                                </View> 
                            </View>
                        </View>
                        
                    </View>


                    <View>
                        <Text style={styles.heading}>Clinical Results</Text>
                    </View>
                    <View style={styles.resultsTable}> 
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableColHeader}> 
                                <Text style={styles.tableCellHeader}>Evidence Description</Text> 
                            </View> 
                            <View style={styles.resultsTableColSmHeader}> 
                                <Text style={styles.tableCellHeader}>Score</Text> 
                            </View> 
                            <View style={styles.resultsTableColHeader}> 
                                <Text style={styles.tableCellHeader}>Comments/Additional Information</Text> 
                            </View> 
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    C1.1 - {props.variantInfo["variant_pos"]} is evolutionarily conserved
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["c_1_1"] ? props.modifiedScores["c_1_1"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["c_1_1"] ? props.comments["c_1_1"]+"\n": ""}
                                    phyloP Score: {props.additionalInfo["c_1_1"]["phylop"]}
                                    {"\n"}
                                    phastCons Score: {props.additionalInfo["c_1_1"]["phastcons"]}
                                </Text> 
                            </View>
                        </View> 
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    C1.2 - {props.variantInfo["variant_name"]} is rare in unaffected individuals in specific sets of controls or reference population databases
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["c_1_2"] ? props.modifiedScores["c_1_2"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["c_1_2"] ? props.comments["c_1_2"]+"\n": ""}
                                    gnomAD AF : {props.additionalInfo["c_1_2"]["af"]}
                                </Text> 
                            </View>
                        </View> 
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    C1.3 - {props.variantInfo["variant_name"]} or locus previously statistically associated with the same or a similar disease phenotype
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["c_1_3"] ? props.modifiedScores["c_1_3"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["c_1_3"] ? props.comments["c_1_3"]: "-"}
                                </Text> 
                            </View>
                        </View>  
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    C2.1 - {props.variantInfo["target_gene"]} has been implicated in the same or a similar disease phenotype, or is otherwise relevant
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["c_2_1"] ? props.modifiedScores["c_2_1"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["c_2_1"] ? props.comments["c_2_1"]: "-"}
                                </Text> 
                            </View>
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    C2.2 - {props.variantInfo["target_gene"]} does not contain coding variants in the same individual
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["c_2_2"] ? props.modifiedScores["c_2_2"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["c_2_2"] ? props.comments["c_2_2"]: "-"}
                                </Text> 
                            </View>
                        </View>  
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    C2.3 - {props.variantInfo["variant_name"]} is considered deleterious by computational prediction methods
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["c_2_3"] ? props.modifiedScores["c_2_3"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["c_2_3"] ? props.comments["c_2_3"]+"\n": ""}
                                    CADD Score: {props.additionalInfo["c_2_3"]["cadd_score"]}
                                </Text> 
                            </View>
                        </View> 
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                C2.4 - {props.variantInfo["variant_name"]} is similar to another regulatory variant associated to {props.variantInfo["target_gene"]} and implicated in the same or a similar disease phenotype
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["c_2_4"] ? props.modifiedScores["c_2_4"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["c_2_4"] ? props.comments["c_2_4"]: "-"}
                                </Text> 
                            </View>
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    C2.5 - {props.variantInfo["variant_name"]} is a striking noncoding event
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["c_2_5"] ? props.modifiedScores["c_2_5"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["c_2_5"] ? props.comments["c_2_5"]: "-"}
                                </Text> 
                            </View>
                        </View> 
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    C3.1 - {props.variantInfo["variant_name"]} shows familial segregation with the disease
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["c_3_1"] ? props.modifiedScores["c_3_1"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["c_3_1"] ? props.comments["c_3_1"]: "-"}
                                </Text> 
                            </View>
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    C4.1 - {props.variantInfo["variant_name"]} observed in multiple, unrelated families with the same disease phenotype
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["c_4_1"] ? props.modifiedScores["c_4_1"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["c_4_1"] ? props.comments["c_4_1"]: "-"}
                                </Text> 
                            </View>
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    C4.2 - {props.variantInfo["variant_name"]} introduction in a cell line leads to a cellular phenotype consistent with the disease phenotype
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["c_4_2"] ? props.modifiedScores["c_4_2"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["c_4_2"] ? props.comments["c_4_2"]: "-"}
                                </Text> 
                            </View>
                        </View> 
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    C5.1 - {props.variantInfo["variant_name"]} neutralization, in a model organism or cell line, rescues or reverses the phenotype
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["c_5_1"] ? props.modifiedScores["c_5_1"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["c_5_1"] ? props.comments["c_5_1"]: "-"}
                                </Text> 
                            </View>
                        </View> 
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    C5.2 - {props.variantInfo["variant_name"]} introduction, in a model organism or a cell line, results in a phenotype that is consistent with the human disease
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["c_5_2"] ? props.modifiedScores["c_5_2"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["c_5_2"] ? props.comments["c_5_2"]: "-"}
                                </Text> 
                            </View>
                        </View>      
                    </View>


                    <View>
                        <Text style={styles.heading}>Functional Results</Text>
                    </View>
                    <View style={styles.resultsTable}> 
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableColHeader}> 
                                <Text style={styles.tableCellHeader}>Evidence Description</Text> 
                            </View> 
                            <View style={styles.resultsTableColSmHeader}> 
                                <Text style={styles.tableCellHeader}>Score</Text> 
                            </View> 
                            <View style={styles.resultsTableColHeader}> 
                                <Text style={styles.tableCellHeader}>Comments/Additional Information</Text> 
                            </View> 
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    F1.1 - {props.variantInfo["variant_pos"]} is implicated in TF binding based on experimental data
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["f_1_1"] ? props.modifiedScores["f_1_1"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["f_1_1"] ? props.comments["f_1_1"]+"\n": ""}
                                    ReMap 2020 Peaks: {props.additionalInfo["f_1_1"]["crms"]}
                                </Text> 
                            </View>
                        </View>  
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    F1.2 - {props.variantInfo["variant_pos"]} localizes to a regulatory region based on genome annotations
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["f_1_2"] ? props.modifiedScores["f_1_2"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["f_1_2"] ? props.comments["f_1_2"]+"\n": ""}
                                    cCREs: {props.additionalInfo["f_1_2"]["ccre_descriptions"]}
                                </Text> 
                            </View>
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    F1.3 - Regulatory region and {props.variantInfo["target_gene"]} are directly linked based on annotation or experimental data
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["f_1_3"] ? props.modifiedScores["f_1_3"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["f_1_3"] ? props.comments["f_1_3"]+"\n": ""}
                                    Supporting Experiment: {props.additionalInfo["f_1_3"]}
                                </Text> 
                            </View>
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    F1.4 - {props.variantInfo["variant_name"]} is statistically associated with expression levels of {props.variantInfo["target_gene"]}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["f_1_4"] ? props.modifiedScores["f_1_4"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["f_1_4"] ? props.comments["f_1_4"]+"\n": ""}
                                    Supporting Experiment: {props.additionalInfo["f_1_4"]}
                                </Text> 
                            </View>
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    F1.5 - Regulatory region is shown to regulate gene expression of {props.variantInfo["target_gene"]}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["f_1_5"] ? props.modifiedScores["f_1_5"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["f_1_5"] ? props.comments["f_1_5"]: "-"}
                                </Text> 
                            </View>
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    F2.1 - {props.variantInfo["variant_name"]} causes a change in TF binding and/or chromatin environment
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["f_2_1"] ? props.modifiedScores["f_2_1"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["f_2_1"] ? props.comments["f_2_1"]: "-"}
                                </Text> 
                            </View>
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    F2.2 - {props.variantInfo["variant_name"]} leads to changes in expression of {props.variantInfo["target_gene"]} in patient tissue
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["f_2_2"] ? props.modifiedScores["f_2_2"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["f_2_2"] ? props.comments["f_2_2"]: "-"}
                                </Text> 
                            </View>
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                    F3.1 - {props.variantInfo["variant_name"]} introduction, in a cell line, leads to changes in expression of {props.variantInfo["target_gene"]}, a reported gene or chromatin environment
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["f_3_1"] ? props.modifiedScores["f_3_1"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["f_3_1"] ? props.comments["f_3_1"]: "-"}
                                </Text> 
                            </View>
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.resultsTableCol}> 
                                <Text style={styles.tableCell}>
                                F4.1 - {props.variantInfo["variant_name"]} introduction, in a model organism, leads to changes in expression of {props.variantInfo["target_gene"]} or a reported gene or chromatin environment
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableColSm}> 
                                <Text style={styles.tableCellCentered}>
                                    {props.modifiedScores["f_4_1"] ? props.modifiedScores["f_4_1"]: "-"}
                                </Text> 
                            </View> 
                            <View style={styles.resultsTableCol}>
                                <Text style={styles.tableCell}>
                                    {props.comments["f_4_1"] ? props.comments["f_4_1"]: "-"}
                                </Text> 
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.heading}>
                            Citing RevUP
                        </Text>
                        <Text style={styles.citation}>
                            Van der Lee R, Correard S, Wasserman WW. Deregulated Regulators: Disease-Causing 
                            cis Variants in Transcription Factor Genes. Trends Genet. 2020 Jul;36(7):523-539. 
                            doi: 10.1016/j.tig.2020.04.006. Epub 2020 May 22.
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.normal}>
                            Downloaded: {props.downloadTime}
                        </Text>
                    </View>
                </Page>
            </Document>
        </React.Fragment>
    )
}

