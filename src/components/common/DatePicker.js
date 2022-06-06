import * as React from 'react';
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CalendarPickerSkeleton } from '@mui/x-date-pickers/CalendarPickerSkeleton';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import {makeStyles} from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from '@mui/material';
import FormLabel from "@mui/material/FormLabel";
import {BIRTHDAY} from "../../shared/common.utils";
import PropTypes from "prop-types";

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            const daysInMonth = getDaysInMonth(date);
            const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

            resolve({ daysToHighlight });
        }, 500);

        signal.onabort = () => {
            clearTimeout(timeout);
            reject(new DOMException('aborted', 'AbortError'));
        };
    });
}

const initialValue = new Date();
const useStyles = makeStyles(theme => ({
    wrapper: {
        width: theme.spacing(51),
        height: theme.spacing(6.75),
        '& label' : {
            display: 'block',
            margin: '5px'
        }
    },
    datePickerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'start',
        color: '#FF3D57',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '29px',
        '& > label': {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '15px',
            lineHeight: '35px',
            color: '#B2BECC'
        },
        '& span': {
            margin: '0 auto'
        }
    }
}));

const theme = createTheme({
    components: {
        // Name of the component
        MuiOutlinedInput: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    borderRadius: '27px',
                    background: '#FFFFFF',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '29px',
                    color: '#D1D1D1',
                },
                notchedOutline: {
                    borderColor: '#1E85FE',
                }
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                // Name of the slot
                root: {
                    marginRight: '23.5px'
                },
            },
        }
    },
});

const DatePickerInput = ({setStorageData, storageData, error, setFieldValidations}) => {
    const requestAbortController = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
    const [value, setValue] = React.useState(storageData?.birthday ? storageData?.birthday : initialValue);
    const classes = useStyles();

    /**
     * Fake HighlightedDays on the calendar
     * @param date
     */
    const fetchHighlightedDays = (date) => {
        const controller = new AbortController();
        fakeFetch(date, {
            signal: controller.signal,
        })
            .then(({ daysToHighlight }) => {
                setHighlightedDays(daysToHighlight);
                setIsLoading(false);
            })
            .catch((error) => {
                // ignore the error if it's caused by `controller.abort`
                if (error.name !== 'AbortError') {
                    throw error;
                }
            });

        requestAbortController.current = controller;
    };

    React.useEffect(() => {
        fetchHighlightedDays(initialValue);
        setStorageData({ ...storageData, [BIRTHDAY]: initialValue });
        setFieldValidations({});
        // abort request on unmount
        return () => requestAbortController.current?.abort();
        // eslint-disable-next-line
    }, []);

    /**
     * it will be trigger on the month calendar change
     * @param date
     */
    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
            // make sure that you are aborting useless requests
            // because it is possible to switch between months pretty quickly
            requestAbortController.current.abort();
        }

        setIsLoading(true);
        setHighlightedDays([]);
        fetchHighlightedDays(date);
    };

    return (
        <div className={classes.wrapper}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ThemeProvider theme={theme}>
                    <div className={classes.datePickerWrapper}>
                        <FormLabel>Date of birth</FormLabel>
                        <DatePicker
                            style={{ width: "90%", border: "1px solid black" }}
                            value={value}
                            loading={isLoading}
                            onChange={(newValue) => {
                                setValue(newValue);
                                setStorageData({ ...storageData, [BIRTHDAY]: newValue });
                                setFieldValidations({})
                            }}
                            onMonthChange={handleMonthChange}
                            renderInput={(params) => <TextField sx={{ svg: {color : '#1E85FE'}, width: '408px'}} {...params} />}
                            renderLoading={() => <CalendarPickerSkeleton />}
                            renderDay={(day, _value, DayComponentProps) => {
                                const isSelected =
                                    !DayComponentProps.outsideCurrentMonth &&
                                    highlightedDays.indexOf(day.getDate()) > 0;

                                return (
                                    <Badge
                                        key={day.toString()}
                                        overlap="circular"
                                        badgeContent={isSelected ? '🌚' : undefined}
                                    >
                                        <PickersDay {...DayComponentProps} />
                                    </Badge>
                                );
                            }}
                        />
                        <span>{error}</span>
                    </div>
                </ThemeProvider>
            </LocalizationProvider>
        </div>
    );
}

export default DatePickerInput;

DatePickerInput.propTypes = {
    setStorageData: PropTypes.func.isRequired,
    formData: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        gender: PropTypes.string,
        birthday: PropTypes.string,
        company: PropTypes.string,
        companySelect: PropTypes.array,
        receiveNewsletters: PropTypes.bool,
    })
}

DatePickerInput.defaultValues = {
    error: {},
    name: '',
    value: '',
    placeholder: 'placeholder',
    formData: PropTypes.shape({
        firstName: '',
        lastName: '',
        email: '',
        gender: 'Male',
        birthday: '',
        company: '',
        companySelect: [],
        receiveNewsletters: false,
    })
}
