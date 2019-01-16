import React from 'react';
import Grid from "@material-ui/core/Grid";
import AdvertisementItem from "../components/AdvertisementItem";
import {getData, putForm} from "../reduxUtils/actions";
import {connect} from "react-redux";
import DeleteDialog from '../components/DeleteDialog';
import InformationDialog from '../components/InformationDialog';
class AdvertisementDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCategory: null,
            deleteDialogOpen: false,
            deleteID: null,
            activeOwner : null,
            activeRecordID : null
        }
        this.getRoommateAdvertisements()
        this.getBuySellAdvertisements()
    }
    getRoommateAdvertisements = () => {
        this.props.getData({
            name: "findRoommateAdvertisements",
            endPoint: "advertisement/type/roommate/1"
        })
    }
    getBuySellAdvertisements = () => {
        this.props.getData({
            name: "buySellAdvertisements",
            endPoint: "advertisement/type/buy-sell/1"
        })
    }
    changeStatus = (currentStatus,recordID) => {
        let nextStatus = (currentStatus == '0' || !currentStatus) ? 1 : 0
        this.props.putForm({
            endPoint : "advertisement/"+recordID,
            isFormData : true,
            customValues : {
                status : nextStatus
            },
            notifications : {
                success : {
                    text : nextStatus == 1 ? "Advertisement ACTIVATED successfully" : "Advertisement DEACTIVATED successfully"
                },
                error : true,
            },
            onSuccess :  () => {
                this.getRoommateAdvertisements();
                this.getBuySellAdvertisements()
            }
        })
    }
    handleCardClick = (owner, recordID) => {
        this.setState({activeOwner: owner, activeRecordID: recordID})
    }
    render() {
        const {role} = this.props.userInfo;
        return (
            <div style={{width: '100%', height: '100%', padding: '0px 8px 16px 8px', overflow: 'scroll'}}>
                <div style={{
                    fontSize: 24,
                    color: '#777',
                    fontWeight: 'bold'
                }}>Find a Roommate
                </div>
                <hr/>
                <Grid
                    container
                    direction="row"
                    alignItems="center">
                    {this.props.roommateAdvertisements ? this.props.roommateAdvertisements.length > 0 ? this.props.roommateAdvertisements.sort( (i1,i2) => i1.record_id > i2.record_id).map((i1, ind) => {
                            return <AdvertisementItem key={i1.record_id} data={i1} type="roommate"
                                                      editClick={() => this.props.history.push('/find-roommate/edit/' + i1.record_id)}
                                                      cardClick={() => this.handleCardClick(i1.owner, i1.record_id)}
                                                      changeStatus={ () => this.changeStatus(i1.status,i1.record_id)}
                                                      isAdmin={role == 'admin'}
                                                      deleteClick={ () => this.setState({deleteDialogOpen : true,deleteID : i1.record_id})}
                            />
                        }) : <div className="center-margin" style={{padding: '32px 0px 32px 0px'}}>No Advertisements</div> :
                        <div className="center-margin" style={{padding: '32px 0px 32px 0px'}}>Loading...</div>}
                </Grid>
                <div style={{
                    fontSize: 24,
                    color: '#777',
                    fontWeight: 'bold'
                }}>Buy and Sell Advertisements
                </div>
                <hr/>
                <Grid
                    container
                    direction="row"
                    alignItems="center">
                    {this.props.buySellAdvertisements ? this.props.buySellAdvertisements.length > 0 ? this.props.buySellAdvertisements.sort( (i1,i2) => i1.record_id > i2.record_id).map((i1, ind) => {
                            return <AdvertisementItem key={i1.record_id} data={i1} type="buy-sell"
                                                      editClick={() => this.props.history.push('/buy-and-sell/edit/' + i1.record_id)}
                                                      cardClick={() => this.handleCardClick(i1.owner, i1.record_id)}
                                                      isAdmin={role == 'admin'}
                                                      changeStatus={ () => this.changeStatus(i1.status,i1.record_id)}
                                                      deleteClick={ () => this.setState({deleteDialogOpen : true,deleteID : i1.record_id})}
                            />
                        }) : <div className="center-margin" style={{padding: '32px 0px 32px 0px'}}>No Advertisements</div> :
                        <div className="center-margin" style={{padding: '32px 0px 32px 0px'}}>Loading...</div>}
                </Grid>
                {this.state.deleteDialogOpen && this.state.deleteID != null ?
                    <DeleteDialog onClose={() => this.setState({deleteDialogOpen: false, deleteID: null})}
                                  onSuccess={ () => {this.getRoommateAdvertisements();this.getBuySellAdvertisements()}}
                                  recordID={this.state.deleteID}/> : null}
                {this.state.activeOwner && this.state.activeRecordID ?
                    <InformationDialog recordID={this.state.activeRecordID} owner={this.state.activeOwner}
                                       onClose={() => this.setState({ activeOwner: null, activeRecordID: null})}/> : null}
            </div>
        )
    }
}

export default connect((state) => {
    return {
        userInfo: (state && state.userOps && state.userOps) || {},
        roommateAdvertisements: (state && state.dataOps && state.dataOps.findRoommateAdvertisements && state.dataOps.findRoommateAdvertisements.data) || null,
        buySellAdvertisements: (state && state.dataOps && state.dataOps.buySellAdvertisements && state.dataOps.buySellAdvertisements.data) || null
    }
}, {getData,putForm})(AdvertisementDashboard)