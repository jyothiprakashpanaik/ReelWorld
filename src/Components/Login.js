import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import image1 from "../Assets/screenshot1.png";
import image2 from "../Assets/screenshot2.png";
import image3 from "../Assets/screenshot4.png";
import insta from "../Assets/instagram-text.png";
import backgroundImage from "../Assets/home-phones.png";
import 'pure-react-carousel/dist/react-carousel.es.css';
import "./Login.css";

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


    const classes = useStyles();

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
                        {true && <Alert severity="error"></Alert>}
                        <TextField id="outlined-basic" label="Email" type="email" margin="dense" fullWidth={true} variant="outlined" />
                        <TextField id="outlined-basic" label="Password" type="password" margin="dense" fullWidth={true} variant="outlined" />
                    </CardContent>
                    <CardActions>
                        <Button fullWidth variant="contained" color="primary">
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
