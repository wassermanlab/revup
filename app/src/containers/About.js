import React, {useState} from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    pageHeader: {
        paddingTop: '50px',
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
}));


export default function About() {
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
                                                <Typography variant="h4">
                                                    About RevUP
                                                </Typography>
                                                <Divider />
                                                <br></br>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    This bioinformatic tool was developed to improve clinical 
                                                    interpretation of suspected regulatory genetic variants. While 
                                                    tools already exists for classification of exonic variants based 
                                                    on the ACMG / AMP 2015 guidelines (ex: 
                                                    <Link href="http://wintervar.wglab.org" color="secondary">InterVar-Genetic variants Interpretation by ACMG/AMP 2015 guideline</Link>
                                                    ), RevUP focuses on the interpretation of suspected regulatory 
                                                    variants, based on the classification developed by Van der Lee R, 
                                                    Correard S and Wasserman WW in “Deregulated Regulators: Disease-
                                                    Causing cis Variants in Transcription Factor Genes” (Trends in 
                                                    Genetics, 2020).
                                                </Typography>
                                                <Typography  variant="body1"  color="textSecondary" paragraph>
                                                    The tool gathers information submitted by the user and information 
                                                    queried online across different external databases, about the genetic 
                                                    variant, the surrounding genomic region and the suspected target gene 
                                                    that the variant may regulate. Once all this information is available, 
                                                    the tool will calculate the RVE-score as developed by Van der Lee R, 
                                                    Correard S and Wasserman WW in “Deregulated Regulators: Disease-Causing 
                                                    cis Variants in Transcription Factor Genes” (Trends in Genetics, 2020).
                                                </Typography>
                                                <Typography  variant="body1"  color="textSecondary">
                                                    To know the list of external databases that the tool is querying and 
                                                    the scoring system associated, refer to Table 1 on our <Link href="/faq" color="secondary">FAQ page</Link>.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <Typography variant="h4">
                                                    Disclaimer/Future Versions
                                                </Typography>
                                                <Divider />
                                                <br></br>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    To date, the tool only allow the scoring of non-coding SNV (Single nucleotide 
                                                    variants), to obtain the score of a structural variant, user should refer to 
                                                    the tables in Van der Lee R, Correard S and Wasserman WW in “Deregulated 
                                                    Regulators: Disease-Causing cis Variants in Transcription Factor Genes” 
                                                    (Trends in Genetics, 2020)
                                                </Typography>
                                                <Typography  variant="body1"  color="textSecondary" paragraph>
                                                    To date, the tool only allow to classify variants located on the autosomes, 
                                                    to obtain the score for a variant located on a sexual variant, user should refer 
                                                    to the tables in Van der Lee R, Correard S and Wasserman WW in “Deregulated 
                                                    Regulators: Disease-Causing cis Variants in Transcription Factor Genes” (Trends 
                                                    in Genetics, 2020)
                                                </Typography>
                                                <Typography  variant="body1"  color="textSecondary">
                                                    To date, the tool do not allow to score compound heterozygous variants in a 
                                                    combined fashion. Users should score both variants separately and then combine the 
                                                    results in a critical manner, as features may not be additive, and scores are not 
                                                    additives. 
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <Typography variant="h4">
                                                    References
                                                </Typography>
                                                <Divider />
                                                <br></br>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    If you used this website to score a variant, and / or want to include the final 
                                                    figure in your paper, please cite both :
                                                </Typography>
                                                <Typography  variant="body1"  color="textSecondary">
                                                    Van der Lee R, Correard S and Wasserman WW in “Deregulated Regulators: Disease-Causing cis Variants in Transcription Factor Genes” (Trends in Genetics, 2020)
                                                    {/* TODO: Add link to webpage ref when published */}
                                                </Typography>
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