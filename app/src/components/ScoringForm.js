import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Container,
    Step,
    StepLabel,
    Stepper,
    Typography, 
} from '@material-ui/core';

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
    const classes = useStyles();
    const steps = getSteps();
    const [activeStep, setActiveStep] = useState(0);

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
                        query={props.query}
                        setQuery={props.setQuery}
                        setActiveStep={setActiveStep}>
                    </StepOneForm>
                )
            case 1:
                return (
                    <StepTwoForm 
                        query={props.query}
                        variantInfo={props.variantInfo}
                        setQuery={props.setQuery}
                        setActiveStep={setActiveStep}>
                    </StepTwoForm>
                )
            case 2:
                return (
                    <StepThreeForm 
                        assemblies={props.assemblies}
                        query={props.query}
                        setQuery={props.setQuery}
                        initialScores={props.initialScores}
                        modifiedScores={props.modifiedScores}
                        additionalInfo={props.additionalInfo}
                        setModifiedScores={props.setModifiedScores}
                        variantInfo={props.variantInfo}
                        comments={props.comments}
                        setComments={props.setComments}
                        setActiveStep={setActiveStep}>
                    </StepThreeForm>
                )
            default:
                return 'Unknown stepIndex';
        }
    }
    

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Container maxWidth="lg" className={classes.greyBackground}>
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