import React, {useState} from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Container,
    Divider,
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


export default function Contact() {
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
                                Contact Us
                            </Typography>
                            <Divider />
                            <Typography  variant="body1"  align="left" gutterBottom>
                                Found a bug? Have a question? Want to offer ideas to include in a future update? Contact us!
                            </Typography>
                            <Typography variant="body1" align="left" gutterBottom>
                                Found this work interesting? The Wasserman lab developed other tools and databases, go and check our website [link to the WWW lab website]!
                            </Typography>
                           
                        </Container>
                    </main>
                </ThemeProvider>
            </div>
        </React.Fragment>
    )
}