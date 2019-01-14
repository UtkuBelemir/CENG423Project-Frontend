import React from "react";
import {connect} from "react-redux"
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import ColorfulButton from "./ColorfulButton";
import {deleteData} from "../reduxUtils/actions";

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
}

class DeleteDialog extends React.Component {
    handleDelete = () => {
            this.props.deleteData({
                endPoint : "advertisement/"+this.props.recordID,
                notifications : {
                    success : true,
                    error : true,
                },
                onSuccess : () => {
                    this.props.onClose()
                    this.props.onSuccess();
                },
                onError : this.props.onClose
            })
    }

    render() {
        return (
            <Dialog
                open={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.props.onClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Do you really want to delete advertisement?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        You cannot recover this operation
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ColorfulButton onClick={this.props.onClose} color="primary" variant="contained">
                        Cancel
                    </ColorfulButton>
                    <ColorfulButton onClick={this.handleDelete} color="red" variant="contained">
                        Delete
                    </ColorfulButton>
                </DialogActions>
            </Dialog>
        )
    }
}

export default connect(null, {deleteData})(DeleteDialog);