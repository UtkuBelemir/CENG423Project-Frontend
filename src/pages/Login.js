import React from 'react';
import {Paper, Button, Grid, Typography} from '@material-ui/core';
import {Textfield} from '../components/Form';
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {postForm, setUser, showNotification} from '../reduxUtils/actions';
import {setCookie} from "../utils";
class Login extends React.Component {
    constructor(props){
        super(props);
        if(this.props.userInfo && this.props.userInfo.username){
            this.props.showNotification("Already logged in!","warning")
            this.props.history.goBack()
        }
    }
    onLogin = () => {
        if(this.props.userInfo && this.props.userInfo.username){
            this.props.showNotification("Already logged in!","warning")
            this.props.history.push('/manage-advertisements')
        } else {
            this.props.postForm({
                endPoint: "auth/login",
                formName: "loginForm",
                onSuccess: (e) => {
                    setCookie("aybu-sys-auth",e.data.token,10);
                    this.props.setUser(e.data)
                    this.props.history.push('/manage-advertisements')
                },
                notifications : {
                    success : {
                        text : "Login successful. Redirecting..."
                    },
                    error : true,
                }
            })
        }
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
                        <Typography variant="h5" style={{padding: '0px 16px 0px 16px',color : '#555555'}}>
                            Login
                        </Typography>
                        <span style={{border: '0.5px solid #BABABA', flexGrow: 1}}/>
                    </div>
                    <Textfield name="username" label="Student ID" fullWidth required/>
                    <Textfield type="password" name="password" label="Password" fullWidth required/>
                    <div className="form-buttons">
                        <Button variant="contained" color="secondary" onClick={this.onLogin}>
                            Login
                        </Button>
                        <p><span onClick={ () => this.props.history.push('/reset-password')}>Forgot your password?</span></p>

                    </div>
                </Paper>
            </Grid>
        )
    }
}

const _Login = connect((state) => {
    return{
        userInfo : state && state.userOps
    }
},{postForm,setUser,showNotification})(Login);

export default reduxForm({
    form: 'loginForm'
})(_Login);
