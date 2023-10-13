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
import image3 from "../Assets/screenshot4.png";
import insta from "../Assets/instagram-text.png";
import backgroundImage from "../Assets/home-phones.png";
import 'pure-react-carousel/dist/react-carousel.es.css';
import "./Login.css";
import { useState, useContext } from "react";
import { AuthContext } from '../Context/AuthContext';


export default function LogIn() {

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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const classes = useStyles();


    const handleEmail = (e) => {
        setEmail(e.target.value.trim());
    }
    const handlePassword = (e) => {
        setPassword(e.target.value.trim());
    }
    const handleSubmit = async (e) => {
        try{
            setError('');
            setLoading(true);
            const userObj = await login(email, password);
            setLoading(false);
            navigate("/");
        }
        catch(error){
            setError(error.message);
            setTimeout(()=>{
                setError("");
            }, 5000);
            setLoading(false);
        }
    }


    return (
        <div className='logInWarapper' >
            <div className='imageCard' style={{ backgroundImage: "url(" + backgroundImage + ")", backgroundSize: 'cover' }}>
                <div className="carouselCard">
                    <CarouselProvider
                        naturalSlideWidth={234}
                        naturalSlideHeight={508}
                        totalSlides={3}
                        isPlaying={true}
                        infinite={true}
                        visibleSlides={1}
                        hasMasterSpinner={true}
                    >
                        <Slider>
                            <Slide index={0}><Image src={image1}/></Slide>
                            <Slide index={1}><Image src={image2}/></Slide>
                            <Slide index={2}><Image src={image3}/></Slide>
                        </Slider>

                    </CarouselProvider>
                </div>
            </div>
            <div className='logInCard'>
                <Card variant="outlined">
                    <div className='insta-logo'><img src={insta} alt='instagram-logo'></img></div>
                    <CardContent>
                        <Typography variant="subtitle1" className={classes.text1}>
                            Login to see trenging photos and reels.
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" type="email" margin="dense" fullWidth={true} variant="outlined" value={email} onChange={handleEmail}/>
                        <TextField id="outlined-basic" label="Password" type="password" margin="dense" fullWidth={true} variant="outlined" value={password} onChange={handlePassword}/>
                    </CardContent>
                    <CardActions>
                        <Button fullWidth variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                            Login
                        </Button>
                    </CardActions>
                    <CardContent className='forgetPassword'>
                        <Typography variant="caption">
                            <Link to="/forgetpassword" style={{ textDecoration: 'none' }}>Forgot password?</Link>
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" className={classes.card2}>
                    <CardContent>
                        <Typography variant="subtitle1" className={classes.text1}>
                            Don't have an account? <Link to="/signup" style={{ textDecoration: 'none' }}>Signup</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
