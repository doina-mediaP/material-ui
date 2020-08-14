import React, {useState} from 'react'
import Unsplash, {toJson} from 'unsplash-js'
import Image from './Image/Image'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";

require('dotenv').config()
process.env.CI = false

const apiKey = process.env.REACT_APP_UNSPLASH_KEY
const unsplash = new Unsplash({accessKey: apiKey})

const Component = () => {
    const [searchString, setSearchString] = useState('')
    const [images, setImages] = useState([])
    const [isFirstRequest, setIsFirstRequest] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const searchImg = (e) => {
        e.preventDefault()
        setIsLoaded(true)
        unsplash.search
            .photos(searchString, 1, 10, {orientation: 'portrait'})
            .then(toJson)
            .then((json) => {
                setImages(json.results)
                setIsLoaded(false)
            })
        setIsFirstRequest(false)
    }

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'hidden',
                backgroundColor: theme.palette.background.paper,
            },
            searchBox: {
                alignItems: "center"
            },
            noFound: {
                width: '100%',
                height: 'auto',
                display: 'flex',
                justifyContent: 'center'
            }
        }),
    );

    const classes = useStyles();
    return (

        <Box mx="auto" bgcolor="background.paper" p={3}>
            <form onSubmit={searchImg} className="searchForm">
                <Grid container spacing={2} className={classes.searchBox}>
                    <Grid item lg={11} xs={12}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Search..."
                            variant="outlined"
                            className="image-search__input"
                            type="search"
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                    </Grid>

                    <Grid item lg={1} sx={12}>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={searchImg}>
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Box mx="auto" bgcolor="background.paper" pt={5}>
                <Grid container spacing={1}>
                    {images.length > 0 || isFirstRequest ? (
                        images.map((image, index) => {
                            return (
                                <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                                    <Image
                                        src={image.urls.small}
                                        alt={image.alt_description}
                                        key={index}
                                        isLoaded={isLoaded}
                                    />
                                </Grid>
                            )
                        })
                    ) : (
                        <h1 className={classes.noFound}>No images found</h1>
                    )}
                </Grid>
            </Box>

        </Box>
    )
}

export default Component
