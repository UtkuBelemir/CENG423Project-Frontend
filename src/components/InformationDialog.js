import React from "react";
import {connect} from "react-redux"
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import ColorfulButton from "./ColorfulButton";
import {getData} from "../reduxUtils/actions";

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
}

class InformationDialog extends React.Component {
    constructor(props) {
        super(props);
        this.props.getData({
            name: "advertisementOwner-" + this.props.recordID,
            endPoint: "advertisement/owner/" + this.props.owner
        })
    }

    render() {
        const {email, first_name, last_name} = this.props.userDetail
        return (
            <Dialog
                open={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.props.onClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-slide-title">Contact Information of Owner</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <b>E-mail: </b> <span>{email}</span>
                        <br/>
                        <b>First Name: </b> <span>{first_name}</span>
                        <br/>
                        <b>Last Name: </b> <span>{last_name}</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ColorfulButton onClick={this.props.onClose} color="primary" variant="contained">
                        Close
                    </ColorfulButton>
                </DialogActions>
            </Dialog>
        )
    }
}

export default connect((state, ownProps) => {
    return {
        userDetail: (state && state.dataOps && state.dataOps["advertisementOwner-" + ownProps.recordID] && state.dataOps["advertisementOwner-" + ownProps.recordID].data) || {}
    }
}, {getData})(InformationDialog);