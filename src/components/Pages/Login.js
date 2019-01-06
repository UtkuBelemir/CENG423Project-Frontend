import React from 'react';
import {Paper, Button, Grid, Typography} from '@material-ui/core';
import {Textfield} from '../Form';
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {postForm,setUser} from '../../reduxUtils/actions';
import {setCookie} from "../../utils";
class Login extends React.Component {
    onLogin = () => {
        this.props.postForm({
            endPoint: "auth/login",
            formName: "loginForm",
            onSuccess: (e) => {
                setCookie("aybu-sys-auth",e.data.token,10);
                this.props.setUser(e.data)
            },
            onError: (e) => console.log("Login error", e),
            notifications : {
                success : {
                    text : "Deneme"
                },
                error : {}
            }
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
                        <Typography variant="h5" style={{padding: '0px 16px 0px 16px',color : '#555555'}}>
                            Login
                        </Typography>
                        <span style={{border: '0.5px solid #BABABA', flexGrow: 1}}/>
                    </div>
                    <Textfield type="number" name="username" label="Student ID" fullWidth required/>
                    <Textfield type="password" name="password" label="Password" fullWidth required/>
                    <div className="sign-up-buttons">
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

const _Login = connect((state) => state,{postForm,setUser})(Login);

export default reduxForm({
    form: 'loginForm'
})(_Login);
