import {ArrowBack} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import {PREVIOUS} from "../shared/common.utils";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    arrowContainer: {
        display: 'flex',
    }
}));

const PreviousLink = ({handlePrevious, page}) => {
    const classes = useStyles();
    return (
        <Box onClick={handlePrevious} className={classes.arrowContainer}>
            <ArrowBack />
            <Link
                disabled={page === 1}
                component="button"
                variant="body2"
                color="#B2BECC"
                underline="none"
            >
                {PREVIOUS}
            </Link>
        </Box>
    )
}
export default PreviousLink;

PreviousLink.propTypes = {
    handlePrevious: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
}
