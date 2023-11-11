import React, { useEffect } from 'react';
import { useState, useContext } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import reelworld from "../Assets/ReelWorld.png";
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../firebase';
import "../Styles/Signup.css";

export default function SignUp() {

    const useStyles = makeStyles({
        text1: {
            color: "grey",
            textAlign: "center"
        },
        card2: {
            marginTop: "2%",
        }
    });

    const classes = useStyles();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userName: '',
        file: null,
        agreed: false,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState({
        isEmailValid: true,
        isPasswordValid: true,
        isAgreed: true,
        isUserNameValid: true
    });

    const navigate = useNavigate();

    const { signup } = useContext(AuthContext);


    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
        setFormData({ ...formData, [name]: val });
    }

    const validateFormData = (email, password, userName, agreed) => {
        const isEmailValid = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);
        const isPasswordValid = !password.includes(' ') && password.length >= 8;
        const isAgreed = agreed;
        const isUserNameValid = !userName.includes(' ') && userName.length >= 3;

        setIsFormValid({
            isEmailValid: isEmailValid,
            isPasswordValid: isPasswordValid,
            isAgreed: isAgreed,
            isUserNameValid: isUserNameValid
        });
        return (isEmailValid && isPasswordValid && isAgreed && isUserNameValid);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password, userName, agreed, file } = formData;

        if (!validateFormData(email, password, userName, agreed)) {
            return;
        }

        try {
            setError('');
            setLoading(true)
            const userObj = await signup(email, password);
            const uid = userObj.user.uid;
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3);

            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Progress", progress);
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
                    console.log("URL", url);
                    database.users.doc(uid).set({
                        email: email,
                        userId: uid,
                        fullname: userName,
                        profileUrl: url,
                        createdAt: database.getTimeStamp
                    })
                });
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
                <Card variant="outlined" component="form" method='POST' onSubmit={handleSubmit}>
                    <div className='reelworld-logo'><img src={reelworld} alt='reelworld-logo'></img></div>

                    <CardContent>
                        <Typography variant="subtitle1" className={classes.text1}>
                            Join us to discover the newest trends and reels.
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}

                        <TextField id="outlined-basic" label="Email" name="email" type="email" margin="dense" fullWidth={true} variant="outlined" onChange={handleInputChange} value={formData.email} required error={!isFormValid.isEmailValid} />
                        <TextField id="outlined-basic" label="Password" name="password" type="password" margin="dense" fullWidth={true} variant="outlined" onChange={handleInputChange} value={formData.password} required error={!isFormValid.isPasswordValid} helperText={!isFormValid.isPasswordValid && "Password legnth should be greater than or equal to 8"} />
                        <TextField id="outlined-basic" label="User Name" name="userName" margin="dense" fullWidth={true} variant="outlined" onChange={handleInputChange} value={formData.userName} required error={!isFormValid.isUserNameValid} helperText={!isFormValid.isUserNameValid && "username legnth should be greater than or equal to 3"} />
                        <Button component="label" color="secondary" fullWidth={true} variant='outlined' margin="dense" startIcon={<CloudUploadIcon />}>
                            Upload Profile Image
                            <input name='file' type="file" accept='image/*' onChange={handleInputChange} hidden />
                        </Button>
                        <span>{!!formData.file && formData.file.name}</span>
                        <div className='termsAndConditionsBlock'>
                            <Checkbox
                                inputProps={{ 'aria-label': 'controlled' }}
                                type="checkbox" name="agreed"
                                onChange={handleInputChange}
                                required
                                error={!isFormValid.isAgreed}
                            />
                            <Typography variant="caption">
                                I Agree all the Terms, Conditions and Cookies policy.
                            </Typography>
                        </div>

                    </CardContent>
                    <CardActions>
                        <Button fullWidth variant="contained" color="primary" type="submit" disabled={!isFormValid || loading}>
                            SignUp
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
        </div >
    );
}
