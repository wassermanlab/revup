import React, {useState} from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Typography, 
} from '@material-ui/core';
import clsx from 'clsx';
import theme from '../styles/theme';
import NavBar from '../components/NavBar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ClinicalEvidenceClassificationTable from '../tables/ClinicalEvidenceClassificationTable';
import FunctionalEvidenceClassificationTable from '../tables/FunctionalEvidenceClassificationTable';
import ExternalApiTable from '../tables/ExternalApisTable';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    pageHeader: {
        paddingTop: '50px',
    },
    accordionHeader: {
        paddingTop: '10px',
    },
    root: {
        display: 'flex',
        width: '100%',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    card: {
        display: 'flex',
        padding: "2%",
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
    grid: {
        padding: "0px",
        marginRight: "auto",
        marginLeft: "auto"
    },
    details: {
        flexDirection: "column"
    },
}));


export default function AdditionalResources() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
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
                            <Grid container direction="column" justify="center" alignItems="center" alignContent="flex-end" spacing={3}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <Typography variant="h4" align="left">
                                                    Evidence Classification Tables for Regulatory Variants
                                                </Typography>
                                                <Divider />
                                                <br></br>
                                                <Typography variant="body1" color="textSecondary">
                                                    The following tables outline the evidence classification used 
                                                    to score variants in RevUP. They were adapted from Van der Lee R, 
                                                    Correard S and Wasserman WW in “Deregulated Regulators: Disease-
                                                    Causing cis Variants in Transcription Factor Genes” (Trends in 
                                                    Genetics, 2020).
                                                </Typography>
                                                <br></br>
                                                <br></br>
                                                <Accordion elevation={0}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1-content"
                                                        id="panel1-header">
                                                        <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                                            <b>Clinical Evidence - is there a causal link between genotype and phenotype?</b>
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Grid container justify="flex-start" spacing={3}>
                                                            <Grid item xs={12}>
                                                                <ClinicalEvidenceClassificationTable />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="body1" color="textSecondary" paragraph style={{whiteSpace: 'pre-line' , fontSize: "12px"}}>
                                                                    <sup>a</sup>Symbols: {"\n"}
                                                                    @, attainable with bioinformatics tools and databases; {"\n"}
                                                                    G, suspected target gene; {"\n"}
                                                                    R, regulatory region containing variant position; {"\n"}
                                                                    V, variant; {"\n"}
                                                                    *, conceptually possible but we did not find this in practice due to focus on rare disease
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion elevation={0}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1-content"
                                                        id="panel1-header">
                                                        <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                                            <b>Functional Evidence - does the variant have a damaging effect on the gene?</b>
                                                        </Typography>
                                                    </AccordionSummary>                                                    
                                                    <AccordionDetails>
                                                        <Grid container justify="flex-start" spacing={3}>
                                                            <Grid item xs={12}>
                                                                <FunctionalEvidenceClassificationTable />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="body1" color="textSecondary" paragraph style={{whiteSpace: 'pre-line' , fontSize: "12px"}}>
                                                                    <sup>a</sup>Symbols: {"\n"}
                                                                    @, attainable with bioinformatics tools and databases; {"\n"}
                                                                    G, suspected target gene; {"\n"}
                                                                    R, regulatory region containing variant position; {"\n"}
                                                                    V, variant; {"\n"}
                                                                    *, conceptually possible but we did not find this in practice due to focus on rare disease
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>                 
                                                    </AccordionDetails>
                                                </Accordion>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                
                                    <Grid item xs={12}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <Typography variant="h4" align="left">
                                                    External Databases Used in the RevUP Scoring System
                                                </Typography>
                                                <Divider />
                                                <br></br>
                                                <Typography variant="body1" color="textSecondary">
                                                    The following table outlines how several external databases were used as part of RevUP, including the source of the information,
                                                    what information was extracted, what queries were used, and where they were used in the RevUP system.
                                                </Typography>
                                                <br></br>
                                                <br></br>
                                                <Accordion elevation={0}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1-content"
                                                        id="panel1-header">
                                                        <Typography variant="h5" align="left" color="secondary" gutterBottom>
                                                            <b>External APIs accessed by RevUP</b>
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <ExternalApiTable />
                                                    </AccordionDetails>
                                                </Accordion>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                    </main>
                </ThemeProvider>
            </div>
        </React.Fragment>
    )
}