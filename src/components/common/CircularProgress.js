import React from 'react';
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import Box from "@mui/material/Box";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    flowNumbers: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginLeft: theme.spacing(12.5),
        marginRight: theme.spacing(15.8),
        borderRadius: '50%',
        '& .CircularProgressbar-text' : {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: '27px',
        }
    }
}));


const CircularProgress = ({progressBarValue, FormTitles, page}) => {
    const classes = useStyles();
    return (
        <Box className={classes.flowNumbers}>
            <CircularProgressbar
                value={progressBarValue()}
                text={`${page} / ${FormTitles.length}`}
                styles={buildStyles({
                    textSize: '22px',
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,
                    textColor: '#000000',
                })}
            />
        </Box>
    )
}

export default CircularProgress;

CircularProgress.propTypes = {
    progressBarValue: PropTypes.func.isRequired,
    FormTitles: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired
}
