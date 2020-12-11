import React, { /*useEffect,*/ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Button,
    Container,
    Grid,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography, 
} from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import StepOneForm from './StepOneForm';
import StepTwoForm from './StepTwoForm';
import StepThreeForm from './StepThreeForm';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    greyBackground: {
        backgroundColor: '#EFEFEF',
        padding: '50px',
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    centered: {
        marginRight: "auto",
        marginLeft: "auto"
    },
    formPaper: {
        width: "100%",
        height: "100%",
        padding: "2%",
        
    },
    grid: {
        padding: "0px",
        marginRight: "auto",
        marginLeft: "auto"
    }
}))

export default function ScoringForm(props) {
    var defaultDict = {
        "patient_id": "",
        "variant_id": "",
        "target_gene": "",
        "ref_genome": "",
        "chr": "",
        "pos": "",
        "alt": "",
        "gnomad_coord": "",
        "c_1_3": "unknown",
        "c_3_1": "unknown",
        "c_3_1_additional": "trio",
        "c_4_1": "unknown",
        "c_2_1": "unknown",
        "c_2_2": "unknown",
        "c_2_4": "unknown",
        "func_analysis": "no",
        "c_4_2": "unknown",
        "c_5_1": "unknown",
        "c_5_2": "unknown",
        "f_1_1": "unknown",
        "f_1_5": "unknown",
        "f_2_1": "unknown",
        "f_2_2": "unknown",
        "f_3_1": "unknown",
        "f_4_1": "unknown",
        "new_c": "",
    }
    const classes = useStyles();
    const steps = getSteps();
    const [activeStep, setActiveStep] = useState(0);
    const [results, setResults] = useState(defaultDict)
    const handleReset = () => {
        setActiveStep(0);
        setResults(defaultDict)
    }

    function NewlineText(props) {
        const text = props.text;
        return text.split('\n').map(str => <p key={str}>{str}</p>);
    }
    function getSteps() {
        return [
            'Step 1\nIncludes questions about the variant', 
            'Step 2\nIncludes questions about the gene and the variant', 
            'Step 3\nAllows you to modify your answers and add comments / remarks'
        ];
    }
    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <StepOneForm 
                        results={results}
                        setResults={setResults} 
                        setActiveStep={setActiveStep}>
                    </StepOneForm>
                )
            case 1:
                return (
                    <StepTwoForm 
                        results={results}
                        setResults={setResults} 
                        setActiveStep={setActiveStep}
                        setQuery={props.setQuery}>
                    </StepTwoForm>
                )
            case 2:
                return (
                    <StepThreeForm 
                        results={results}
                        initialScores={props.initialScores}
                        modifiedScores={props.modifiedScores}
                        setModifiedScores={props.setModifiedScores}
                        setCalcScores={props.setCalcScores}
                        setActiveStep={setActiveStep}>
                    </StepThreeForm>
                )
            /*
            case 3:
                return (
                    <Grid className={classes.grid} container direction="row" justify="center" alignItems="center" alignContent="flex-end" spacing={3}>
                        <Paper className={classes.formPaper}>
                            <Grid justify="center" container spacing={3}>
                                <Grid item xs={6}>
                                    <Typography>All steps completed! Submit your results below or go back to make any changes.</Typography>
                                </Grid>
                            </Grid>
                            <Grid justify="center" container spacing={3}>
                                <Grid item xs={6}>
                                    <Button onClick={handleBack} className={classes.backButton}>Back</Button>
                                    <Button onClick={submit} variant="contained" color="primary">Submit</Button>
                                    
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )
            */
            default:
                return 'Unknown stepIndex';
        }
    }
    

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Container maxWidth="md" className={classes.greyBackground}>
                    <Stepper className={classes.greyBackground} activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel><NewlineText text={label}/></StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <div>
                        {activeStep === steps.length ? (
                            <div>
                                <Grid className={classes.grid} container direction="row" justify="center" alignItems="center" alignContent="flex-end" spacing={3}>
                                    <Paper className={classes.formPaper}>
                                        <Grid justify="center" container spacing={3}>
                                            <Grid item xs={6}>
                                                <Typography component={'span'} className={classes.instructions}>Successfully submitted! View results below or restart.</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid justify="center" container spacing={3}>
                                            <Grid item xs={6}>
                                                <CheckCircleIcon fontSize="large" style={{fill: "green"}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid justify="center" container spacing={3}>
                                            <Grid item xs={6}>
                                                <Button onClick={handleReset} endIcon={<ReplayIcon/>}>Restart</Button>
                                                <Button variant="contained" color="primary">View Results</Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </div>
                            ) : (
                            <div>
                                <Typography component={'span'} className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}