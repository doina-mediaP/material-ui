import React, {useState} from 'react'
import Unsplash, {toJson} from 'unsplash-js'
import Image from './Image/Image'
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import './App.scss'

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

    return (

        <Container maxWidth="lg">
            <div className="image-search">
                <form onSubmit={searchImg} className="searchForm">
                    <Grid container spacing={1}>
                            <TextField
                                id="outlined-basic"
                                label="Outlined"
                                variant="outlined"
                                className="image-search__input"
                                type="text"
                                onChange={(e) => setSearchString(e.target.value)}
                            />

                        <Button className="image-search__btn" variant="contained" color="primary" onClick={searchImg}>
                            Search
                        </Button>
                    </Grid>
                </form>


                <Grid container spacing={3} className="image-search__image-list">
                    {images.length > 0 || isFirstRequest ? (
                        images.map((image, index) => {
                            return (
                                <Grid item md={3}>
                                    <Image
                                        src={image.urls.small}
                                        alt={image.alt_description}
                                        ss={index}
                                        key={index}
                                        isLoaded={isLoaded}
                                    />
                                </Grid>
                            )
                        })
                    ) : (
                        <p className="noFound">No images found</p>
                    )}
                </Grid>

            </div>
        </Container>
    )
}

export default Component
