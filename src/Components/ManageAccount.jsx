import React, { useState, useContext, useEffect } from 'react'
import { CircularProgress } from '@mui/material';
import SideNavBar from './SideNavBar';
import { database, storage } from '../firebase';
import { AuthContext } from '../Context/AuthContext';
import Alert from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function ManageAccount() {
  const [userData, setUserData] = useState();
  const [resetPasswordEmail, setResetPasswordEmail] = useState();
  const [helperRestPassword, setHelperResetPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();

  const { user, password_reset, delete_account } = useContext(AuthContext);

  const [newFullName, setFullName] = useState();
  const [newEmail, setEmail] = useState();
  const [newBio, setBio] = useState();
  const [newProfile, setNewProfile] = useState();


  useEffect(() => {
    console.log("running use effect")
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    })
    return () => { unsub(); }
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (userData.email === resetPasswordEmail) {
      try {
        setLoading(true);
        await password_reset(resetPasswordEmail);
        setSuccess('Reset Password mail set to your inbox');
        setTimeout(() => {
          setSuccess('');
          setResetPasswordEmail('');
        }, 7000);
      }
      catch (error) {
        setError(error.message);
        setTimeout(() => {
          setError('');
        }, 7000);
        setLoading(false);
      }
    }
    else {
      setHelperResetPassword("Email not matched with database please enter the same email");
    }
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    let uid = userData.userId;

    try {
      setLoading(true);

      if (newProfile) {
        const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(newProfile);
        uploadTask.on('state_changed', fn1, fn2, fn3);

        function fn1(snapshot) {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Progress", progress);
        }
        function fn2(error) {
          console.log("Error", error);
          throw new Error(error.message);
        }
        function fn3() {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            database.users.doc(uid).update({
              fullname: newFullName ? newFullName : userData.fullname,
              bio: newBio ? newBio : userData.bio ? userData.bio : "",
              profileUrl: url,
            })
          })
        }
      }
      else{
        database.users.doc(uid).update({
          fullname: newFullName ? newFullName : userData.fullname,
          bio: newBio ? newBio : userData.bio ? userData.bio : "",
        })
      }

      setSuccess('Your Profile Updated Sucessfully');

      // # Handle Posts and comments Data also

      setTimeout(() => {
        setSuccess('');
        setBio('');
        setFullName('');
        setNewProfile();
      }, 7000);
      setLoading(false);

    }
    catch (err) {
      setError(error.message);
      setTimeout(() => {
        setError('');
      }, 7000);
      setLoading(false);
    }
  }

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfile(file);
    }
    else {
      setNewProfile(null);
    }
  }

  return (
    <div>
      {!userData ? <CircularProgress /> :
        <SideNavBar userData={userData} />
      }
      {/* # Resent Password
      # Update UserDetails
      # Delete Account */}
      {userData &&
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
          <div>
            {(error) && <Alert severity="error">{error}</Alert>}
            {(success) && <Alert severity="success">{success}</Alert>}

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="update-userdetails-content"
                id="update-userdetails-header"
              >
                <Typography>Update User Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box component="form"
                  sx={{
                    '& > :not(style)': { m: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleProfileUpdate}
                >

                  <Typography variant="subtitle1" gutterBottom>Full Name</Typography>
                  <TextField value={newFullName ? newFullName : userData.fullname} onChange={(e) => { setFullName(e.target.value) }} label="full name" />

                  <Typography variant="subtitle1" gutterBottom>Email</Typography>
                  <TextField value={newEmail ? newEmail : userData.email} onChange={(e) => { setEmail(e.target.value) }} label="email" disabled={true} />

                  <Typography variant="subtitle1" gutterBottom>Bio</Typography>
                  <TextField value={newBio ? newBio : userData.bio ? userData.bio : ""} onChange={(e) => { setBio(e.target.value) }} multiline maxRows={4} fullWidth label="bio" />

                  <Typography variant="subtitle1" gutterBottom>Profile</Typography>
                  <Button component="label" color="secondary" variant='outlined' margin="dense" startIcon={<CloudUploadIcon />}>
                    Upload Profile Image
                    <input type="file" accept='image/*' onChange={handleFile} hidden />
                  </Button>
                  <span>{newProfile ? newProfile.name : ""}</span>
                  <Button disabled={loading} variant="contained" endIcon={<SendIcon />} type="submit">
                    Send
                  </Button>
                </Box>

              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="reset-password-content"
                id="reset-password-header"
              >
                <Typography>Reset Password</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box component="form"
                  sx={{
                    '& > :not(style)': { m: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleResetPassword}
                >
                  <Typography variant="subtitle1" gutterBottom>Enter email to send the reset password link</Typography>
                  <TextField focused={helperRestPassword} error={helperRestPassword} helperText={helperRestPassword} onChange={(e) => { setResetPasswordEmail(e.target.value); setHelperResetPassword(''); }} value={resetPasswordEmail} id="emailAddr" type="email" label="Email" variant="standard" />
                  <Button disabled={(!loading && !resetPasswordEmail)} variant="contained" endIcon={<SendIcon />} type="submit">
                    Send
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="delete-account-content"
                id="delete-account-header"
              >
                <Typography>Delete Account</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button color="error" variant='contained' onClick={async ()=>{
                  await delete_account();
                }}>Delete Account</Button>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>}
    </div>
  )
}

export default ManageAccount