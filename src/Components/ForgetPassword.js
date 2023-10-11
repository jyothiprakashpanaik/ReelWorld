import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import "./Signup.css";
import insta from "../Assets/instagram-text.png";
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function ForgetPassword() {

    const useStyles = makeStyles({
        text1: {
            color: "grey",
            textAlign: "center"
        },
        card2: {
            height: "6vh",
            marginTop: "2%",
        },
    });

    const classes = useStyles();

    return (
        <div className='signUpWarapper' >
            <div className='signUpCard'>
                <Card variant="outlined">
                    <div className='insta-logo'><img src={insta} alt='instagram-logo'></img></div>
                    <CardContent>
                        <Typography variant="subtitle1" className={classes.text1}>
                        Trouble logging in?
                        </Typography>
                        {true && <Alert severity="error"></Alert>}
                        <TextField id="outlined-basic" label="Email" type="email" margin="dense" fullWidth={true} variant="outlined" />
                        <TextField id="outlined-basic" label="New Password" type="password" margin="dense" fullWidth={true} variant="outlined" />
                    </CardContent>
                    <CardActions>
                        <Button fullWidth variant="contained" color="primary">
                            Reset
                        </Button>
                    </CardActions>
                </Card>
                <Card variant="outlined" className={classes.card2}>
                    <CardContent>
                        <Typography variant="subtitle1" className={classes.text1}>
                            Having an account? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
