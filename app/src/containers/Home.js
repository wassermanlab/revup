import React, {useEffect, useState} from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Container,
    Typography, 
} from '@material-ui/core';

import theme from '../styles/theme';
import NavBar from '../components/NavBar';
import ScoringForm from '../components/ScoringForm';
//import getCsrfToken from '../components/csrftoken';


const useStyles = makeStyles((theme) => ({
        pageHeader: {
            paddingTop: '50px',
        },
}));


export default function Home() {
    var defaultScoresDict = {
        "c_1_3": "0",
        "c_3_1": "0",
        "c_4_1": "0",
        "c_2_1": "0",
        "c_2_2": "0",
        "c_2_4": "0",
        "c_4_2": "0",
        "c_5_1": "0",
        "c_5_2": "0",
        "f_1_1": "0",
        "f_1_5": "0",
        "f_2_1": "0",
        "f_2_2": "0",
        "f_3_1": "0",
        "f_4_1": "0",
    }
    var defaultResultsDict = {
        "clinical": "0",
        "functional": "0",
        "rve": "0"
    }
    //const [initialQuery, setInitialQuery] = useState([]);
    const [query, setQuery] = useState([]);
    const [initialScores, setInitialScores] = useState(defaultScoresDict);
    const [modifiedScores, setModifiedScores] = useState(defaultScoresDict);
    const [finalScores, setFinalScores] = useState(defaultResultsDict);
    const [calcScores, setCalcScores] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const fetchInitialData = async () => {
            const response = await fetch('http://127.0.0.1:5000' + '/initial_scores', {
                method: 'POST',
                body: JSON.stringify(query),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': await getCsrfToken(),
                },
                //credentials: 'include'
            });
            const json = await response.json();
            setInitialScores(json);
            setModifiedScores(json);
        }
        console.log(query)
        if ("results" in query) {
            console.log("yo");
            fetchInitialData();
        }

    }, [query]);

    useEffect(() => {
        const fetchFinalData = async () => {
            const response = await fetch('http://127.0.0.1:5000' + '/calc_scores', {
                method: 'POST',
                body: JSON.stringify(modifiedScores),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': await getCsrfToken(),
                },
                //credentials: 'include'
            });
            const json = await response.json();
            setFinalScores(json);
        }
        console.log(calcScores)
        if (calcScores == true) {
            console.log("hi")
            fetchFinalData();
            setCalcScores(false);
        }

    }, [modifiedScores]);

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <NavBar/>
                { /*  TODO: Insert logo image here */ }
                <Container maxWidth="lg">
                    <Typography className={classes.pageHeader} variant="h2" align="center" gutterBottom>
                        Regulatory Variant Scoring System
                    </Typography>
                    <Typography  variant="body1"  align="center" gutterBottom>
                        This bioinformatic tool was developed to improve clinical 
                        interpretation of suspected regulatory genetic variants. While 
                        tools already exists for classification of exonic variants based 
                        on the ACMG / AMP 2015 guidelines (ex: 
                        <a href="http://wintervar.wglab.org">InterVar-Genetic variants Interpretation by ACMG/AMP 2015 guideline</a>
                        ), this tool focuses on the interpretation of suspected regulatory 
                        variants, based on the classification developed by Van der Lee R, 
                        Correard S and Wasserman WW in “Deregulated Regulators: Disease-
                        Causing cis Variants in Transcription Factor Genes” (Trends in 
                        Genetics, 2020).
                        <br/><br/>
                        For more information, please refer to the <a href="/about">About page</a>
                    </Typography>
                </Container>
                <Container maxWidth="lg">
                    <ScoringForm 
                        setQuery={setQuery} 
                        setModifiedScores={setModifiedScores}
                        setCalcScores={setCalcScores}
                        modifiedScores={modifiedScores}
                        initialScores={initialScores}
                    >
                    </ScoringForm>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    )
}