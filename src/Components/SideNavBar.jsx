import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import insta from "../Assets/instagram-text.png";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Avatar } from '@mui/material';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { useState } from 'react';
import { database } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../firebase';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect } from 'react';


const allowedTypes = ["video/mp4"]
const drawerWidth = 240;

function SideNavBar(props) {

    const { window } = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const container = window !== undefined ? () => window().document.body : undefined;
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = React.useState();


    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
  

    const handleLogout = async () => {
        await logout();
        navigate(`/login`);
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    }));

    const handleDrawerClose = () => {
        setMobileOpen(false);
    };

    const handleProfile = () => {
        navigate(`/profile/${props.userData.userId}`)
    }

    const handleBannerClick = () => {
        navigate(`/`)
    }

    const handleMyAccount = () => {
        navigate(`/manageaccount`)
    }

    const handleFile = async (e) => {
        const file = e.target.files[0];
        try {
            if (!allowedTypes.includes(file.type)) {
                throw new Error(`File type: ${file.type} not allowed. Allowed file types are ${allowedTypes}`);
            }
            if (!file) {
                throw new Error(`No files selected`);
            }
            if (file.size / (1024 * 1024) > 100) {
                throw new Error(`Input file size: ${file.size / (1024 * 1024)}MB, should be less than 100MB`);
            }
            setError(null);
            setLoading(true);
            const uid = uuidv4();

            const uploadTask = storage.ref(`/posts/${uid}/`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3);

            //################ FIREBASE UPLOAD ######################//
            function fn1(snapshot) {
                console.log("Total File Size", snapshot.totalBytes);
                console.log("Total Transfered", snapshot.bytesTransferred);
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Progress", progress);
            }
            function fn2(error) {
                console.log(error);
                throw new Error(error.message);
            }
            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
                    console.log("URL", url);
                    console.log(props.userData);
                    database.posts.doc(uid).set({
                        likes: [],
                        comments: [],
                        postId: uid,
                        postUrl: url,
                        userId: props.userData.userId,
                        userProfile: props.userData.profileUrl,
                        userName: props.userData.fullname,
                        createdAt: database.getTimeStamp
                    }).then((ref) => {
                        database.users.doc(props.userData.userId).update({
                            postIds: props.userData.postIds ? [...props.userData.postIds, uid] : [uid]
                        }).then(() => {
                            setSuccess("Your video post has been uploaded successfully!");
                            setTimeout(() => {
                                setSuccess('');
                                setLoading(false);
                            }, 5000);

                        }).catch((error) => {
                            throw new Error(error.message);
                        });
                    })
                })
            }
        }
        catch (error) {
            setError(error.message);
            setTimeout(() => {
                setLoading(false);
                setError('');
            }, 5000);
        }
    }

    const drawer = (
        <div>
            <Snackbar open={!success || !error} autoHideDuration={6000}>
                <Alert severity={
                    success ? "success" : error ? "error" : ""
                } sx={{ width: '100%' }}>
                    {success ? success : error ? error : ""}
                </Alert>
            </Snackbar>
            <div>
                <Toolbar >
                    <div className=''>
                        <img src={insta} style={{ height: "5vh", width: "100%", cursor: "pointer" }}></img>
                    </div>
                </Toolbar>
            </div>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleBannerClick}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleProfile}>
                        <ListItemIcon>
                            {/* <AccountCircleIcon /> */}
                            {props.userData ? <Avatar src={props.userData.profileUrl} sx={{ width: 24, height: 24 }} /> : <AccountCircleIcon />}
                        </ListItemIcon>
                        <ListItemText primary={'Profile'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="label" disabled={loading}>
                        <input type='file' accept='video/*' hidden onChange={handleFile} />
                        <ListItemIcon>
                            <MovieCreationIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={'Create'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleMyAccount}>
                        <ListItemIcon>
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary={'ManageAccount'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'LogOut'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );


    return (
        <div>
            <div className='smallToolBar' style={{ width: "3em" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </div>
            <Box sx={{ display: 'flex' }}>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth
                        }
                    }}
                    open
                >
                    {drawer}
                </Drawer>

                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    {drawer}
                </Drawer>
            </Box>
        </div>);
}

export default SideNavBar