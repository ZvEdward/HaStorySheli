import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useContext } from 'react';
import Context from "../../Context";
import Modal from "react-modal"
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import CloudinaryProfileButton from "../../components/CloudinaryProfileButton";



const defaultTheme = createTheme();


export default function Signup() {
    const { getRequest, postRequest,activeimg,setactiveimg } = useContext(Context);
    const navigate = useNavigate();
    const createUser = async ({ username, displayName, email, password, profileImg, birthDate, about }) => {
        try {
            const response = await postRequest("/users/signup", { username, displayName, email, password, profileImg, birthDate, about });
            setmodalMessage(response.data.message);
            setUserCreated(true);
            openModal();
        } catch (error) {
            setmodalMessage(error.response.data.message);
            setUserCreated(false);
            openModal();
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('username'),
            displayName: data.get('displayName'),
            email: data.get('email'),
            password: data.get('password'),
            profileImg: data.get('profileImg'),
            birthDate: data.get('birthDate'),
            about: data.get('about'),
        });
        createUser({
            username: data.get('username'),
            displayName: data.get('displayName'),
            email: data.get('email'),
            password: data.get('password'),
            profileImg: activeimg,
            birthDate: data.get('birthDate'),
            about: data.get('about'),
        });
    };

    const [IsModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setmodalMessage] = useState();
    const [userCreated, setUserCreated] = useState(false);

    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width:"30vw",
          direction:"rtl",
        },
      };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if(userCreated){
            navigate("/mainPage");
        }
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', minWidth: '98.9vw' }}
        >
            <Grid item xs={3} mb={5} mt={5}>
                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs" sx={{ direction: "rtl" }}>
                        <CssBaseline />
                        <Modal
                            id="Modal"
                            isOpen={IsModalOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                        >{modalMessage}</Modal>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="username"
                                            required
                                            fullWidth
                                            id="username"
                                            label="שם משתמש"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="displayName"
                                            label="שם תצוגתי"
                                            name="displayName"
                                            autoComplete="displayName"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="כתובת מייל"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="סיסמא"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CloudinaryProfileButton value={{ activeimg, setactiveimg }} />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                id="birthDate"
                                                name="birthDate" />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="about"
                                            label="ספר לנו קצת על עצמך"
                                            name="about"
                                            autoComplete="about"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    הירשם
                                </Button>

                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Grid>
        </Grid >
    );
}