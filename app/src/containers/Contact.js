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
    FormControl,
    Grid,
    Link,
    MenuItem,
    Select,
    TextField,
    Typography, 
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
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
    }
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
                                                <div style={{padding: "2%"}}>
                                                <Grid container direction="row" justify="center" alignItems="flex-start" alignContent="flex-end" spacing={3}>
                                                    <Alert severity="warning">This page is still under construction, please check back soon to submit feedback or report bugs!</Alert>
                                                    <Grid justify="center" container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h4">
                                                                Contact Us
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid justify="center" container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Divider/>
                                                        </Grid>
                                                    </Grid> 
                                                    <br></br>
                                                    <Grid justify="center" container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="body1" color="textSecondary" paragraph>
                                                                Found a bug? Have a question? Want to offer ideas to include in a future version? Contact us!
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid justify="center" container direction={"row"} spacing={6}>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                id="email"
                                                                label="Email Address"
                                                                helperText="(required)"
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid justify="center" container direction={"row"} spacing={6}>
                                                        <Grid item xs={6}>
                                                            <FormControl fullWidth className={classes.formControl}>
                                                                <Select id="type" variant="outlined">
                                                                    <MenuItem value={"bug"}>Report a bug</MenuItem>
                                                                    <MenuItem value={"question_feedback"}>Ask a question or offer feedback</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid justify="center" container direction={"row"} spacing={6}>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                id="email_body"
                                                                multiline
                                                                rows={8}
                                                                variant="outlined"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid justify="center" container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="body1" color="textSecondary" paragraph>
                                                                Found this work interesting? The Wasserman Lab develops other tools and databases, go and check 
                                                                out <Link href="http://cisreg.ca/" color="secondary">our website</Link>!
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                </div>
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