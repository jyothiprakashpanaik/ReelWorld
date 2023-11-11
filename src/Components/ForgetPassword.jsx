import * as React from 'react';
import { useState,useContext, useReducer } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';
import reelworld from "../Assets/ReelWorld.png";
import "../Styles/Signup.css";
import { useStyles } from "../Styles/styles.js";
import { emailReducer } from './utils/Reducer.jsx';

export default function ForgetPassword() {


    const [emailState, emailDispatcher] = useReducer(emailReducer, { value: '', isValid: null, isCheck: null, helperText: '' });
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const {password_reset} = useContext(AuthContext);

    const handleEmail = (e) => {
        emailDispatcher({ value: e.target.value.trim(), type: 'EMAIL_INPUT' })
    }

    const validateEmail = (e) => {
        emailDispatcher({ value: e.target.value.trim(), type: 'EMAIL_VALID' })
    }

    const handleClick = async (e) => {
        try{
            setLoading(true);
            await password_reset(emailState.value);
        }
        catch(error){
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
            setLoading(false);
        }
        
    }

    const classes = useStyles();

    return (
        <div className='signUpWarapper' >
            <div className='signUpCard'>
                <Card variant="outlined">
                    <div className='reelworld-logo'><img src={reelworld} alt='reelworld-logo'></img></div>
                    <CardContent>
                        <Typography variant="subtitle1" className={classes.text1}>
                        Reset your access to stay updated with the latest trends and reels!
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" type="email" margin="dense" fullWidth={true} variant="outlined" value={emailState.value} onChange={handleEmail} onBlur={validateEmail} disabled={loading} error={emailState.isValid===false} helperText={emailState.isValid===false && emailState.helperText}/>
                    </CardContent>
                    <CardActions>
                        <Button fullWidth variant="contained" color="primary" onClick={handleClick} disabled={loading || !emailState.isValid}>
                            Send Activation link
                        </Button>
                    </CardActions>
                </Card>
                <Card variant="outlined" className={classes.card2}>
                    <CardContent>
                        <Typography variant="subtitle2" className={classes.text1}>
                            Having an account? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
