import React from 'react';
import {Grid, Paper, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ColorfulButton from "../components/ColorfulButton";

class Profile extends React.Component {
    render() {
        const {username, first_name, last_name, email, gender, role} = this.props.userInfo
        return (
            <Grid container justify="center"
                  alignItems="center" style={{height: '100%'}}>
                <Paper elevation={1} style={{padding: 16,width : 350}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 8
                    }}>
                        <span style={{border: '0.5px solid #BABABA', flexGrow: 1}}/>
                        <Typography variant="h5" style={{padding: '0px 16px 0px 16px', color: '#555555'}}>
                            Profile Details
                        </Typography>
                        <span style={{border: '0.5px solid #BABABA', flexGrow: 1}}/>
                    </div>
                    <List>
                        <ListItem>
                            <ListItemText primary={username} secondary="Username" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={first_name} secondary="First Name" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={last_name} secondary="Last Name" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={email} secondary="Email" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={gender} secondary="Gender" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={role} secondary="Role" />
                        </ListItem>
                    </List>
                    <ColorfulButton variant="contained" color="primary" style={{width : '100%'}} onClick={() => this.props.history.goBack()}>
                        GO BACK
                    </ColorfulButton>
                </Paper>
            </Grid>
        )
    }
}

export default connect((state) => {
    return {
        userInfo: (state && state.userOps && state.userOps) || {},
    }
})(Profile);