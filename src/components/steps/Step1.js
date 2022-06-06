import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Input from "../common/Input";
import FullWidthInput from "../common/FullWidthInput";
import {FIRST_NAME, LAST_NAME, EMAIL} from "../../shared/common.utils";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        margin: theme.spacing(6.12),

        '& input::placeholder': {
            color: '#D3D3D3'
        },
        '& > div:last-child': {
            paddingTop: theme.spacing(5),
        }
    },
}));


const Step1 = ({formData, handleChange, fieldValidations}) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Input name={FIRST_NAME}
               value={formData.firstName}
               placeholder='FirstName'
               onChange={handleChange}
               onFocus={handleChange}
               error={fieldValidations.firstName}
            />
            <Input name={LAST_NAME}
               value={formData.lastName}
               placeholder='LastName'
               onChange={handleChange}
               onFocus={handleChange}
               error={fieldValidations.lastName}
            />
            <FullWidthInput
                type="email"
                error={fieldValidations.email}
                name={EMAIL}
                value={formData.email}
                placeholder='Email'
                onChange={handleChange}
                onBlur={handleChange}
            />
        </div>
    )
}

export  default Step1;

Step1.propTypes = {
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

Step1.defaultValues = {
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
