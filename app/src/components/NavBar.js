import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import {
    AppBar,
    Button,
    IconButton,
    Link,
    Toolbar,
    Typography,
} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default function NavBar(props) {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    <Link href="/home" color="inherit" underline="none">
                        Regulatory Variant Scoring System
                    </Link>
                </Typography>
                <Link href="/about" color="inherit" underline="none">
                    <Button color="inherit">About <InfoIcon/></Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}