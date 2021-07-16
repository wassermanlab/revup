import React, {useEffect, useState} from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Button,
    CircularProgress,
    Container, 
    Dialog,
    DialogContent,
    DialogTitle,
    Link,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import theme from '../styles/theme';
import NavBar from '../components/NavBar';

import {
    defaultEmailDict
} from '../constants'

import ContactForm from '../components/ContactForm';

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
        paddingTop: "10px",
        marginRight: "auto",
        marginLeft: "auto"
    },
    paper: {
        width: "100%",
        height: "100%",
        padding: "2%",
        //backgroundColor: '#EFEFEF',
        
    },
}));


export default function Contact() {
    const config = require("../templates.json");
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(defaultEmailDict);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const sendEmail = async () => {
            setLoading(true);
            const response = await fetch(config.backend_url + 'api/contact_email', {
                method: 'POST',
                body: JSON.stringify(query),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': await getCsrfToken(),
                },
                //credentials: 'include'
            });
            
            if(!response.ok) {
                // TODO: Add error message
                setLoading(false);
                setError(true);
            } else {
                //const json = await response.json();
                setLoading(false);
                setSuccess(true);
            }
        }

        if (query["submit"] === true) {
            sendEmail();
            setQuery({...query, "submit": false});
        }
    }, [query]);

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
                            <Dialog 
                                aria-labelledby="SendingBarDialog" 
                                disableBackdropClick={true} 
                                disableEscapeKeyDown={true} 
                                open={loading}
                                style={{textAlign: "center"}}
                            >
                                <DialogTitle id="SendingBarTitle">Sending...</DialogTitle>
                                <DialogContent>
                                    <CircularProgress/>
                                </DialogContent>
                            </Dialog>
                            <Dialog 
                                aria-labelledby="ErrorDialog" 
                                disableBackdropClick={true} 
                                disableEscapeKeyDown={true} 
                                open={error}
                                style={{textAlign: "center"}}
                            >
                                <DialogTitle id="ErrorTitle">Error</DialogTitle>
                                <DialogContent>
                                    There was an error, please try again!
                                    <br></br>
                                    <br></br>
                                    <Link href="/contact" color="secondary" underline="none">
                                        <Button variant="contained" color="secondary" size="large" startIcon={<CloseIcon />} onClick={() => { setError(false) }}>
                                            Close
                                        </Button>
                                    </Link>
                                </DialogContent>
                            </Dialog>
                            <Dialog 
                                aria-labelledby="SuccessDialog" 
                                disableBackdropClick={true} 
                                disableEscapeKeyDown={true} 
                                open={success}
                                style={{textAlign: "center"}}
                            >
                                <DialogTitle id="SuccessTitle">Message Successfully Sent!</DialogTitle>
                                <DialogContent>
                                    Thank you for your feedback!
                                    <br></br>
                                    <br></br>
                                    <Link href="/contact" color="secondary" underline="none">
                                        <Button variant="contained" color="secondary" size="large" startIcon={<CloseIcon />} onClick={() => { setSuccess(false) }}>
                                            Close 
                                        </Button>
                                    </Link>
                                </DialogContent>
                            </Dialog>
                            <ContactForm
                                query={query}
                                setQuery={setQuery}
                            />
                        </Container>
                    </main>
                </ThemeProvider>
            </div>
        </React.Fragment>
    )
}