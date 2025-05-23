import { TextField, Typography, ThemeProvider, Container, createTheme, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, Pagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './Banner/Carousel';


const CoinsTable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const { currency , symbol} = CryptoState();

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
    }, [currency])

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#fff",
            },
        },
    });

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    }

    const useStyles = makeStyles({
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
                "&:hover": {
                backgroundColor: "#131111",
            },
        },
        pagination: {
            "& .MuiPaginationItem-root": {
              color: "gold",
            },
        },
    })

    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant='h4' style={{ margin: 18 }}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField label="Search for a Crypto Currency.." variant='outlined'
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: "gold" }} />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: "gold" }}>
                                <TableRow>
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                        <TableCell style={{ color: "black", fontWeight: "700" }} key={head} align={head == "Coin" ? "" : "right"}>
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch().slice((page-1)*10,(page-1) * 10 + 10).map(row => {
                                    let profit = row.price_change_percentage_24h >= 0;

                                    return (
                                        <TableRow onClick={() => navigate(`/coins/${row.id}`)}
                                            className={classes.row}
                                            key={row.name}
                                        >
                                            <TableCell component="th" scope='row' style={{ display: 'flex', gap: 15 }}>
                                                <img src={row.image} alt={row.name} height="50" style={{ marginBottom: 10 }} />
                                                <div style={{ display: 'flex', flexDirection: "column" }}>
                                                    <span style={{ textTransform: "uppercase", fontSize: 22 }}>{row.symbol}</span>
                                                    <span style={{ color: "darkgray" }}>{row.name}</span>
                                                </div>
                                            </TableCell>

                                            <TableCell align='right'>
                                                {symbol} {" "}
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                            </TableCell>

                                            <TableCell align='right' style={{ color: profit > 0 ? "green" : "red", fontWeight: 500 }}>
                                                {profit && "+"}
                                                {row.price_change_percentage_24h.toFixed(2)} %
                                            </TableCell>

                                            <TableCell align='right'>
                                                {symbol} {" "}
                                                {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                                            </TableCell>

                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>

                <Pagination classes={{ ul: classes.pagination }} style={{ padding: 20, width: "100%", display: "flex", justifyContent: "center" }} count={(handleSearch()?.length / 10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 459)
                }}
                />

               
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable;