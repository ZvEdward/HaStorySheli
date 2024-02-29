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
import { useEffect } from 'react';





const defaultTheme = createTheme();


export default function Profile() {

    const { getRequest, postRequest } = useContext(Context);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getThisUser();
    }, []);

    const getThisUser = async () => {
        try {
            const response = await getRequest("/users/getThisUser");
            console.log(response.data.user);
            setUser(response.data.user);
        } catch (error) {
            console.log(error);
        }
    }




    const navigate = useNavigate();
    const updateUser = async ({ username, displayName, email, password, profileImg, birthDate, about }) => {
        try {
            const response = await postRequest("/users/updateThisUser", { username, displayName, email, password, profileImg, birthDate, about });
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
        updateUser({
            username: data.get('username'),
            displayName: data.get('displayName'),
            email: data.get('email'),
            password: data.get('password'),
            profileImg: data.get('profileImg'),
            birthDate: data.get('birthDate'),
            about: data.get('about'),
        });
    };

    // const [about, setAbout] = useState(user.about);

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
            width: "30vw",
            direction: "rtl",
        },
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (userCreated) {
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
                            <Avatar sx={{
                                width: 100,
                                height: 100,
                                mb: 1.5,
                            }} src={user?.profileImg} alt='https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=' />
                            <Typography component="h1" variant="h5">
                                {user?.displayName ? user.displayName : user?.username}
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            defaultValue={user?.username}
                                            name="username"
                                            fullWidth
                                            id="username"
                                            // label="שם משתמש"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            defaultValue={user?.displayName}
                                            id="displayName"
                                            label="שם תצוגתי"
                                            name="displayName"
                                            autoComplete="displayName"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            defaultValue={user?.email}
                                            fullWidth
                                            id="email"
                                            label="כתובת מייל"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            defaultValue={user?.about}
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
                                    עדכן
                                </Button>

                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Grid>
        </Grid >
    );
}