import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import AdvertisementDashboard from "./components/Pages/AdvertisementDashboard";
import BuySell from "./components/Pages/BuySell";
import FindRoommate from "./components/Pages/FindRoommate";
import NotificationManager from './components/NotificationManager';
import Login from './components/Pages/Login';
import SignUp from './components/Pages/SignUp';
import ResetPassword from './components/Pages/ForgotPassword';
import {connect} from 'react-redux';
import {getData, setUser} from "./reduxUtils/actions";
import {setCookie} from "./utils";

const _LoginWithCookie = (props) => {
    props.getData({
        endPoint: "auth/cookie-login",
        name: "cookieLogin",
        onSuccess: (e) => {
            setCookie("aybu-sys-auth", e.data.token, 10);
            props.setUser(e.data)
        },
        onError: (e) => console.log("Login error", e)
    })
    return null;
}
const LoginWithCookie = connect(null,{getData,setUser})(_LoginWithCookie);


class RouterIndex extends React.Component {

    render() {
        return (
            <Router>
                <div style={{minHeight: '100%'}}>
                    <LoginWithCookie/>
                    <NotificationManager/>
                    <Route component={Header}/>
                    <div style={{height: 'calc(100vh - 96px)'}}>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/reset-password" component={ResetPassword}/>
                        <Route exact path="/sign-up" component={SignUp}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/manage-advertisements" component={AdvertisementDashboard}/>
                        <Route exact path="/buy-and-sell" component={BuySell}/>
                        <Route exact path="/find-roommate" component={FindRoommate}/>
                    </div>
                    <Route exact component={Footer}/>
                </div>
            </Router>
        )
    }
}
export default RouterIndex;