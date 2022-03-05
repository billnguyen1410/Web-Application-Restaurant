import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuUpdateForm from './MenuUpdateForm';
import axios from 'axios';
import { Link, useParams , useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';


const theme = createTheme();

function FunctionUpdateItem() {
    let navigate = useNavigate();
    const [form, setForm] = useState();
    // try to search for URL to take ID of an element
    // const [searchParams, setSearchParams] = useSearchParams();
    // searchParams.get("id");
    // console.log(searchParams.get("id"));
    // const windowUrl = window.location.search;
    // const params = new URLSearchParams(windowUrl);
    // console.log(params['id']);

    const routeParams = useParams();
    // console.log(routeParams.id);
    let handleSubmit = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        const data = new FormData(e.target);
        //eslint-disable-next-line no-console
        const res = await axios.put('http://localhost:4200/menu', {
            _id: data.get('_id'),
            title: data.get('title'),
            category: data.get('category'),
            price: data.get('price'),
            description: data.get('description'),
            image: data.get('image'),
        });
        if(res.data === true){
            return navigate("/admin/menu");
        }
    }
   // query db from backend to display on a form
    useEffect(async () => {
        const updateMenu = await axios.get("http://localhost:4200/admin/menu/update",
            { params: { _id: routeParams.id } })
        setForm(updateMenu.data);
    }, [])
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Update Menu Item
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Update Item
                    </Typography>
                    <React.Fragment>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                            <MenuUpdateForm element={form} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Link to="/admin">
                                    <Button sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 3, ml: 1 }}
                                    type="submit"
                                >
                                    UPDATE
                                </Button>
                            </Box>
                        </Box>
                    </React.Fragment>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default FunctionUpdateItem;