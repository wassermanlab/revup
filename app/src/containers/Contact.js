import React, {useEffect, useState} from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Container, 
} from '@material-ui/core';
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

    useEffect(() => {
        const sendEmail = async () => {
            //setLoading(True);
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
                console.log("error")
                // TODO: Add error message
            } else {
                const json = await response.json();
                console.log("Success")
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