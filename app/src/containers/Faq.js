import React, {useState} from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container,
    Divider,
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
                            <Typography className={classes.pageHeader} variant="h4" align="left" gutterBottom>
                                FAQ/Help
                            </Typography>
                            <Divider />
                            <Typography variant="body1" align="left" gutterBottom>
                                We hope that the website will be intuitive, you can use 
                                the example to score a variant and explore the process. 
                                This page will be completed over time, as users ask us 
                                questions, so feel free to contact us if you encounter 
                                a problem [Link to contact page]. 
                            </Typography>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.pageHeader} variant="h5" align="left" gutterBottom>
                                        What are the different steps?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography  variant="body1"  align="left" gutterBottom>
                                        Step 1 includes questions about the variant.

                                        Step 2 includes questions about the potential target gene and the variant.

                                        Step 3 allows to modify your answers and add comments/remarks.

                                        In step 3, users can modify their answers, as well as add information/remarks. 

                                        For example, the user could add the reference of the paper where they found the 
                                        information for a given evidence.
                                        
                                        Finally, the user will obtain the final score as well as a document providing the details provided.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Container>
                    </main>
                </ThemeProvider>
            </div>
        </React.Fragment>
    )
}