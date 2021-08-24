import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import {
    GeneralInfoTable,
    ClinicalResultsTable,
    FunctionalResultsTable,
    CalculationsTable
} from './ResultsTablesPDF'

const BORDER_COLOR = '#E5E5E5'
//const BORDER_STYLE = 'solid'
const COL_WIDTH = 35
const COL_WIDTH_MED = 25
const COL_WIDTH_SM = 10
const COL_WIDTH_LG = 50
const COL_WIDTH_XL = 75
//const COLN_WIDTH = (100 - COL_WIDTH_MED) / 3
const CITATION_COLOR = "#B4B1B1"
const TEXT_COLOR = "#757575"
const HEADING_COLOR = "#DFA564"
const SUBHEADING_COLOR = "#545454"
const styles = StyleSheet.create({
    // General
    body: {
        padding: 20
    },
    citation: {
        margin: 30,
        marginTop: 0,
        marginBottom: 15,
        fontSize: 10,
        fontWeight: 200,
        color: CITATION_COLOR
    },
    normal: {
        margin: 30,
        marginTop: 15,
        marginBottom: 15,
        fontSize: 10,
        fontWeight: 400,
        color: TEXT_COLOR
    },
    heading: {
        margin: 30,
        marginTop: 15,
        marginBottom: 15,
        //paddingTop: 15,
        //paddingBottom: 15,
        fontWeight: 900,
        color: HEADING_COLOR
    },
    subheadingCentered: {
        fontWeight: 200,
        color: SUBHEADING_COLOR,
        fontSize: 14,
        textAlign: 'center'
    },

    // General Tables
    tableRow: { 
        margin: "auto", 
        flexDirection: "row" 
    }, 
    tableCellHeader: {
        margin: 5, 
        fontSize: 12,
        fontWeight: 500,
        color: SUBHEADING_COLOR
    },  
    tableCell: { 
        margin: 5, 
        fontSize: 10 ,
        color: TEXT_COLOR
    },
    tableCellCentered: {
        margin: 5,
        fontSize: 10,
        textAlign: 'center',
        color: TEXT_COLOR
    },
    tableCol: {
        width: COL_WIDTH + '%',
        border: null
    },
    tableColSm: {
        width: COL_WIDTH_SM + '%',
        border: null
    },
    tableColMed: {
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

    // Results Tables
    resultsTable: { 
        display: "table", 
        width: "auto", 
        border: null, 
    }, 
    resultsTableColHeader: {
        width: COL_WIDTH + "%", 
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
        width: COL_WIDTH + '%', 
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
});



export default function ResultsPDF(props) {
    return (
        <React.Fragment>
            <Document>
                <Page style={styles.body}>
                    <GeneralInfoTable 
                        variantInfo={props.variantInfo}
                        finalResults={props.finalResults}
                        assemblies={props.assemblies}
                        downloadTime={props.downloadTime}
                    />

                    <View>
                        <Text style={styles.heading}>Scores</Text>
                    </View>
                    <View>
                        <Text style={styles.subheadingCentered}>RVE Score = {props.finalResults["rve"]}</Text>
                    </View>
                    <View style={styles.table}> 
                        <View style={styles.tableRow}> 
                            <View style={{ width: '60%', border: null}}> 
                                <Image src={props.lineChart}></Image>
                            </View> 
                        </View>
                    </View>

                    <View style={styles.table}> 
                        <View style={styles.tableRow}> 
                            <View style={styles.tableColLg}>
                                <Image src={props.clinicalChart}></Image>
                            </View>
                            <View style={styles.tableColLg}>
                                <Image src={props.functionalChart}></Image>
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

                    <ClinicalResultsTable 
                        additionalInfo={props.additionalInfo}
                        modifiedScores={props.modifiedScores}
                        variantInfo={props.variantInfo}
                        comments={props.comments}
                        downloadTime={props.downloadTime}
                    />
                    <FunctionalResultsTable 
                        additionalInfo={props.additionalInfo}
                        modifiedScores={props.modifiedScores}
                        variantInfo={props.variantInfo}
                        comments={props.comments}
                        downloadTime={props.downloadTime}
                    />
                    <CalculationsTable
                        finalResults={props.finalResults}
                        modifiedScores={props.modifiedScores}
                        variantInfo={props.variantInfo}
                        posEvidenceLevels={props.posEvidenceLevels}
                        downloadTime={props.downloadTime}
                    />

                </Page>
            </Document>
        </React.Fragment>
    )
}



