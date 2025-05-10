import { LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinInfo } from '../components/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import parse from 'html-react-parser';
import { numberWithCommas } from '../components/Banner/Carousel';

export const Coinpage = () => {

  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  }

  // console.log(id);

  useEffect(() => {
    fetchCoin();
  }, []);

  /* styles */
  const Container = styled("div")(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));
  
  const Sidebar = styled("div")(({ theme }) => ({
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      borderRight: "none",
    },
  }));
  
  const Heading = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  }));
  
  const Description = styled(Typography)(({ theme }) => ({
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  }));
  
  const MarketData = styled("div")(({ theme }) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }));

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Container>
      <Sidebar>
        <img src={coin?.image.large} height="200" style={{ marginBottom: 20 }} />

         <Heading variant='h3' >
          {coin?.name}
        </Heading>

        <Description variant='subtitle1'>
          {coin?.description?.en && parse(coin.description.en.split(". ")[0])}
        </Description>

        <MarketData>
          <span style={{display: "flex"}}>
            <Typography variant='h5'> Rank: {" "}</Typography> &nbsp; &nbsp;
            <Typography variant='h5'> {coin?.market_cap_rank}</Typography>
          </span>

          <span style={{display: "flex"}}>
            <Typography variant='h5'> Current Price: {" "}</Typography> &nbsp; &nbsp;
            <Typography variant='h5'>
              {symbol} {" "}
              {numberWithCommas(
              coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>

          <span style={{display: "flex"}}>
            <Typography variant='h5'> Market Cap: {" "}</Typography> &nbsp; &nbsp;
            <Typography variant='h5'>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}M
              </Typography>
          </span>
          
        </MarketData>

      </Sidebar>

      {/* Chart */}
      <CoinInfo coin={coin} />

    </Container>
  )
}
