import React from 'react';
import Grid from "@material-ui/core/Grid";
import AdvertisementItem from "../components/AdvertisementItem";
import AddIcon from '@material-ui/icons/Add';
import ColorfulFAB from "../components/ColorfulFAB";
import {connect} from "react-redux";
import {getData} from "../reduxUtils/actions";
import InformationDialog from "../components/InformationDialog";

class FindRoommate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeOwner : null,
            activeRecordID : null
        }
        this.props.getData({
            name : "findRoommateAdvertisements",
            endPoint : "advertisement/type/roommate"
        })
    }
    handleCardClick = (owner,recordID) => {
        this.setState({activeOwner: owner,activeRecordID: recordID})
    }
    render() {
        return (
            <div style={{width: '100%', height: '100%', padding: '0px 8px 16px 8px', overflow: 'scroll'}}>
                <Grid
                    container
                    direction="row"
                    alignItems="center">
                    {this.props.advertisements ? this.props.advertisements.length > 0 ? this.props.advertisements.map((i1, ind) => {
                        return <AdvertisementItem key={i1.record_id} info="true" data={i1} type="roommate"
                                                  cardClick={() => this.handleCardClick(i1.owner, i1.record_id)}
                                                  infoClick={() => this.handleCardClick(i1.owner, i1.record_id)}/>
                    }) : <div className="center-margin">No Advertisements</div> : <div className="center-margin">Loading...</div>}
                </Grid>
                <div className="fab-bottom-right">
                    <ColorfulFAB color="secondary" onClick={ () => this.props.history.push("/find-roommate/add")}>
                        <AddIcon/>
                    </ColorfulFAB>
                </div>
                {this.state.activeOwner && this.state.activeRecordID ?
                    <InformationDialog recordID={this.state.activeRecordID} owner={this.state.activeOwner}
                                       onClose={() => this.setState({ activeOwner: null, activeRecordID: null})}/> : null}
            </div>
        )
    }
}
export default connect( (state) => {
    return {
        advertisements : (state && state.dataOps && state.dataOps.findRoommateAdvertisements && state.dataOps.findRoommateAdvertisements.data) || null
    }
},{getData})(FindRoommate)