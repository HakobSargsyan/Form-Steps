import React from 'react';
import Stack from "@mui/material/Stack";
import {createTheme, ThemeProvider} from "@mui/material";
import Button from "@mui/material/Button";
import {ArrowForward} from "@mui/icons-material";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    nextButton: {
        width: theme.spacing(51),
        height: theme.spacing(6.75),
        background: '#1E85FE',
        border: '1px solid #D1D1D1',
        borderRadius: theme.spacing(3.37),
        justifyContent: 'center'
    }
}));

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 28,
                },
            },
        },
    },
});
const NextButton = ({FormTitles, handleNext, page}) => {
    const classes = useStyles();
    return (
        <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
            <ThemeProvider theme={theme}>
                <Button
                    onClick={handleNext}
                    variant="contained"
                    className={classes.nextButton}
                >
                    {page === FormTitles.length ? "Submit" : "Next"}
                    {page !== FormTitles.length  && <ArrowForward /> }
                </Button>
            </ThemeProvider>
        </Stack>
    )
}
export default NextButton;

NextButton.propTypes = {
    FormTitles: PropTypes.array.isRequired,
    handleNext: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
}
