import { Typography } from '@mui/material';
import { makeStyles} from '@mui/styles';
import { Container } from '@mui/system';
import React from 'react'
import { Carousel } from './Carousel';

const useStyles = makeStyles(() => ({
    banner: {
       backgroundImage: "url(./banner2.jpg)",
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      },
}))

const Banner = () => {
    const classes = useStyles();
  return (
      <div className={classes.banner}>
          <Container className={classes.bannerContent}>
              <div className={classes.tagline}>
              <Typography
                    variant="h2"
                    style={{
                    fontWeight: "bold",
                    marginBottom: 15,
                    fontFamily: "Montserrat",
                    }}
                >
                    Crypto Hunter
                </Typography>
                <Typography
                    variant="subtitle2"
                    style={{
                    color: "darkgrey",
                    textTransform: "capitalize",
                    fontFamily: "Montserrat",
                    }}
                >
                    Get all the Info regarding your favorite Crypto Currency
                </Typography>
              </div>
              <Carousel />
          </Container>
    </div>
  )
}

export default Banner;