import React from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";
import AybuLogo from '../vendor/assets/aybu-logo.png';
import {connect} from 'react-redux'
import {setCookie} from "../utils";
import {getData, setUser} from "../reduxUtils/actions";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.loginWithCookie();
    }

    loginWithCookie = () => {
        this.props.getData({
            endPoint: "auth/cookie-login",
            name: "cookieLogin",
            onSuccess: (e) => {
                setCookie("aybu-sys-auth", e.data.token, 10);
                this.props.setUser(e.data)
            },
        })
    }

    render() {
        return (
            <div className="home-page-body">
                <img alt="AYBU Logo" src={AybuLogo} width={128} style={{paddingBottom: 64}}/>
                <Typography variant="h4">AYBU Student Assistant System</Typography>
                <div className="form-buttons">
                    <p>Please <span
                        onClick={() => this.props.history.push('/sign-up')}>Create an Account</span> or <span
                        onClick={() => this.props.history.push('/login')}>Login</span></p>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        userInfo: state && state.userOps && state.userOps,
    }
}, {getData, setUser})(Home)