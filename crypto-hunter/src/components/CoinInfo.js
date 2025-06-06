import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { chartDays } from '../config/data';
import { CryptoState } from '../CryptoContext';
import { SelectButton } from './SelectButton';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export const CoinInfo = ({coin}) => {
    console.log(coin);
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const [flag,setflag] = useState(false);
    const { currency } = CryptoState();

    const fetchHistoricChart = async () => {
        const { data } = await axios(HistoricalChart(coin.id, days, currency))
        setHistoricData(data.prices);
        setflag(true);
    }

    useEffect(() => {
        fetchHistoricChart()
    }, [currency, days])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    const Container = styled("div")(({ theme }) => ({
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
        },
    }
    ));
   
    return (
            <ThemeProvider theme={darkTheme}>
             <Container>
                {!historicData || !flag ? (
                  <CircularProgress
                    style={{ color: "gold" }}
                    size={250}
                    thickness={1}
                  />
                ) : (
                  <>
                    <Line
                      data={{
                        labels: historicData.map((coin) => {
                          let date = new Date(coin[0]);
                          let time =
                            date.getHours() > 12
                              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                              : `${date.getHours()}:${date.getMinutes()} AM`;
                          return days === 1 ? time : date.toLocaleDateString();
                        }),
        
                        datasets: [
                          {
                            data: historicData.map((coin) => coin[1]),
                            label: `Price ( Past ${days} Days ) in ${currency}`,
                            borderColor: "#EEBC1D",
                          },
                        ],
                      }}
                      options={{
                        elements: {
                          point: {
                            radius: 1,
                          },
                        },
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        marginTop: 20,
                        justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      {chartDays.map((day) => (
                        <SelectButton
                          key={day.value}
                          onClick={() => {setDays(day.value);
                            setflag(false);
                          }}
                          selected={day.value === days}
                        >
                          {day.label}
                        </SelectButton>
                      ))}
                    </div>
                  </>
                )}
             </Container>
            </ThemeProvider>
          );
        };

