import React from 'react';
import {AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {connect} from 'react-redux';
import AybuLogo from '../../vendor/assets/aybu-logo.png';


const LoggedInButtons = (props) => {
    return (
        <>
            <Button color="inherit" disableRipple onClick={() => props.history.push('/buy-and-sell')}>Buy /
                Sell</Button>
            <span className="button-separator"/>
            <Button color="inherit" disableRipple onClick={() => props.history.push('/find-roommate')}>Find a
                Roommate</Button>
            <span className="button-separator"/>
            <Button color="inherit" disableRipple onClick={() => props.history.push('/manage-advertisements')}>Manage
                Advertisements</Button>
            <span className="button-separator"/>
            <IconButton color="inherit" aria-label="Menu" onClick={() => props.history.push('/profile')}>
                <AccountCircle/>
            </IconButton>
        </>
    )
}

class NormalButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        }
    }
    componentDidMount() {
        setTimeout( () => this.setState({hidden : false}),200)
    }

    render() {
        if (this.state.hidden) {
            return null;
        }
        return (
            <>
                <Button color="inherit" variant="outlined" disableRipple
                        style={{marginRight: 8, borderColor: '#FFFFFF'}}
                        onClick={() => this.props.history.push('/login')}>Log In</Button>
                <Button color="inherit" variant="outlined" disableRipple style={{marginLeft: 8, borderColor: '#FFFFFF'}}
                        onClick={() => this.props.history.push('/sign-up')}>Sign Up</Button>
            </>
        )
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.goHomePage = this.goHomePage.bind(this);
    }

    goHomePage() {
        this.props.history.push('/')
    }

    render() {
        const {history, userInfo} = this.props;
        const isLoggedIn = !!(userInfo && userInfo.token);
        return (
            <AppBar position="static" className="header-item" style={{zIndex: 2}}>
                <Toolbar>
                    <img src={AybuLogo} width={48} className="logo clickable" onClick={this.goHomePage}
                         alt="AYBU Logo" style={{paddingRight: 8}}/>
                    <Typography variant="h6" color="inherit" className="header-item clickable"
                                onClick={this.goHomePage}>
                        Student Assistant System
                    </Typography>
                    {isLoggedIn ? <LoggedInButtons history={history}/> :
                        <NormalButtons history={history}/>
                    }
                </Toolbar>
            </AppBar>

        );
    }
}

export default connect((state) => {
    return {
        userInfo: state && state.userOps && state.userOps,
    }
})(Header);