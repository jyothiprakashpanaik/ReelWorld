import React, { useEffect, useReducer } from 'react';
import { useState, useContext } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
import { useStyles } from "../Styles/styles.js";
import { emailReducer, passwordReducer, userNameReducer, fileReducer } from './utils/Reducer.jsx';
import "../Styles/Signup.css";


export default function SignUp() {

    const classes = useStyles();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formDataIsValid, setFormDataIsValid] = useState(false);
    const [agree, setAgree] = useState(false);

    const navigate = useNavigate();

    const { signup } = useContext(AuthContext);

    const [emailState, emailDispatcher] = useReducer(emailReducer, { value: '', isValid: null, isCheck: null, helperText: '' });
    const [passwordState, passwordDispatcher] = useReducer(passwordReducer, { value: '', isValid: null, isCheck: null, helperText: '' });
    const [userNameState, userNameDispatcher] = useReducer(userNameReducer, { value: '', isValid: null, isCheck: null, helperText: '' });
    const [fileState, fileDispatcher] = useReducer(fileReducer, { value: '' });


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            const userObj = await signup(emailState.value, passwordState.value);
            const uid = userObj.user.uid;

            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(fileState.value);
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
                        email: emailState.value,
                        userId: uid,
                        userName: userNameState.value,
                        profileUrl: url,
                        createdAt: database.getTimeStamp
                    });
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

    const handleEmail = (e) => {
        emailDispatcher({ value: e.target.value.trim(), type: 'EMAIL_INPUT' })
    }

    const validateEmail = (e) => {
        database.users.where("email", "==", emailState.value).get()
            .then((querySnapshot) => {
                emailDispatcher({ count: querySnapshot.size, value: e.target.value.trim(), type: 'EMAIL_CHECK' })
            }).catch((error) => {
                console.log(error);
            });
    }

    const handlePassword = (e) => {
        passwordDispatcher({ value: e.target.value.trim(), type: 'PASSWORD_INPUT' })
    }

    const validatePassword = (e) => {
        passwordDispatcher({ value: e.target.value.trim(), type: 'PASSWORD_VALID' })
    }

    const handleUserName = (e) => {
        userNameDispatcher({ value: e.target.value.trim().toLowerCase(), type: 'USERNAME_INPUT' })
    }

    const validateUserName = (e) => {
        database.users.where("userName", "==", userNameState.value).get()
            .then((querySnapshot) => {
                userNameDispatcher({ count: querySnapshot.size, value: e.target.value.trim(), type: 'USERNAME_CHECK' })
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleFile = (e) => {
        fileDispatcher({ value: e.target.files[0], type: 'FILE_INPUT' })
    }

    const handleAgree = () => {
        setAgree(prev => !prev);
    }

    useEffect(() => {
        let timerId = setTimeout(() => {
            setFormDataIsValid(emailState.isValid && passwordState.isValid && userNameState.isValid && agree)
        }, 500);

        return () => {
            clearTimeout(timerId);
        }
    }, [emailState.isValid, passwordState.isValid, userNameState.isValid, agree]);

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

                        <TextField id="outlined-basic" label="Email" name="email" type="email" margin="dense" fullWidth={true} value={emailState.value} error={emailState.isValid === false} variant="outlined" required helperText={emailState.isValid === false && emailState.helperText} onChange={handleEmail} onBlur={validateEmail} />
                        <TextField id="outlined-basic" label="Password" name="password" type="password" margin="dense" fullWidth={true} variant="outlined" error={passwordState.isValid === false} required value={passwordState.value} helperText={passwordState.isValid === false && passwordState.helperText} onChange={handlePassword} onBlur={validatePassword} />
                        <TextField id="outlined-basic" label="User Name" name="userName" margin="dense" fullWidth={true} variant="outlined" required error={userNameState.isValid === false} helperText={userNameState.isValid === false && userNameState.helperText} value={userNameState.value} onChange={handleUserName} onBlur={validateUserName} />
                        <Button component="label" color="secondary" fullWidth={true} variant='outlined' margin="dense" startIcon={<CloudUploadIcon />}>
                            Upload Profile Image
                            <input name='file' type="file" accept='image/*' onChange={handleFile} hidden />
                        </Button>
                        <span>{!!fileState.value && fileState.value.name}</span>
                        <div className='termsAndConditionsBlock'>
                            <Checkbox
                                inputProps={{ 'aria-label': 'controlled' }}
                                type="checkbox" name="agreed"
                                required
                                value={agree}
                                onChange={handleAgree}
                            />
                            <Typography variant="caption">
                                I Agree all the Terms, Conditions and Cookies policy.
                            </Typography>
                        </div>

                    </CardContent>
                    <CardActions>
                        <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading || !formDataIsValid}>
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
