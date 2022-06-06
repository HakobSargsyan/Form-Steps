import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material';
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import FormLabel from "@mui/material/FormLabel";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        background: '#FFFFFF',
        margin: '24px',
        '& label': {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '15px',
            lineHeight: '35px',
            color: '#B2BECC',
            marginLeft:'10px'
        },
    }
}));
const names = [
    'Full Stack developer',
    'Node Js developer',
    'Java developer',
    'Ruby developer',
    'Python developer',
    'Senior Backend developer',
    'Senior Frontend developer',
    'Middle Frontend developer',
    'DevOps',
    'Senior Hr Manager',
];

function getStyles(name, personName, theme) {
    return {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '29px',
        color: '#D3D3D3',
    };
}

const themeProvider = createTheme({
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
                    fontSize: '14px',
                    lineHeight: '29px',
                    color: '#D3D3D3',
                },
                notchedOutline: {
                    borderColor: '#1E85FE',
                }
            },
        },
    },
});

const SelectInput = ({name, value, onChange}) => {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <FormControl sx={{ width: 408 }}>
                <ThemeProvider theme={themeProvider}>
                    <FormLabel>Position</FormLabel>
                    <Select
                        multiple
                        displayEmpty
                        value={value}
                        name={name}
                        onChange={onChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em style={getStyles(theme)}>-- Select One --</em>;
                            }

                            return selected.join(', ');
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem disabled value="" style={getStyles(theme)}>
                            <em>-- Select One --</em>
                        </MenuItem>
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </ThemeProvider>
            </FormControl>
        </div>
    );
}

export default SelectInput;

SelectInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func.isRequired,
}

SelectInput.defaultValues = {
    name: '',
    value: [],
}
