import React from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Container,
    Typography, 
} from '@material-ui/core';

import theme from '../styles/theme';
import NavBar from '../components/NavBar';


const useStyles = makeStyles((theme) => ({
        pageHeader: {
            paddingTop: '50px',
        },
}));


export default function Results() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <NavBar/>
                { /*  TODO: Insert logo image here */ }
                <Container maxWidth="lg">
                    <Typography className={classes.pageHeader} variant="h2" align="center" gutterBottom>
                        Results Page
                    </Typography>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    )
}