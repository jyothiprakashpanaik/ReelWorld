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


export default function SignUp() {

    const useStyles = makeStyles({
        text1: {
            color: "grey",
            textAlign: "center"
        },
        card2: {
            height: "6vh",
            marginTop: "2%",
        }
    });

    const classes = useStyles();

    return (
        <div className='signUpWarapper' >
            <div className='signUpCard'>
                <Card variant="outlined">
                    <div className='insta-logo'><img src={insta} alt='instagram-logo'></img></div>
                    <CardContent>
                        <Typography variant="subtitle1" className={classes.text1}>
                            Sign up to see trenging photos and reels.
                        </Typography>
                        {true && <Alert severity="error"></Alert>}
                        <TextField id="outlined-basic" label="Email" type="email" margin="dense" fullWidth={true} variant="outlined" />
                        <TextField id="outlined-basic" label="Password" type="password" margin="dense" fullWidth={true} variant="outlined" />
                        <TextField id="outlined-basic" label="Full Name" margin="dense" fullWidth={true} variant="outlined" />
                        <Button component="label" color="secondary" fullWidth={true} variant='outlined' margin="dense" startIcon={<CloudUploadIcon />}>
                            Upload Profile Image
                            <input type="file" accept='image/*' hidden />
                        </Button>

                        <div className='termsAndConditionsBlock'>
                            <Checkbox
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Typography variant="caption">
                                I Agree all the Terms, Conditions and Cookies policy.
                            </Typography>
                        </div>

                    </CardContent>
                    <CardActions>
                        <Button fullWidth variant="contained" color="primary">
                            SignUp
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
