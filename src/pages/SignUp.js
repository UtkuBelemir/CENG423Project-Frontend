import React from 'react';
import {Paper, Button, Grid, Typography} from '@material-ui/core';
import {Selectfield, Textfield} from '../components/Form';
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {postForm, showNotification} from "../reduxUtils/actions";

class SignUp extends React.Component {
    constructor(props){
        super(props);
        if(this.props.userInfo && this.props.userInfo.username){
            this.props.showNotification("Already logged in!","warning")
            this.props.history.goBack()
        }
    }
    onSignUp = () => {
        this.props.postForm({
            endPoint: "auth/signup",
            formName: "signupForm",
            notifications : {
                success : true,
                error : true
            },
            onSuccess : () => this.props.history.push('/login')
        })
    }

    render() {
        return (
            <Grid container justify="center"
                  alignItems="center" style={{height: '100%'}}>
                <Paper elevation={1} style={{padding: 16}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 8
                    }}>
                        <span style={{border: '0.5px solid #BABABA', flexGrow: 1}}/>
                        <Typography variant="h5" style={{padding: '0px 16px 0px 16px', color: '#555555'}}>
                            Sign Up
                        </Typography>
                        <span style={{border: '0.5px solid #BABABA', flexGrow: 1}}/>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Textfield type="number" name="username" label="Student ID" fullWidth style={{marginRight: 4}}
                                   required/>
                        <Textfield type="password" name="password" label="Password" fullWidth style={{marginLeft: 4}}
                                   required/>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Textfield name="first_name" label="First Name" fullWidth style={{marginRight: 4}} required/>
                        <Textfield name="last_name" label="Last Name" fullWidth style={{marginLeft: 4}} required/>
                    </div>
                    <Textfield name="email" label="E-mail" fullWidth/>

                    <Selectfield name="gender" label="Gender"
                                 items={[{value: 0, label: 'Male'}, {value: 1, label: 'Female'}]}/>
                    <div className="form-buttons">
                        <Button variant="contained" color="secondary" onClick={this.onSignUp}>
                            Sign Up
                        </Button>
                        <p>Do you have an account? <span onClick={() => this.props.history.push('/login')}>Login</span>
                        </p>

                    </div>
                </Paper>
            </Grid>
        )
    }
}

const _SignUp = connect((state) => {
    return{
        userInfo : state && state.userOps
    }
}, {postForm,showNotification})(SignUp);

export default reduxForm({
    form: 'signupForm'
})(_SignUp);
