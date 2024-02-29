import * as React from 'react';
    import AppBar from '@mui/material/AppBar';
    import Box from '@mui/material/Box';
    import Toolbar from '@mui/material/Toolbar';
    import IconButton from '@mui/material/IconButton';
    import Typography from '@mui/material/Typography';
    import Menu from '@mui/material/Menu';
    import MenuIcon from '@mui/icons-material/Menu';
    import Container from '@mui/material/Container';
    import Avatar from '@mui/material/Avatar';
    import Button from '@mui/material/Button';
    import Tooltip from '@mui/material/Tooltip';
    import MenuItem from '@mui/material/MenuItem';
    import LoginIcon from '@mui/icons-material/Login';
    import { useNavigate } from 'react-router';
    import Context from "../../Context";
    import { Checkbox, FormControl, FormControlLabel, Grow, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
    import { Visibility, VisibilityOff } from '@mui/icons-material';
    import { Link } from 'react-router-dom';
    import { useContext } from 'react';
    import { useEffect } from 'react';
    import Logo from "../../images/Logo.png"
    import { useState } from 'react';

    const settings = ['התנתק'];
    // 'Profile', 

    function Navbar() {
        const { getRequest, postRequest,IsModalOpen,setIsModalOpen } = useContext(Context);
        const [user, setUser] = useState(null);
        const [usernameError, setUserNameError] = useState(false);
        const [passwordError, setPasswordError] = useState(false);
        const [loginError, setLoginError] = useState(false);
        useEffect(() => {
            getThisUser();
        }, [activeimg]);

        const getThisUser = async () => {
            try {
                const response = await getRequest("/users/getThisUser");
                console.log(response.data.user);
                setUser(response.data.user);
            } catch (error) {
                console.log(error);
            }
        }

        const loginUser = async (username, password) => {
            try {
                const response = await postRequest("/users/signin", { username, password });
                if (response.status) {
                    console.log("status");
                    console.log(response);
                    setAnchorElUser(null);
                    setAnchorElLogin(null);
                    setLoginError(false);
                    setUserNameError(false);
                    setPasswordError(false);
                    getThisUser();
                    navigate("/mainPage");
                } else {
                    console.log(response);
                    setLoginError(response.response.message)
                }
            } catch (error) {
                setLoginError(error.response.data.message);
                setUserNameError(true);
                setPasswordError(true);
            }
        }

        const logoutUser = async () => {
            try {
                const response = await getRequest("/users/signout");
                getThisUser();
                setUser(null)
            } catch (error) {
                console.log(error);
            }
        }
        // const userData = useCredentials();
        const isConnected = Boolean(user?.username);
        const navigate = useNavigate();
        const [inputUserName, setInputUserName] = React.useState();
        const [inputPassword, setInputPassword] = React.useState();
        const [showPassword, setShowPassword] = React.useState(false);
        const [staySignedIn, setStaySignedIn] = React.useState(true)

        const [anchorElNav, setAnchorElNav] = React.useState(null);
        const [anchorElUser, setAnchorElUser] = React.useState(null);
        const [anchorElLogin, setAnchorElLogin] = React.useState(null);

        const handleClickShowPassword = () => setShowPassword((show) => !show);

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        const handleOpenLoginMenu = (event) => {
            setAnchorElLogin(event.currentTarget);
        };

        const handleOpenNavMenu = (event) => {
            setAnchorElNav(event.currentTarget);
        };

        const handleOpenUserMenu = (event) => {
            setAnchorElUser(event.currentTarget);
        };

        const handleCloseNavMenu = () => {
            setAnchorElNav(null);
        };

        const handleCloseUserMenu = () => {
            setAnchorElUser(null);
        };

        const handleCloseLoginMenu = () => {
            setAnchorElLogin(null);
        };

        return (
          
            <AppBar position="fixed" sx={{ bgcolor: "#2b6292", display: IsModalOpen ? "none" : "block" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>


                        {/* logo */}


                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {/* <img src="https://static.wixstatic.com/media/090e02_c365689f2bdd47a584dbe08e77dd8399~mv2.png/v1/crop/x_0,y_115,w_500,h_262/fill/w_123,h_64,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/white%20(1).png" alt="Rak-Lefanek" /> */}
                            <img src={Logo} alt="HaStorySheli" style={{ width: 200, height: 45 }} />
                        </Typography>

                        {/* logo */}

                        {/* Phone mod menu */}

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                sx={{
                                    mt: '45px',
                                    display: { xs: 'block', md: 'none' }
                                }}
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                            >
                                {isConnected && (
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" onClick={() => { navigate("/homePage"), handleCloseNavMenu }}>בית</Typography>
                                    </MenuItem>
                                )}

                                {isConnected && (
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" onClick={() => { navigate("/profile"), handleCloseNavMenu }}>פרופיל</Typography>
                                    </MenuItem>
                                )}

                                {isConnected && (
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" onClick={() => { navigate("/addBook"), handleCloseNavMenu }}>הוסף ספר</Typography>
                                    </MenuItem>
                                )}
                            </Menu>

                        </Box>

                        {/* Phone mod logo */}

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <img src={Logo} alt="HaStorySheli" style={{ width: 200, height: 45 }} />
                        </Typography>


                        {/* When in laptop - menu */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {/* {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => { (!isConnected && page === 'Home' ? alert("Please log in!") : navigate(/${page})), handleCloseNavMenu }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))} */}
                            {
                                isConnected && (
                                    <Button
                                        onClick={() => { navigate("/mainPage"), handleCloseNavMenu }}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        בית
                                    </Button>
                                )
                            }

                            {
                                isConnected && (
                                    <Button
                                        onClick={() => { navigate("/profile"), handleCloseNavMenu }}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        פרופיל
                                    </Button>
                                )
                            }
                            {
                                isConnected && (
                                    <Button
                                        onClick={() => { navigate("/addBook"), handleCloseNavMenu }}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        הוסף ספר
                                    </Button>
                                )
                            }
                        </Box>

                        {/* Profile section */}

                        <Box sx={{ flexGrow: 0 }}>
                            {Boolean(isConnected) ? //while logged in!
                                (<>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar src={user?.profileImg} alt='https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=' />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {/* Other profile menu options! */}
                                        {/* <MenuItem key={settings[0]} onClick={() => { navigate("/Home"), handleCloseUserMenu }}>
                                            <Typography textAlign="center">{settings[0]}</Typography>
                                        </MenuItem> */}
                                        <MenuItem key={settings[0]} onClick={() => { handleCloseUserMenu, setAnchorElUser(null), setAnchorElLogin(null), navigate("/"), logoutUser() }}>
                                            <Typography textAlign="center">{settings[0]}</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>) : //while logged out!
                                (
                                    <>
                                        <IconButton onClick={handleOpenLoginMenu} aria-label="login">
                                            <LoginIcon sx={{ color: "white" }} fontSize='large' />
                                        </IconButton>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="login-menu"
                                            anchorEl={anchorElLogin}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElLogin)}
                                            onClose={handleCloseLoginMenu}
                                        >

                                            <MenuItem >
                                                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" error={usernameError}>
                                                    <InputLabel sx={{ direction: "rtl" }}>שם משתמש</InputLabel>
                                                    <Input
                                                        id="usernameInput"
                                                        type={'text'}
                                                        onChange={(e) => { setInputUserName(e.target.value) }}
                                                    />
                                                </FormControl>
                                            </MenuItem>

                                            <MenuItem >
                                                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" error={passwordError}>
                                                    <InputLabel>סיסמא</InputLabel>
                                                    <Input
                                                        id="passwordInput"
                                                        type={showPassword ? 'text' : 'password'}
                                                        onChange={(e) => { setInputPassword(e.target.value) }}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                >
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </MenuItem>
                                            {/* <MenuItem>
                                                <FormControlLabel control={
                                                    <Checkbox
                                                        checked={staySignedIn}
                                                        onChange={(event) => { setStaySignedIn(event.target.checked) }}
                                                        sx={{
                                                            color: "#00802D",
                                                            '&.Mui-checked': {
                                                                color: "#00802D",
                                                            },
                                                        }}
                                                    />} label="Remember me!"
                                                />
                                            </MenuItem> */}
                                            <MenuItem sx={{ direction: "rtl", color: "red" }}>
                                                <span>{loginError}</span>
                                            </MenuItem>
                                            <MenuItem >
                                                <Button onClick={() => { loginUser(inputUserName, inputPassword) }}
                                                    variant="contained" endIcon={<LoginIcon />} fullWidth sx={{
                                                        ':hover': {
                                                            bgcolor: "#2b6292",
                                                            color: 'white',
                                                        }, bgcolor: "#2b6292",
                                                    }}
                                                >
                                                    הכנס
                                                </Button>
                                            </MenuItem>
                                            <MenuItem sx={{ direction: "rtl" }}>
                                                <span> עדיין לא רשום? <Link to="/signUp">הירשם כאן</Link></span>
                                            </MenuItem>
                                        </Menu>
                                    </>
                                )}
                        </Box>
                        {/* End of Profile section */}
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }
    export default Navbar;