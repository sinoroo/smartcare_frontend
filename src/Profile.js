import { makeStyles } from '@material-ui/core';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title:{
        flexGrow: 1,
    },
    larget:{
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));

export default function Profile(){
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open= Boolean(anchorEl);
    const user = localStorage.getItem('username');

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () =>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        window.location.href = "/";
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Profile
                    </Typography>
                    <div>
                        <IconButton onClick={handleMenu} color="inherit">
                            <Avatar src="https://www.w3schools.com/w3images/avatar6.png" />
                        </IconButton>
                        <Menu id="menu-appbar"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Avatar src="https://www.w3schools.com/w3images/avatar6.png" className={classes.large} />
                    <Typography variant="h5">
                        Welcom {user}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}