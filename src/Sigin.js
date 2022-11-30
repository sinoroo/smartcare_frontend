import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles} from '@material-ui/core/styles';
import swal from 'sweetalert';
import { Typography } from '@material-ui/core';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image:{
        backgroundImage:'url(https://i.ytimg.com/vi/kxfeTcty3Do/maxresdefault.jpg)',
        backgroundSize: 'cover',
    },
    paper: {
        margin: theme.spacing( 8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

async function loginUser(credentials){
    const loginbody = {username:credentials[0], password:credentials[1]};
    
    return axios('http://localhost:8080/v1/signin',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: loginbody
    })
    //.then(data => data.json())
    .catch((err) => {
        if( err.response){
            const {status, config} = err.response;

            if(status === 404) {
                console.log(`${config.url} not found`);
            }

            if(status === 500) {
                console.log("Server error");
            }
        } else if (err.request){
            console.log("Error", err.message);
        } else {
            console.log("Error", err.message);
        }

    });
}

export default function Signin(){
    const classes = useStyles();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser([
            username,
            password
        ]);
        
        if( response){
            console.log(response);
            const responseData = response['data'];
            const responseBody = responseData['data'];
            if(responseBody){
                    console.log("Success");
                    localStorage.setItem('username', responseBody['username']);
                    localStorage.setItem('accessToken', responseBody['accessToken']);
                    localStorage.setItem('refreshToken', responseBody['refreshToken']);
                    console.log(localStorage.getItem('username'));
                    console.log(localStorage.getItem('accessToken'));
                    console.log(localStorage.getItem('refreshToken'));
                    window.location.href = "/profile";
            }else{
                swal("Failed", response.msg, "error");
                console.log("Error");
            }
        }
        
    }

    return (
        <Grid container className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} md={7} className={classes.image} />
            <Grid item xs={12} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography compoment="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            name="username"
                            label="User name"
                            onChange={e => setUserName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}






