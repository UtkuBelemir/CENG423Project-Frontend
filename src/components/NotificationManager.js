import React from 'react';
import {connect} from 'react-redux'
import {clearNotification} from "../reduxUtils/actions";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import SuccessIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/WarningRounded";
import InfoIcon from "@material-ui/icons/InfoRounded";
import {colors} from '@material-ui/core';
import SnackbarContent from "@material-ui/core/SnackbarContent";

const bgColors = {
    success: colors.green[600],
    error: colors.red[700],
    info: colors.blue[700],
    warning: colors.amber[700]
}

const notificationIcons = {
    success: <SuccessIcon className="notification-icon"/>,
    error: <ErrorIcon className="notification-icon"/>,
    info: <InfoIcon className="notification-icon"/>,
    warning: <WarningIcon className="notification-icon"/>
}


class NotificationManager extends React.Component {
    showNotification = (infoText, notificationType, id) => {
        return (
            <Snackbar
                key={id}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                open={true}
                autoHideDuration={0}
                onClose={() => setTimeout(() => this.props.clearNotification(id),2500)}
                disableWindowBlurListener={true}
                ContentProps={{'aria-describedby': 'message-' + id}}>
                <SnackbarContent
                style={{backgroundColor: bgColors[notificationType]}}
                aria-describedby={"message-" + id}
                message={
                    <span id={"message-" + id} style={{display: 'flex', alignItems: 'center'}}>
                        {notificationIcons[notificationType]}
                        {infoText || ""}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        onClick={() => this.props.clearNotification(id)}
                        color="inherit">
                        <CloseIcon/>
                    </IconButton>
                ]}
            />
            </Snackbar>
        )
    }

    render() {
        if (!this.props.notifications || this.props.notifications.length == 0) {
            return null;
        }
        return [
            this.props.notifications.map(({infoText, notificationType, id}) => {
                return this.showNotification(infoText, notificationType, id)
            })
        ]
    }
}

export default connect((state) => {
    return {
        notifications: state && state.notificationOps
    }
}, {clearNotification})(NotificationManager)