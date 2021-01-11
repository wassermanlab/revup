import React, {useState} from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Container,
    Divider,
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
                            <Typography className={classes.pageHeader} variant="h4" align="left" gutterBottom>
                                About Regulatory Variant Scoring System
                            </Typography>
                            <Divider />
                            <Typography  variant="body1"  align="left" gutterBottom>
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
                            </Typography>
                            <Typography  variant="body1"  align="left" gutterBottom>
                                The tool gathers information submitted by the user and information 
                                queried online across different external databases, about the genetic 
                                variant, the surrounding genomic region and the suspected target gene 
                                that the variant may regulate. Once all this information is available, 
                                the tool will calculate the RVE-score as developed by Van der Lee R, 
                                Correard S and Wasserman WW in “Deregulated Regulators: Disease-Causing 
                                cis Variants in Transcription Factor Genes” (Trends in Genetics, 2020).
                            </Typography>
                            <Typography  variant="body1"  align="left" gutterBottom>
                                To know the list of external databases that the tool is querying and 
                                the scoring system associated, refer to Table 1 [Link to Table 1].
                            </Typography>
                            <Divider />
                            <Typography variant="h5" align="left" gutterBottom>
                                Disclaimer/Future Versions
                            </Typography>
                            <Typography variant="body1" align="left" gutterBottom>
                                To date, the tool only allow the scoring of non-coding SNV (Single nucleotide 
                                variants), to obtain the score of a structural variant, user should refer to 
                                the tables in Van der Lee R, Correard S and Wasserman WW in “Deregulated 
                                Regulators: Disease-Causing cis Variants in Transcription Factor Genes” 
                                (Trends in Genetics, 2020)
                            </Typography>
                            <Typography  variant="body1"  align="left" gutterBottom>
                                To date, the tool only allow to classify variants located on the autosomes, 
                                to obtain the score for a variant located on a sexual variant, user should refer 
                                to the tables in Van der Lee R, Correard S and Wasserman WW in “Deregulated 
                                Regulators: Disease-Causing cis Variants in Transcription Factor Genes” (Trends 
                                in Genetics, 2020)
                            </Typography>
                            <Typography  variant="body1"  align="left" gutterBottom>
                                To date, the tool do not allow to score compound heterozygous variants in a 
                                combined fashion. Users should score both variants separately and then combine the 
                                results in a critical manner, as features may not be additive, and scores are not 
                                additives. 
                            </Typography>
                            <Divider/>
                            <Typography variant="h5" align="left" gutterBottom>
                                References
                            </Typography>
                            <Typography variant="body1" align="left" gutterBottom>
                                If you used this website to score a variant, and / or want to include the final 
                                figure in your paper, please cite both :
                            </Typography>
                            <Typography  variant="body1"  align="left" gutterBottom>
                                Van der Lee R, Correard S and Wasserman WW in “Deregulated Regulators: Disease-Causing cis Variants in Transcription Factor Genes” (Trends in Genetics, 2020)
                                [Add ref of website paper when published]
                            </Typography>
                        </Container>
                    </main>
                </ThemeProvider>
            </div>
        </React.Fragment>
    )
}