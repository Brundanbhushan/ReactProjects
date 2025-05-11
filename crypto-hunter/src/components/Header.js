import { ThemeProvider } from "@emotion/react";
import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
    createTheme
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

function Header() {
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState();

    const darkTheme = createTheme({
        palette: {
            mode: "dark", // use `mode` instead of `type` in MUI v5
            primary: {
                main: "#fff",
            },
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography
                            onClick={() => navigate("/")}
                            variant="h6"
                            sx={{
                                flex: 1,
                                color: "gold",
                                fontFamily: "Montserrat",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                        >
                            Crypto Hunter
                        </Typography>
                        <Select
                            variant="outlined"
                            sx={{ width: 100, height: 40, marginRight: 2 }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="INR">INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default Header;
