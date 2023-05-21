import React, {ReactNode} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navigator from './Navigator'
import Header from './Header'
import Link from "next/link";
import {NextPage} from "next";


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

let theme = createTheme({
    palette: {
        primary: {
            light: '#63ccff',
            main: '#080B16',
            dark: '#006db3',
        },
        secondary: {
            main: '#34396A'
        }
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
        fontFamily: `'Poppins', sans-serif`,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiTab: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

// theme = {
//     ...theme,
//     components: {
//         MuiDrawer: {
//             styleOverrides: {
//                 paper: {
//                     backgroundColor: '#080B16',
//                 },
//             },
//         },
//         MuiButton: {
//             styleOverrides: {
//                 root: {
//                     textTransform: 'none',
//                 },
//                 contained: {
//                     boxShadow: 'none',
//                     '&:active': {
//                         boxShadow: 'none',
//                     },
//                 },
//             },
//         },
//         MuiTabs: {
//             styleOverrides: {
//                 root: {
//                     marginLeft: theme.spacing(1),
//                 },
//                 indicator: {
//                     height: 3,
//                     borderTopLeftRadius: 3,
//                     borderTopRightRadius: 3,
//                     backgroundColor: theme.palette.common.white,
//                 },
//             },
//         },
//         MuiTab: {
//             styleOverrides: {
//                 root: {
//                     textTransform: 'none',
//                     margin: '0 16px',
//                     minWidth: 0,
//                     padding: 0,
//                     [theme.breakpoints.up('md')]: {
//                         padding: 0,
//                         minWidth: 0,
//                     },
//                 },
//             },
//         },
//         MuiIconButton: {
//             styleOverrides: {
//                 root: {
//                     padding: theme.spacing(1),
//                 },
//             },
//         },
//         MuiTooltip: {
//             styleOverrides: {
//                 tooltip: {
//                     borderRadius: 4,
//                 },
//             },
//         },
//         MuiDivider: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: 'rgb(255,255,255,0.15)',
//                 },
//             },
//         },
//         MuiListItem: {
//             styleOverrides: {
//                 root: {
//                     padding: '0 20px',
//                     marginBottom: 10
//                 }
//             }
//         },
//         MuiListItemButton: {
//             styleOverrides: {
//                 root: {
//                     '&.Mui-selected': {
//                         color: '#4fc3f7',
//                     },
//                     padding: '5px',
//                     borderRadius: '5px'
//                 },
//             },
//         },
//         MuiListItemText: {
//             styleOverrides: {
//                 primary: {
//                     fontSize: 14,
//                     fontWeight: theme.typography.fontWeightMedium,
//                 },
//             },
//         },
//         MuiListItemIcon: {
//             styleOverrides: {
//                 root: {
//                     color: 'inherit',
//                     minWidth: 'auto',
//                     marginRight: theme.spacing(2),
//                     '& svg': {
//                         fontSize: 20,
//                     },
//                 },
//             },
//         },
//         MuiAvatar: {
//             styleOverrides: {
//                 root: {
//                     width: 32,
//                     height: 32,
//                 },
//             },
//         },
//     },
// };

const drawerWidth = 256;

interface DashboardProps {
    children: ReactNode
}

const Dashboard: NextPage<DashboardProps> = ({children}) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };





    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex', minHeight: '100vh'}}>
                <CssBaseline/>
                <Box
                    component="nav"
                    sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                >
                    {isSmUp ? null : (
                        <Navigator
                            PaperProps={{style: {width: drawerWidth}}}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                        />
                    )}
                    <Navigator
                        PaperProps={{style: {width: drawerWidth}}}
                        sx={{display: {sm: 'block', xs: 'none'}}}
                    />
                </Box>
                <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <Header onDrawerToggle={handleDrawerToggle}/>
                    <Box component="main" sx={{flex: 1, py: 6, px: 4, bgcolor: '#eaeff1'}}>
                        {children}
                    </Box>
                    <Box component="footer" sx={{p: 2, bgcolor: '#eaeff1'}}>
                        <Copyright/>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Dashboard
