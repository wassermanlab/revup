import React, {useEffect, useState} from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Container,
    Typography, 
} from '@material-ui/core';
import clsx from 'clsx';
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import theme from '../styles/theme';
import NavBar from '../components/NavBar';
import ScoringForm from '../components/ScoringForm';
import Results from '../components/Results';
//import getCsrfToken from '../components/csrftoken';
import {
    defaultQueryDict,
    defaultInfo,
    defaultScoresDict,
    defaultValsDict,
    defaultResultsDict,
} from '../constants'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    pageHeader: {
        paddingTop: '50px',
    },
    root: {
        display: 'flex',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    },
}));


export default function Home() {
    // TODO: Change this import method!!
    const config = require("../templates.json");
    const [query, setQuery] = useState(defaultQueryDict);
    const [initialScores, setInitialScores] = useState(defaultScoresDict);
    const [modifiedScores, setModifiedScores] = useState(defaultScoresDict);
    const [additionalInfo, setAdditionalInfo] = useState(defaultScoresDict);
    const [comments, setComments] = useState(defaultValsDict);
    const [variantInfo, setVariantInfo] = useState(defaultInfo);
    const [finalResults, setFinalResults] = useState(defaultResultsDict);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("unfilled");
    const classes = useStyles();

    useEffect(() => {
        const fetchRefData = async () => {
            //setLoading(true)
            const response = await fetch(`https://api.genome.ucsc.edu/getData/sequence?genome=${query["ref_genome"]};chrom=chr${query["chro"]};start=${(parseFloat(query["pos"])-1).toString()};end=${query["pos"]}`);
            const json = await response.json();
            var variant = [query["chro"], query["pos"], json["dna"].toUpperCase(), query["alt"]];
            setVariantInfo({
                ...variantInfo,
                "patient_id": query["patient_id"],
                "variant_id": query["patient_id"],
                "variant_name": `${query["ref_genome"]}.chr${query["chro"]}:${query["pos"]}.${json["dna"].toUpperCase()}>${query["alt"]}`, 
                "variant_pos": `${query["ref_genome"]}.chr${query["chro"]}:${query["pos"]}`,
                "variant_description": variant.join("-"),
                "ref_genome": query["ref_genome"],
                "target_gene": query["target_gene"]
            });
            //console.log(json);
        }
        if (query["query_ref"] === true){
            if (query["gnomad_coord"] !== "") {
                // gnomAD coord format is chro-pos-ref-alt
                var variant = query["gnomad_coord"].split("-");
                setVariantInfo({
                    ...variantInfo,
                    "patient_id": query["patient_id"],
                    "variant_id": query["patient_id"],
                    "variant_name": `${query["ref_genome"]}.chr${variant[0]}:${variant[1]}.${variant[2]}>${variant[3]}`, 
                    "variant_pos": `${query["ref_genome"]}.chr${variant[0]}:${variant[1]}`,
                    "variant_description": variant.join("-"),
                    "ref_genome": query["ref_genome"],
                    "target_gene": query["target_gene"]
                });
            } else {
                fetchRefData();
            }
            setQuery({...query, "query_ref": false});
        } 
    }, [query]);


    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true)
            const response = await fetch(config.backend_url + '/initial_scores', {
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
            setInitialScores(json["scores"]);
            setModifiedScores(json["scores"]);
            setAdditionalInfo(json["additional_info"]);
            //setVariantInfo(json["variant_info"]);
            setLoading(false)
            console.log(json);
        }
        if (query["calc_scores"] === true){
            fetchInitialData();
            setQuery({...query, "calc_scores": false});
        }
    }, [query]);

    useEffect(() => {
        const fetchFinalData = async () => {
            const response = await fetch(config.backend_url + '/calc_scores', {
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
            setFinalResults(json);
            setStatus("filled");
        }
        if (modifiedScores["calc_scores"] === true) {
            fetchFinalData();
            setModifiedScores({...modifiedScores, "calc_scores": false});
        }
    }, [modifiedScores]);

    return (
        <React.Fragment>
            <div className={classes.root}>
                <ThemeProvider theme={theme}>
                    <NavBar 
                        open={open} 
                        setOpen={setOpen}
                    />
                    { /*  TODO: Insert logo image here */ }
                    <main
                        className={clsx(classes.content, {
                        [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes.drawerHeader} />
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
                            <Dialog 
                                aria-labelledby="LoadingBarDialog" 
                                disableBackdropClick={true} 
                                disableEscapeKeyDown={true} 
                                open={loading}
                                style={{textAlign: "center"}}
                            >
                                <DialogTitle id="LoadingBarTitle">Loading...</DialogTitle>
                                <DialogContent>
                                    <CircularProgress/>
                                </DialogContent>
                            </Dialog>
                            { status === "unfilled" ? 
                            <ScoringForm 
                                setQuery={setQuery} 
                                setModifiedScores={setModifiedScores}
                                setComments={setComments}
                                query={query}
                                defaultQueryDict={defaultQueryDict}
                                modifiedScores={modifiedScores}
                                initialScores={initialScores}
                                additionalInfo={additionalInfo}
                                comments={comments}
                                variantInfo={variantInfo}
                            />
                            : <Results 
                                finalResults={finalResults}
                                modifiedScores={modifiedScores}
                                additionalInfo={additionalInfo}
                                comments={comments}
                                variantInfo={variantInfo}
                            />}
                        </Container>
                    </main>
                </ThemeProvider>
            </div>
        </React.Fragment>
    )
}