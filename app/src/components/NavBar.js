import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@material-ui/core'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
        display: 'flex'
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        background: 'transparent',
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
}));


export default function NavBar(props) {
    const classes = useStyles();

    const handleDrawerOpen = () => {
        props.setOpen(true);
    };

    const handleDrawerClose = () => {
        props.setOpen(false);
    };

    return (
        <div className={classes.root}>
            <AppBar 
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: props.open,
                })}
            >
                <Toolbar>
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, props.open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    <Link href="/home" color="inherit" underline="none">
                        Regulatory Variant Scoring System
                    </Link>
                </Typography>
                {/* 
                <Link href="/about" color="inherit" underline="none">
                    <Button color="inherit">About <InfoIcon/></Button>
                </Link>
                */}
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={props.open}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
                </div>
                <Divider />
                <List>
                    <Link href="/home" color="inherit" underline="none">
                        <ListItem button key="home">
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItem>
                    </Link>
                    <Link href="/about" color="inherit" underline="none">
                        <ListItem button key="about">
                            <ListItemIcon><InfoIcon /></ListItemIcon>
                            <ListItemText primary="About"/>
                        </ListItem>
                    </Link>
                    <Link href="/faq" color="inherit" underline="none">
                        <ListItem button key="faq">
                            <ListItemIcon><LiveHelpIcon /></ListItemIcon>
                                <ListItemText primary="FAQ"/>
                        </ListItem>
                    </Link>
                    <Link href="/contact" color="inherit" underline="none">
                        <ListItem button key="contact">
                            <ListItemIcon><PhoneIcon /></ListItemIcon>
                                <ListItemText primary="Contact Us"/>
                        </ListItem>
                    </Link>
                </List>
                <Divider />
            </Drawer>
        </div>
    )
}