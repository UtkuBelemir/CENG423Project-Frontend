import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AdvertisementDashboard from "./pages/AdvertisementDashboard";
import BuySell from "./pages/BuySell";
import FindRoommate from "./pages/FindRoommate";
import NotificationManager from './components/NotificationManager';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ForgotPassword';
import {connect} from 'react-redux';
import {getData, setUser} from "./reduxUtils/actions";
import {setCookie} from "./utils";
import BuySellForm from "./pages/BuySellForm";
import FindRoommateForm from "./pages/FindRommateForm";

const _LoginWithCookie = (props) => {
    props.getData({
        endPoint: "auth/cookie-login",
        name: "cookieLogin",
        onSuccess: (e) => {
            setCookie("aybu-sys-auth", e.data.token, 10);
            props.setUser(e.data)
        },
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
                    <div style={{height: 'calc(100vh - 128px)',overflow : 'hidden',padding : 16}}>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/reset-password" component={ResetPassword}/>
                        <Route exact path="/sign-up" component={SignUp}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/manage-advertisements" component={AdvertisementDashboard}/>
                        <Route exact path="/buy-and-sell" component={BuySell}/>
                        <Route exact path="/buy-and-sell/add" component={BuySellForm}/>
                        <Route exact path="/find-roommate" component={FindRoommate}/>
                        <Route exact path="/find-roommate/add" component={FindRoommateForm}/>
                        <Route exact path="/buy-and-sell/edit/:advertisementId" component={BuySellForm}/>
                        <Route exact path="/find-roommate/edit/:advertisementId" component={FindRoommateForm}/>
                    </div>
                    <Route exact component={Footer}/>
                </div>
            </Router>
        )
    }
}
export default RouterIndex;