import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    600: '#0072E5',
};

const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
};

const useStyles = makeStyles(theme => ({
    inputWrapper: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#FF3D57',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '29px',
    },
    input: {
        width: theme.spacing(23.6),
        height: theme.spacing(6.75),
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '29px',
        color: '#555A69',
        border: '1px solid #1E85FE',
        borderRadius: theme.spacing(3.37),
        textIndent: theme.spacing(2.5),
        '&:hover' : {
            borderColor: `${theme.palette.mode === 'dark' ? grey[700] : grey[400]}`
        },
        '&::placeholder': {
            textOverflow: 'ellipsis !important',
            color: 'blue'
        },
        '&:focus': {
            outline: `3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]}`
        }
    },
}));

const Input = ({placeholder, onChange, value, name, error, onFocus}) => {
    const classes = useStyles();
    return (
        <div className={classes.inputWrapper}>
            <input
                onChange={onChange}
                onBlur={onFocus}
                value={value}
                name={name}
                error={error}
                placeholder={placeholder}
                className={classes.input}
                type="text"
            />
            <span>{error}</span>
        </div>
    )
}

export default Input;

Input.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    onFocus: PropTypes.func.isRequired,
}

Input.defaultValues = {
    error: {},
    name: '',
    value: '',
    placeholder: 'placeholder',
}
