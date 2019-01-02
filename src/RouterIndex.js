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



class RouterIndex extends React.Component {

    render() {
        return (
            <Router>
                <div style={{minHeight: '100%'}}>
                    <NotificationManager/>
                    <Route component={Header}/>
                    <div style={{minHeight: 'calc(100vh - 128px)', height: '100%'}}>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/manage-advertisements" component={AdvertisementDashboard}/>
                        <Route exact path="/buys-and-sell" component={BuySell}/>
                        <Route exact path="/find-roommate" component={FindRoommate}/>
                    </div>
                    <Route exact component={Footer}/>
                </div>
            </Router>
        )
    }
}
export default RouterIndex;