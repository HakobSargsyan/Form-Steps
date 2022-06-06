import React from 'react';
import Box from "@mui/material/Box";
import { makeStyles } from '@material-ui/core/styles';
import Link from '@mui/material/Link';
import {COMPANY_NAME, INITIAL_DATA, RECEIVE_NEWSLETTERS, RESET} from "../shared/common.utils";
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate, useParams} from 'react-router-dom';
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import FormTitle from "./FormTitle";
import {validateFields, validateFieldsOnChange} from "./common/Utils";
import useSessionStorage from "../hooks/useSessionStorage";
import NextButton from "./NextButton";
import CircularProgress from "./common/CircularProgress";
import PreviousLink from "./PreviousLink";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#B1C9F9',
        width: '100%',
        height: theme.spacing(135),
    },
    formWrapper:  {
        width: theme.spacing(71.2),
        height: theme.spacing(83.7),
        background: '#FFFFFF',
        boxShadow: `${theme.spacing(1.25)}px ${theme.spacing(1.25)}px ${theme.spacing(11.3)}px rgba(0, 0, 0, 0.13)`,
        borderRadius: theme.spacing(1.25),
    },
    headerContainer: {
        color: '#B2BECC',
        cursor: 'pointer',
        margin: `${theme.spacing(7.5)}px ${theme.spacing(10)}px ${theme.spacing(6.5)}px`,
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: theme.spacing(1.75),
        lineHeight: theme.spacing(2.12),
    },
    resetLink: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: theme.spacing(2.37),
        lineHeight: theme.spacing(3.62),
        color: '#1E85FE'
    }
}));

const FormFlowContainer = () => {
    const classes = useStyles();
    const { step } = useParams();
    const navigate = useNavigate();
    const [storageData, setStorageData] = useSessionStorage('FormData', INITIAL_DATA)
    const [fieldValidations, setFieldValidations] = React.useState({});
    const [page, setPage] = React.useState(Number(step));
    const FormTitles = [
        "Submit your </br> personal Information",
        "Submit your </br> personal Information",
        "Submit your </br> personal Information",
    ];

    React.useEffect(() => {
        if (Number(step) <= 3) {
            navigate(`/flow/${page}`)
        } else {
            navigate(`/404`);
        }
        // eslint-disable-next-line
    }, [page])

    /**
     * global form event listener
     * will trigger on every change of form input
     * @param e
     */
    const formChanged = (e) => {
        let  {name, value} = e.target;

        if (name === COMPANY_NAME) {
            value = typeof value === 'string' ? value.split(',') : value;
        }

        if(name === RECEIVE_NEWSLETTERS) {
            value = e.target.checked;
        }
        // store it to the session storage
        setStorageData({ ...storageData, [name]: value });
        validateFieldsOnChange(value, name, setFieldValidations);
    }

    // HOC is doing filter by page parameter
    const stepToShow = () => {
        if (page === 1) {
            return <Step1
                formData={storageData}
                handleChange={formChanged}
                fieldValidations={fieldValidations}
            />;
        } else if (page === 2) {
            return <Step2
                formData={storageData}
                handleChange={formChanged}
                setStorageData={setStorageData}
                fieldValidations={fieldValidations}
                setFieldValidations={setFieldValidations}
            />;
        } else {
            return <Step3
                formData={storageData}
                handleChange={formChanged}
                fieldValidations={fieldValidations}
            />;
        }
    }

    /**
     * Next button click handler
     */
    const handleNext = () => {
        if (page === FormTitles.length) {
            if (storageData[['step1']] && storageData[['step2']]) {
                console.log(storageData);
            } else {
                // case when you user try to open url step3 without step1|step2
                setPage(1);
                navigate('/flow/1');
                alert('fill first form data')
            }
        } else {
            const isValid = validateFields(storageData, setFieldValidations, page);
            if (isValid) {
                setStorageData({ ...storageData, [`step${page}`]: 'finished' });
                setPage((currPage) => currPage + 1);
            }
        }
    }

    /**
     * Prev button click handler
     */
    const handlePrevious = () => {
        if (page !== 1) {
            setPage((currPage) => currPage - 1);
        }
    }

    /**
     * Reset Link click handler
     * it clear validations, storage
     * navigate to step 1 page
     */
    const handleReset = () => {
        setFieldValidations({});
        setStorageData(INITIAL_DATA)
        setPage(1);
        navigate(`/flow/1`);
    }

    /**
     * Calculate progress bar value
     * @returns {number|number}
     */
    const progressBarValue = () => {
        let value;
        value = page === 1 ? 100 / FormTitles.length : page === FormTitles.length ? 100 :  100 / page;
        return value;
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.formWrapper}>
                <Box className={classes.headerContainer}>
                    <PreviousLink handlePrevious={handlePrevious} page={page} />
                    <CircularProgress
                        progressBarValue={progressBarValue}
                        page={page}
                        FormTitles={FormTitles}
                    />
                    {page === 3 && (<Link
                        component="button"
                        variant="body2"
                        className={classes.resetLink}
                        underline="none"
                        onClick={handleReset}
                    >
                        {RESET}
                    </Link>)}
                </Box>
                <Box>
                    <FormTitle title={FormTitles[page - 1]}/>
                    {stepToShow()}
                    <NextButton
                        FormTitles={ FormTitles }
                        handleNext={ handleNext }
                        page={ page }
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default  FormFlowContainer;
