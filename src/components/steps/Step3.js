import React from 'react';
import FullWidthInput from "../common/FullWidthInput";
import {makeStyles} from "@material-ui/core/styles";
import SelectInput from "../common/SelectInput";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {COMPANY_NAME,RECEIVE_NEWSLETTERS} from "../../shared/common.utils";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(5.87),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& input::placeholder': {
            color: '#D3D3D3'
        }
    },
    checkboxWrapper: {
        marginBottom: theme.spacing(3.6),
        marginRight: theme.spacing(25),
        textAlign: 'start',
    }
}));

const Step3 = ({formData, handleChange, fieldValidations}) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <FullWidthInput
                type="text"
                error={fieldValidations[COMPANY_NAME]}
                name={COMPANY_NAME}
                value={formData.company}
                placeholder='Company Name'
                onChange={handleChange}
                onBlur={handleChange}
            />
            <SelectInput name='companySelect' value={formData.companySelect} onChange={handleChange} />
            <div className={classes.checkboxWrapper}>
                <FormControlLabel control={
                    <Checkbox
                        onChange={handleChange}
                        name={RECEIVE_NEWSLETTERS}
                        checked={Boolean(formData.receiveNewsletters)}
                    />} label="Receive Newsletters"
                />
            </div>
        </div>
    )
}

export  default Step3;

Step3.propTypes = {
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
    fieldValidations: PropTypes.object,
}

Step3.defaultValues = {
    fieldValidations: {},
    formData: PropTypes.shape({
        firstName: '',
        lastName: '',
        email: '',
        gender: 'Male',
        company: [],
        companySelect: [],
        receiveNewsletters: false,
    })
}

