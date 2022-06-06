import React from 'react';
import RadioButton from "../common/RadioButton";
import {makeStyles} from "@material-ui/core/styles";
import DatePickerInput from "../common/DatePicker";
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from "@mui/material";
import PropTypes from "prop-types";

const themeProvider = createTheme({
    components: {
        // Name of the component
        MuiFormGroup: {
            styleOverrides: {
                // Name of the slot
                root: {
                    justifyContent: 'center',
                    flexDirection: 'row'
                },
            },
        },
    },
});
const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(1.9),
        marginLeft: theme.spacing(10.1),
        '& > label': {
            display: 'block',
            margin: theme.spacing(0.6),
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '15px',
            lineHeight: '35px',
            color: '#B2BECC'
        }
    },
    datePicker: {
      marginBottom: theme.spacing(10.7),
    },
    formGroup: {
        display: 'flex',
        '& div' : {
            marginRight: theme.spacing(3.75),
            marginBottom: theme.spacing(1.25),
        }
    }
}));

const Step2 = ({formData, handleChange, setStorageData, fieldValidations, setFieldValidations}) => {
    const classes = useStyles();
    return (
        <>
            <ThemeProvider theme={themeProvider}>
                <div className={classes.container}>
                    <FormLabel>Gender</FormLabel>
                    <div className={classes.formGroup}>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <RadioButton onChange={handleChange} label='Male' value='Male' name='gender'  />
                            <RadioButton onChange={handleChange} label='Female' value='Female' name='gender' />
                        </RadioGroup>
                    </div>
                    <div className={classes.datePicker}>
                        <DatePickerInput
                            error={fieldValidations.birthday}
                            setStorageData={setStorageData}
                            storageData={formData}
                            value={formData.birthday}
                            setFieldValidations={setFieldValidations}
                            name='birthday'
                        />
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}

export  default Step2;

Step2.propTypes = {
    formData: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        gender: PropTypes.string,
        company: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array
        ]),
        companySelect: PropTypes.array,
        receiveNewsletters: PropTypes.bool,
    }),
    handleChange: PropTypes.func.isRequired,
    setStorageData: PropTypes.func.isRequired,
    setFieldValidations: PropTypes.func.isRequired,
    fieldValidations: PropTypes.object,
}

Step2.defaultValues = {
    formData: PropTypes.shape({
        firstName: '',
        lastName: '',
        email: '',
        gender: 'Male',
        company: [],
        companySelect: [],
        receiveNewsletters: false,
    }),
    fieldValidations: {}
}
