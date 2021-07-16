import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Button,
    Container,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography, 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    greyBackground: {
        backgroundColor: '#F5F5F4',
        padding: '50px',
    },
    paper: {
        width: "100%",
        height: "100%",
        padding: "2%",
    },
    centered: {
        marginRight: "auto",
        marginLeft: "auto"
    },
    grid: {
        padding: "0px",
        marginRight: "auto",
        marginLeft: "auto"
    }
}))

export default function ContactForm(props) {
    const classes = useStyles();
    const [feedbackType, setFeedBackType] = useState("default");
    const [senderError, setSenderError] = useState({
        "error": false,
        "message": "",
    })
    const [recipientError, setRecipientError] = useState({
        "error": false,
        "message": "",
    })
    const [emailBodyError, setEmailBodyError] = useState({
        "error": false,
        "message": "",
    })
    const handleChange = (event) => {
        setFeedBackType(event.target.value);
    }
    const handleNext = () => {
        var isError = false;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Check the sender email is valid and not empty
        if (document.getElementById("email").value === "") {
            setSenderError({...senderError, "error": true, "message": "This field cannot be empty"})
            isError = true;
        } else if (!re.test(document.getElementById("email").value)) {
            setSenderError({...senderError, "error": true, "message": "Please enter a valid email address"})
            isError = true;
        } else {
            setSenderError({...senderError, "error": false, "message": ""})
        }
        // Check the recipient error
        if (feedbackType === "default") {
            setRecipientError({...recipientError, "error": true, "message": "Please select a message type"})
            isError = true;
        } else {
            setRecipientError({...recipientError, "error": false, "message": ""})
        }
        // Check the message is not empty
        if (document.getElementById("email_body").value === "") {
            setEmailBodyError({...emailBodyError, "error": true, "message": "This field cannot be empty"})
            isError = true;
        } else {
            setEmailBodyError({...emailBodyError, "error": false, "message": ""})
        }

        if (isError === false) {
            props.setQuery({
                ...props.query, 
                "respond_to": document.getElementById("email").value,
                "recipient": feedbackType,
                "message": document.getElementById("email_body").value,
                "submit": true,
            });
        }
    }

    return(
        <React.Fragment>
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <form className={classes.root} autoComplete="off">
                        <Grid className={classes.grid} container direction="row" justify="center" alignItems="center" alignContent="flex-end" spacing={3}>
                            <Paper className={classes.paper} elevation={0}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Grid justify="center" container spacing={3}>
                                            <Grid item xs={11}>
                                                <Typography variant="h4">
                                                    Contact Us
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid justify="center" container spacing={3}>
                                            <Grid item xs={11}>
                                                <Divider/>
                                            </Grid>
                                        </Grid> 
                                        <br></br>
                                        <Grid justify="center" container spacing={3}>
                                            <Grid item xs={11}>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    Found a bug? Have a question? Want to offer ideas to include in a future version? Contact us!
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid justify="center" container spacing={3}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    type="email"
                                                    helperText="(required)"
                                                    variant="outlined"
                                                    error={senderError["error"]}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid justify="center" container spacing={3}>
                                            <Grid item xs={6}>
                                                <FormHelperText error>{senderError["message"]}</FormHelperText>
                                            </Grid>
                                        </Grid>
                                        <Grid justify="center" container spacing={3}>
                                            <Grid item xs={6}>
                                                <FormControl fullWidth className={classes.formControl} error={recipientError["error"]}>
                                                    <Select id="type" variant="outlined" value={feedbackType} onChange={(e) => handleChange(e)}>
                                                        <MenuItem value={"default"} disabled>Select a message type</MenuItem>
                                                        <MenuItem value={"bug"}>Report a bug</MenuItem>
                                                        <MenuItem value={"question_feedback"}>Ask a question or offer feedback</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid justify="center" container spacing={3}>
                                            <Grid item xs={6}>
                                                <FormHelperText error>{recipientError["message"]}</FormHelperText>
                                            </Grid>
                                        </Grid>
                                        <Grid justify="center" container spacing={3}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    id="email_body"
                                                    multiline
                                                    rows={8}
                                                    variant="outlined"
                                                    error={emailBodyError["error"]}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid justify="center" container spacing={3}>
                                            <Grid item xs={6}>
                                                <FormHelperText error>{emailBodyError["message"]}</FormHelperText>
                                            </Grid>
                                        </Grid>
                                        <Grid justify="center" container spacing={3}>
                                            <Grid item xs={6}>
                                                <Button variant="contained" color="primary" onClick={handleNext}>
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Grid justify="center" container spacing={3}>
                                            <Grid item xs={11}>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    Found this work interesting? The Wasserman Lab develops other tools and databases, go and check 
                                                    out <Link href="http://cisreg.ca/" color="secondary">our website</Link>!
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </form>
                </Container>
            </div>
        </React.Fragment>
    )
}