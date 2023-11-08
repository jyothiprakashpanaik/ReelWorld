import * as React from 'react';
import { useState,useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import "./Signup.css";
import insta from "../Assets/instagram-text.png";
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';

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

    const [email, setEmail] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const {password_reset} = useContext(AuthContext);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleClick = async (e) => {
        try{
            setLoading(true);
            const userObj = await password_reset(email);
            console.log(userObj);
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
                    <div className='insta-logo'><img src={insta} alt='instagram-logo'></img></div>
                    <CardContent>
                        <Typography variant="subtitle1" className={classes.text1}>
                        Trouble logging in?
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" type="email" margin="dense" fullWidth={true} variant="outlined" value={email} onChange={handleEmail} disabled={loading}/>
                    </CardContent>
                    <CardActions>
                        <Button fullWidth variant="contained" color="primary" onClick={handleClick} disabled={loading}>
                            Send Activation link
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
