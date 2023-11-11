import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from "react-router-dom";
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import image1 from "../Assets/screenshot1.png";
import image2 from "../Assets/screenshot2.png";
import image3 from "../Assets/screenshot3.png";
import image4 from "../Assets/screenshot4.png";
import reelworld from "../Assets/ReelWorld.png";
import backgroundImage from "../Assets/home-phones.png";
import 'pure-react-carousel/dist/react-carousel.es.css';
import "../Styles/Login.css";
import { useState, useContext, useReducer, useEffect } from "react";
import { AuthContext } from '../Context/AuthContext';
import { useStyles } from "../Styles/styles.js";
import { emailReducer, passwordReducer } from './utils/Reducer.jsx';

export default function LogIn() {

    const [emailState, emailDispatcher] = useReducer(emailReducer, { value: '', isValid: null, isCheck: null, helperText: '' });
    const [passwordState, passwordDispatcher] = useReducer(passwordReducer, { value: '', isValid: null, isCheck: null, helperText: '' });
    const [formDataIsValid, setFormDataIsValid] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const classes = useStyles();

    const handleEmail = (e) => {
        emailDispatcher({ value: e.target.value.trim(), type: 'EMAIL_INPUT' })
    }

    const validateEmail = (e) => {
        emailDispatcher({ value: e.target.value.trim(), type: 'EMAIL_VALID' })
    }

    const handlePassword = (e) => {
        passwordDispatcher({ value: e.target.value.trim(), type: 'PASSWORD_INPUT' })
    }

    const validatePassword = (e) => {
        passwordDispatcher({ value: e.target.value.trim(), type: 'PASSWORD_VALID' })
    }

    const handleSubmit = async (e) => {
        try {
            setError('');
            setLoading(true);
            const userObj = await login(emailState.value, passwordState.value);
            setLoading(false);
            navigate("/");
        }
        catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError("");
            }, 5000);
            setLoading(false);
        }
    }

    useEffect(() => {
        let timerId = setTimeout(() => {
            setFormDataIsValid(emailState.isValid && passwordState.isValid)
        }, 500);

        return () => {
            clearTimeout(timerId);
        }
    }, [emailState.isValid, passwordState.isValid])


    return (
        <div className='logInWarapper' >
            <div className='imageCard' style={{ backgroundImage: "url(" + backgroundImage + ")", backgroundSize: 'cover' }}>
                <div className="carouselCard">
                    <CarouselProvider
                        naturalSlideWidth={234}
                        naturalSlideHeight={508}
                        totalSlides={4}
                        isPlaying={true}
                        infinite={true}
                        visibleSlides={1}
                        hasMasterSpinner={true}
                    >
                        <Slider>
                            <Slide index={0}><Image src={image1} /></Slide>
                            <Slide index={1}><Image src={image2} /></Slide>
                            <Slide index={2}><Image src={image3} /></Slide>
                            <Slide index={3}><Image src={image4} /></Slide>
                        </Slider>

                    </CarouselProvider>
                </div>
            </div>
            <div className='logInCard'>
                <Card variant="outlined">
                    <div className='reelworld-logo'><img src={reelworld} alt='reelworld-logo'></img></div>
                    <CardContent>
                        <Typography variant="subtitle1" className={classes.text1}>
                            Explore the latest trends and reels by logging in.
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" type="email" margin="dense" fullWidth={true} variant="outlined" value={emailState.value} onChange={handleEmail} onBlur={validateEmail} error={emailState.isValid===false} helperText={emailState.isValid===false && emailState.helperText} />
                        <TextField id="outlined-basic" label="Password" type="password" margin="dense" fullWidth={true} variant="outlined" value={passwordState.value} onChange={handlePassword} onBlur={validatePassword} error={passwordState.isValid===false} helperText={passwordState.isValid===false && passwordState.helperText}/>
                    </CardContent>
                    <CardActions>
                        <Button fullWidth variant="contained" color="primary" onClick={handleSubmit} disabled={loading || !formDataIsValid}>
                            Login
                        </Button>
                    </CardActions>
                    <CardContent className='forgetPassword'>
                        <Typography variant="subtitle2">
                            <Link to="/forgetpassword" style={{ textDecoration: 'none' }}>Forgot password?</Link>
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" className={classes.card2}>
                    <CardContent>
                        <Typography variant="subtitle2" className={classes.text1}>
                            Don't have an account? <Link to="/signup" style={{ textDecoration: 'none' }}>Signup</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
