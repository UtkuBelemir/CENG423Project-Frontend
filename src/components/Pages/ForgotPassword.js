import React from 'react';
import {Paper, Button, Grid, Typography} from '@material-ui/core';
import {Textfield} from '../Form';
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {postForm,setUser} from '../../reduxUtils/actions';

class ResetPassword extends React.Component {
    onReset = () => {
        this.props.postForm({
            endPoint: "auth/renew",
            formName: "resetPwForm",
        })
    }
    render() {
        return (
            <Grid container justify="center"
                  alignItems="center" style={{height: '100%'}}>
                <Paper elevation={1} style={{padding: 16,maxWidth : 500}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 8
                    }}>
                        <span style={{border: '0.5px solid #BABABA', flexGrow: 1}}/>
                        <Typography variant="h5" style={{padding: '0px 16px 0px 16px',color : '#555555'}}>
                            Reset Password
                        </Typography>
                        <span style={{border: '0.5px solid #BABABA', flexGrow: 1}}/>
                    </div>
                    <Textfield type="number" name="username" label="Student ID" fullWidth required/>
                    <Textfield name="first_name" label="First Name" fullWidth required/>
                    <Textfield name="email" label="E-mail" fullWidth required/>
                    <Textfield type="password" name="password" label="Password" fullWidth required/>
                    <Textfield type="password" name="password_again" label="Password Again" fullWidth required/>
                    <div className="sign-up-buttons">
                        <Button variant="contained" color="secondary" onClick={this.onReset}>
                            Reset
                        </Button>
                    </div>
                </Paper>
            </Grid>
        )
    }
}

const _ResetPassword = connect((state) => state,{postForm,setUser})(ResetPassword);

export default reduxForm({
    form: 'resetPwForm'
})(_ResetPassword);
