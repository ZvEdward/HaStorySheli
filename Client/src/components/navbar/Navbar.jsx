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
import { useCredentials } from '../../Context';
import { Checkbox, FormControl, FormControlLabel, Grow, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const pages = ['Home', 'Catalog', 'Donate', 'Money Donation'];
const settings = ['Logout'];
// 'Profile', 

function Navbar() {
    const userData = useCredentials();
    const isConnected = userData.isConnected;
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
        <AppBar position="fixed" sx={{ bgcolor: "#00802D" }}>
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
                        <img src="https://static.wixstatic.com/media/090e02_c365689f2bdd47a584dbe08e77dd8399~mv2.png/v1/crop/x_0,y_115,w_500,h_262/fill/w_123,h_64,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/white%20(1).png" alt="Rak-Lefanek" />
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
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" onClick={() => { (!isConnected && page==='Home' ? alert("Please log in!") : navigate(`/${page}`)), handleCloseNavMenu }}>{page}</Typography>
                                </MenuItem>
                            ))}
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
                        <img src="https://static.wixstatic.com/media/090e02_c365689f2bdd47a584dbe08e77dd8399~mv2.png/v1/crop/x_0,y_115,w_500,h_262/fill/w_123,h_64,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/white%20(1).png" alt="Rak-Lefanek" />
                    </Typography>


                    {/* When in laptop - menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => { (!isConnected && page==='Home' ? alert("Please log in!") : navigate(`/${page}`)), handleCloseNavMenu }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Profile section */}

                    <Box sx={{ flexGrow: 0 }}>
                        {Boolean(isConnected) ? //while logged in!
                            (<>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar>{`${userData.currentUser.firstName.charAt(0)}`}</Avatar>
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
                                    <MenuItem key={settings[0]} onClick={() => { handleCloseUserMenu, setAnchorElUser(null),setAnchorElLogin(null), navigate("/"), userData.logout() }}>
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
                                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                                <InputLabel>User name</InputLabel>
                                                <Input
                                                    id="usernameInput"
                                                    type={'text'}
                                                    onChange={(e) => { setInputUserName(e.target.value) }}
                                                />
                                            </FormControl>
                                        </MenuItem>
                                        
                                        <MenuItem >
                                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                                <InputLabel>Password</InputLabel>
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
                                        <MenuItem>
                                            <FormControlLabel control={
                                                <Checkbox 
                                                checked={staySignedIn}
                                                onChange={(event) => {setStaySignedIn(event.target.checked)}}
                                                sx={{
                                                    color: "#00802D",
                                                    '&.Mui-checked': {
                                                        color: "#00802D",
                                                    },
                                                }}
                                                />} label="Remember me!"
                                            />
                                        </MenuItem>
                                        <MenuItem >
                                            <Button onClick={() => { userData.login({ username: inputUserName, password: inputPassword, staySignedIn }), setAnchorElUser(null),setAnchorElLogin(null) }} 
                                            variant="contained" endIcon={<LoginIcon />} fullWidth sx={{
                                                ':hover': {
                                                    bgcolor: "#37F715",
                                                    color: 'white',
                                                }, bgcolor: "#00802D",
                                            }}
                                            >
                                                Login
                                            </Button>
                                        </MenuItem>
                                        <MenuItem>
                                            <span>Dont have an account? <Link to="/signUp">Sign up!</Link></span>
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




