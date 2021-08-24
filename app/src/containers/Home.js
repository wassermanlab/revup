import React, {useState} from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Link,
    Typography, 
} from '@material-ui/core';
import clsx from 'clsx';
import theme from '../styles/theme';
import NavBar from '../components/NavBar';
//import getCsrfToken from '../components/csrftoken';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    pageHeader: {
        paddingTop: '8%',
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
    btn: {
        "&:hover": {
            backgroundColor: "#DFA564",
            borderColor: "#DFA564",
            color: theme.palette.text.secondary
        },
    }
    
}));


export default function Home() {
    // TODO: Change this import method!!
    const [open, setOpen] = useState(false);
    const classes = useStyles();


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
                            <Grid container direction="row" justify="center" alignItems="center" alignContent="center" spacing={3}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography className={classes.pageHeader} variant="h2" align="center">
                                            Rev<b>UP</b> 
                                        </Typography>
                                        <Typography variant="h5" align="center" gutterBottom>
                                            A regulatory variant scoring system
                                        </Typography>
                                        <Typography style={{paddingBottom: "5%"}} variant="body1" align="center" gutterBottom>
                                            <Link href="/scoring" color="secondary" underline="none">
                                                <Button variant="outlined" className={classes.btn}>
                                                    Get Started
                                                </Button>
                                            </Link>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={10}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <Typography variant="h4" align="center" color="secondary" gutterBottom>
                                                    What is RevUP?
                                                </Typography>
                                                <Typography variant="body1" align="center" color="textSecondary">
                                                    <b>R</b>egulatory <b>E</b>vidence for <b>V</b>ariants <b>U</b>nderlying <b>P</b>honeotypes is a 
                                                    bioinformatic tool developed to improve clinical interpretation of suspected regulatory 
                                                    genetic variants. While tools already exists for classification of exonic variants based 
                                                    on the ACMG / AMP 2015 guidelines (ex: 
                                                    <Link href="http://wintervar.wglab.org" target="_blank" color="secondary">InterVar-Genetic variants Interpretation by ACMG/AMP 2015 guideline</Link>
                                                    ), RevUP focuses on the interpretation of suspected regulatory 
                                                    variants, based on the classification developed by 
                                                    <Link href="https://doi.org/10.1016/j.tig.2020.04.006" target="_blank" color="secondary">Van der Lee R, 
                                                    Correard S and Wasserman WW in “Deregulated Regulators: Disease-
                                                    Causing cis Variants in Transcription Factor Genes” (Trends in 
                                                    Genetics, 2020)</Link>.
                                                </Typography>
                                                <Typography style={{paddingTop: "2%"}} variant="body1" align="center" gutterBottom>
                                                    <Link href="/about" color="secondary" underline="none">
                                                        <Button variant="outlined" className={classes.btn}>
                                                            Learn more
                                                        </Button>
                                                    </Link>
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                </Grid>
                            </Grid>
                        </Container>
                    </main>
                </ThemeProvider>
            </div>
        </React.Fragment>
    )
}