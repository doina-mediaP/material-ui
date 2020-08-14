import React from 'react'
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const Image = ({src, alt, isLoaded}) => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            box: {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }
        }),
    );

    const classes = useStyles();

    return (
        <React.Fragment>
            {isLoaded ? (
                <CircularProgress/>
            ) : (
                <img className={classes.box} src={src} alt={alt}/>
            )}
        </React.Fragment>
    )
}

export default Image


