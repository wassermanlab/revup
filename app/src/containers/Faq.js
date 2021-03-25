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
    Link,
    Typography, 
} from '@material-ui/core';
import clsx from 'clsx';
import theme from '../styles/theme';
import NavBar from '../components/NavBar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    },
    card: {
        display: 'flex',
        padding: "2%",
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


export default function Faq() {
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
                            <Grid container direction="row" justify="center" alignItems="center" alignContent="flex-end" spacing={3}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <Typography variant="h4" align="left" gutterBottom>
                                                    FAQ/Help
                                                </Typography>
                                                <Divider />
                                                <br></br>
                                                <Typography variant="body1" color="textSecondary">
                                                    We hope that the website will be intuitive, you can use 
                                                    the example to score a variant and explore the process. 
                                                    This page will be completed over time, as users ask us 
                                                    questions, so feel free to <Link href="/contact" color="secondary">contact us</Link> if you encounter 
                                                    a problem. 
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header">
                                                <Typography variant="h6" color="secondary">
                                                    What are the different steps?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" component={'span'} color="textSecondary" paragraph>
                                                    There are 3 steps involved when using RevUP to score regulatory variants:
                                                    <br></br>
                                                    <ul>
                                                        <li>Step 1 includes questions about the variant</li>
                                                        <li>Step 2 includes questions about the potential target gene and the variant</li>
                                                        <li>Step 3 allows users to modify answers and add comments/remarks</li>
                                                    </ul>
                                                    In step 3, users can modify their answers, as well as add information / remarks. For example, the user could add the reference of the paper where they found the information for a given evidence.
                                                    <br></br>  
                                                    Finally, the user will obtain the final score as well as a document providing the details provided.
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2-content"
                                                id="panel2-header">
                                                <Typography variant="h6" color="secondary">
                                                    How to score compound Heterozygous variants?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    To date, the tool does not allow to score compound heterozygous variants in a combined fashion. Users should score both variants separately and then combine the results in a critical manner, as features may not be additive, and scores are not additives. 
                                                    <br></br>
                                                    We are planning on working on this feature for a future release.
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel3-content"
                                                id="panel3-header">
                                                <Typography variant="h6" color="secondary">
                                                    How to score structural variants?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography  variant="body1"  color="textSecondary" paragraph>
                                                    To date, the tool only allow the scoring of non-coding SNV (
                                                    Single nucleotide variants), to obtain the score of a structural 
                                                    variant, user should refer to the tables in Van der Lee R, 
                                                    Correard S and Wasserman WW in “Deregulated Regulators: 
                                                    Disease-Causing cis Variants in Transcription Factor Genes” 
                                                    (Trends in Genetics, 2020)
                                                    <br></br>
                                                    We are planning on working on this feature for a future release.
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel4-content"
                                                id="panel4-header">
                                                <Typography variant="h6" color="secondary">
                                                    When I have the RVE-score, how do I know if the variant is pathogenic?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography  variant="body1" color="textSecondary" paragraph>
                                                    The scoring system for potential regulatory variants is not a 
                                                    classification system for variant pathogenicity. You should refer 
                                                    to the latest ACMG / AMP guidelines.
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel5-content"
                                                id="panel5-header">
                                                <Typography variant="h6" color="secondary">
                                                    What information are you keeping when I score a variant?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                                    In order to create statistics on the submission, we do keep metadata. 
                                                    We do not conserve users information (IP address) nor we conserve the 
                                                    variant details (chromosome, position, reference allele, alternate allele), 
                                                    so we won’t be able to study individual variants that are submitted. Our 
                                                    goal is to observe how many users submit with which reference genome, how 
                                                    many users did functional analysis, etc. 
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel6-content"
                                                id="panel6-header">
                                                <Typography variant="h6" color="secondary">
                                                    What source of information are you using?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography  variant="body1" color="textSecondary" paragraph>
                                                    To know the details behind the scoring system and which databases the tool 
                                                    is querying, refer to Table 1 [Link to Table 1].
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel7-content"
                                                id="panel7-header">
                                                <Typography variant="h6" color="secondary">
                                                    How do I report a bug, a question or suggest an amelioration?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    Use the <Link href="/contact" color="secondary">contact page</Link>!
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel8-content"
                                                id="panel8-header">
                                                <Typography variant="h6" color="secondary">
                                                    How should I cite this work?
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    If you used this website to score a variant, and / or want to include the 
                                                    final figure in your paper, please cite both :
                                                    <br></br>
                                                    Van der Lee R, Correard S and Wasserman WW in “Deregulated Regulators: 
                                                    Disease-Causing cis Variants in Transcription Factor Genes” (Trends in Genetics, 2020)
                                                    <br></br>
                                                    [Add ref of website paper when published]
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel9-content"
                                                id="panel9-header">
                                                <Typography variant="h6" color="secondary">
                                                    I have some additional information on the variant, the target gene or the genomic region, which will influence the score, but I can’t add it.
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    Indeed, this may be an issue. As we wanted to automate a maximum of 
                                                    features, the tool may not find the latest CHIP-seq results for your 
                                                    region of interest, and therefore, this will not be reflected in the 
                                                    score. To compensate, you can manually modify the score during step 3, 
                                                    and add a comment / remark to explain why you did modify the score.
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
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