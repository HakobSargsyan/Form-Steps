import {FIRST_NAME, LAST_NAME, EMAIL, COMPANY_NAME, BIRTHDAY} from '../../shared/common.utils';
export const validateFields = (formData, setFieldValidations, step) => {
    switch (Number(step)) {
        case 1:
            return validateStep1(formData, setFieldValidations);
        case 2:
            return validateStep2(formData, setFieldValidations);
        case 3:
            return validateStep3(formData, setFieldValidations);
        default:
    }
}

/**
 * Step 1 form validation
 * @param formData
 * @param setFieldValidations
 * @returns {boolean}
 */
const validateStep1 = (formData, setFieldValidations) => {
    let isValid = true;
    if (!formData[FIRST_NAME] || formData[FIRST_NAME] === '') {
        isValid = false;
        updateValidationState(FIRST_NAME, `${FIRST_NAME.charAt(0).toUpperCase() + FIRST_NAME.slice(1)} is required`, setFieldValidations);
    }
    if (!isValidString(formData[FIRST_NAME]) && formData[FIRST_NAME] !== '') {
        isValid = false;
        updateValidationState(FIRST_NAME, `${FIRST_NAME.charAt(0).toUpperCase() + FIRST_NAME.slice(1)} must contain only letters`, setFieldValidations);
    }
    if (!isValidString(formData[LAST_NAME]) && formData[LAST_NAME] !== '') {
        isValid = false;
        updateValidationState(LAST_NAME, `${LAST_NAME.charAt(0).toUpperCase() + LAST_NAME.slice(1)} must contain only letters`,setFieldValidations);
    }
    if (!formData[LAST_NAME] || formData[LAST_NAME] === '') {
        isValid = false;
        updateValidationState(LAST_NAME, `${LAST_NAME.charAt(0).toUpperCase() + LAST_NAME.slice(1)} is required`, setFieldValidations);
    }
    if (!formData[EMAIL] || formData[EMAIL] === '') {
        isValid = false;
        updateValidationState(EMAIL, `${EMAIL.charAt(0).toUpperCase() + EMAIL.slice(1)} is required`,setFieldValidations);
    }else if (!validateEmail(formData[EMAIL]) ) {
        isValid = false;
        updateValidationState(EMAIL, `${EMAIL.charAt(0).toUpperCase() + EMAIL.slice(1)} must be valid ${EMAIL} address`, setFieldValidations);
    }
    return isValid
}

/**
 * Step 2 form validation
 * @param formData
 * @param setFieldValidations
 * @returns {boolean}
 */
const validateStep2 = (formData, setFieldValidations) => {
    let isValid = true;
    if (!formData[BIRTHDAY] || formData[BIRTHDAY] === '') {
        isValid = false;
        updateValidationState(BIRTHDAY, `${BIRTHDAY.charAt(0).toUpperCase() + BIRTHDAY.slice(1)} is required`, setFieldValidations);
    }
    return isValid
}

/**
  Step 3 form validation
 * @param formData
 * @param setFieldValidations
 * @returns {boolean}
 */
const validateStep3 = (formData, setFieldValidations) => {
    let isValid = true;
    if (!formData[COMPANY_NAME] || formData[COMPANY_NAME] === '' || formData[COMPANY_NAME][0] === '') {
        isValid = false;
        updateValidationState(COMPANY_NAME, `${COMPANY_NAME.charAt(0).toUpperCase() + COMPANY_NAME.slice(1)} is required`, setFieldValidations);
    }
    return isValid
}



const updateValidationState = (fieldName, message, setFieldValidations) => {
    setFieldValidations((prevState) => {
        return {
            ...prevState,
            [fieldName] : message
        }
    });
}

export const validateFieldsOnChange = (value, name, setFieldValidations) => {
    if (!value || value === '' || value[0] === '') {
        setFieldValidations((prevState) => {
                return {
                    ...prevState,
                    [name] : `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
                }
            }
        );
    } else if(name === EMAIL && !validateEmail(value)){
        setFieldValidations((prevState) => {
                return {
                    ...prevState,
                    [name] : `${name.charAt(0).toUpperCase() + name.slice(1)} must be valid email address`,
                }
            }
        );
    } else if((name === FIRST_NAME || name === LAST_NAME) && !isValidString(value)){
        setFieldValidations((prevState) => {
                return {
                    ...prevState,
                    [name] : `${name.charAt(0).toUpperCase() + name.slice(1)}  must contain only letters`,
                }
            }
        );
    }else {
        setFieldValidations((prevState) => {
                return {
                    ...prevState,
                    [name] : '',
                }
            }
        );
    }
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const isValidString = (str) => {
    let pattern = /^[A-Za-z]+$/;
    if (str.match(pattern)) {
        return true;
    } else {
        return false;
    }
}
