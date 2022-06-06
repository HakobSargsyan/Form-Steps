import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
const useStyles = makeStyles(theme => ({
    titleContainer: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: theme.spacing(3),
        lineHeight: '35px',
        textAlign: 'center',
        color: '#555A69',
        width: theme.spacing(30.6),
        height: theme.spacing(8.75),
        margin: '0 auto'

    }
}));

const FormTitle = ({title}) => {
    const classes = useStyles();
    return (
        <p className={classes.titleContainer} dangerouslySetInnerHTML={{__html: title}} />
    )
}
export default FormTitle;

FormTitle.propTypes = {
    title: PropTypes.string.isRequired,
}
