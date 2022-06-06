import * as React from 'react';
import Radio from '@mui/material/Radio';
import {makeStyles} from "@material-ui/core/styles";
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material';
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    wrapper: {
        background: '#FFFFFF',
        border: '1px solid #D1D1D1',
        borderRadius: theme.spacing(3.37),
        width: theme.spacing(23.6),
        height: theme.spacing(6.75),
        '& label' : {
            margin: '5px',
        }
    },
}));

const themeProvider = createTheme({
    components: {
        // Name of the component
        MuiTypography: {
            styleOverrides: {
                // Name of the slot
                root: {
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '29px',
                    color: '#555A69',
                },
            },
        },
    },
});


const RadioButton = ({label, name, value}) => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <ThemeProvider theme={themeProvider}>
                <FormControlLabel
                    sx={{marginLeft: '0px'}}
                    control={<Radio
                        value={value}
                        name={name}
                        inputProps={{ 'aria-label': 'A' }}
                    />}
                    label={label}
                />

            </ThemeProvider>
        </div>
    );
}

export default RadioButton;

RadioButton.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.string,
}

RadioButton.defaultValues = {
    name: '',
    value: false,
}

