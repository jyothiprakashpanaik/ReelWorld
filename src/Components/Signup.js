import * as React from 'react';
import { useState, useContext } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import insta from "../Assets/instagram-text.png";
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./Signup.css";
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../firebase';


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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const navigate = useNavigate();
    const { signup } = useContext(AuthContext);

    const handleEmail = (e) => {
        setEmail(e.target.value.trim());
    }
    const handlePassword = (e) => {
        setPassword(e.target.value.trim());
    }
    const handleName = (e) => {
        setName(e.target.value.trim());
    }
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }
    const handleSubmit = async (e) => {

        try {
            setError('');
            setLoading(true)
            const userObj = await signup(email, password);
            const uid = userObj.user.uid;
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3);

            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Progress",progress);
            }
            function fn2(error) {
                console.log("Error", error);
                setError(error.message);
                setLoading(false);
                setTimeout(() => {
                    setError('');
                }, 5000);
            }
            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log("URL",url);
                    database.users.doc(uid).set({
                        email: email,
                        userId: uid,
                        fullname: name,
                        profileUrl: url,
                        createdAt: database.getTimeStamp()
                    })
                })
                setLoading(false);
                navigate("/");
            }
        }
        catch (error) {
            setError(error.message);
            setLoading(false);
            setTimeout(() => {
                setError('');
            }, 5000);

        }
    }

    return (
        <div className='signUpWarapper' >
            <div className='signUpCard'>
                <Card variant="outlined">
                    <div className='insta-logo'><img src={insta} alt='instagram-logo'></img></div>

                    <CardContent>
                        <Typography variant="subtitle1" className={classes.text1}>
                            Sign up to see trenging photos and reels.
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}

                        <TextField id="outlined-basic" label="Email" type="email" margin="dense" fullWidth={true} variant="outlined" onChange={handleEmail} value={email} required />
                        <TextField id="outlined-basic" label="Password" type="password" margin="dense" fullWidth={true} variant="outlined" onChange={handlePassword} value={password} required />
                        <TextField id="outlined-basic" label="Full Name" margin="dense" fullWidth={true} variant="outlined" onChange={handleName} value={name} required />
                        <Button component="label" color="secondary" fullWidth={true} variant='outlined' margin="dense" startIcon={<CloudUploadIcon />}>
                            Upload Profile Image
                            <input type="file" accept='image/*' onChange={handleFile} hidden />
                        </Button>
                        <span>{file && file.name}</span>
                        <div className='termsAndConditionsBlock'>
                            <Checkbox
                                inputProps={{ 'aria-label': 'controlled' }}
                                required />
                            <Typography variant="caption">
                                I Agree all the Terms, Conditions and Cookies policy.
                            </Typography>
                        </div>

                    </CardContent>
                    <CardActions>
                        <Button fullWidth variant="contained" color="primary" type="submit" onClick={handleSubmit} disabled={loading}>
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

        </div >
    );
}
