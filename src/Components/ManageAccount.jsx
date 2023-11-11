import React, { useState, useContext, useRef } from 'react'
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

function ManageAccount({ userData }) {

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();

  const { password_reset, delete_account } = useContext(AuthContext);

  const imgRef = useRef();


  return (
    <div>
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
                >
                  <TextField variant="standard" name="userName" label="User Name" />
                  <TextField variant="standard" name="userEmail" label="Email" disabled={true} />
                  <TextField variant="standard" name="userBio" multiline maxRows={4} fullWidth label="Bio" />

                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <Button component="label" color="secondary" variant='outlined' margin="dense" startIcon={<CloudUploadIcon />} style={{ margin: "5px" }}>
                      Upload Profile Image
                      <input type="file" name="userProfile" accept='image/*' hidden />
                    </Button>
                    <img style={{ margin: "5px" }} ref={imgRef} width="100px" height="100px" src={""}></img>
                  </div>
                  <Button variant="contained" endIcon={<SendIcon />} type="submit">
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
                >
                  <Typography variant="subtitle1" gutterBottom>Enter email to send the reset password link</Typography>
                  <TextField id="emailAddr" type="email" label="Email" variant="standard" />
                  <Button variant="contained" endIcon={<SendIcon />} type="submit">
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
                <Button color="error" variant='contained'>Delete Account</Button>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>}
    </div>
  )
}
export default ManageAccount