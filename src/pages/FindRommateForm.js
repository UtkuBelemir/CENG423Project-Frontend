import React from 'react';
import {Grid, Paper, Typography} from "@material-ui/core";
import {Selectfield, Textfield} from "../components/Form";
import {reduxForm} from "redux-form";
import FileUploader from "../components/Form/FileUploader";
import ColorfulButton from "../components/ColorfulButton";
import {connect} from "react-redux";
import {getData, postForm, putForm, showNotification} from "../reduxUtils/actions";
import {categories} from "../utils";

class FindRoommateForm extends React.Component {
    advertisementID = null;
    constructor(props){
        super(props);
        this.advertisementID = this.props.match.params.advertisementId;
        if(this.advertisementID){
            this.props.getData({
                name : "findRoommateAdvertisement-"+this.advertisementID,
                endPoint : "advertisement/"+this.advertisementID
            })
        }
    }
    postAdvertisement = () => {
        if(this.advertisementID){
            this.props.putForm({
                endPoint : "advertisement/"+this.advertisementID,
                formName: "findRoommateForm",
                isFormData : true,
                onSuccess: (e) => {
                    this.props.history.goBack();
                },
                notifications : {
                    success : true,
                    error : true,
                }
            })
        }else{
            this.props.postForm({
                endPoint: "advertisement",
                formName: "findRoommateForm",
                isFormData : true,
                onSuccess: (e) => {
                    setTimeout( () => this.props.history.goBack() , 500)
                },
                notifications : {
                    success : true,
                    error : true,
                }
            })
        }

    }
    render() {
        if(this.advertisementID && !this.props.initialized){
            this.props.initialize(this.props.itemInfo)
        }
        return (
            <Grid container justify="center"
                  alignItems="center" style={{height: '100%'}}>
                <Paper elevation={10} style={{padding: 16, width: 500}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 8
                    }}>
                        <span style={{border: '0.5px solid #BABABA', flexGrow: 1}}/>
                        <Typography variant="h6" style={{padding: '0px 16px 0px 16px', color: '#555555'}}>
                            Create Find a Roommate Advertisement
                        </Typography>
                        <span style={{border: '0.5px solid #BABABA', flexGrow: 1}}/>
                    </div>
                    <FileUploader name="image" record_id={this.props && this.props.itemInfo ? this.props.itemInfo.record_id : null}/>
                    <Textfield name="title" label="Title" fullWidth required/>
                    <div style={{display: 'flex', flex: 3}}>
                        <Textfield name="price" label="Price" required style={{flex: 1, paddingRight: 4}}/>
                        <div style={{flex: 2, paddingLeft: 4}}>
                            <Selectfield name="category" label="Category"
                                         items={categories["roommate"]}
                            />
                        </div>
                    </div>
                    <Textfield name="description" label="Description" fullWidth required  multiline rowsMax="4"/>
                    <div className="form-buttons" style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-evenly'}}>
                        <ColorfulButton color="primary" variant="contained" onClick={this.postAdvertisement}>
                            Save
                        </ColorfulButton>
                        <ColorfulButton color="red" variant="contained" onClick={ () => this.props.history.goBack()}>
                            Cancel
                        </ColorfulButton>
                    </div>
                </Paper>
            </Grid>
        )
    }
}

const _FindRoommateForm = connect((state,ownProps) => {
    let advertisementID = (ownProps.match && ownProps.match.params && ownProps.match.params.advertisementId) || null
    if(advertisementID){
        return{
            itemInfo : state && state.dataOps && state.dataOps["findRoommateAdvertisement-"+advertisementID] && state.dataOps["findRoommateAdvertisement-"+advertisementID].data
        }
    }
    return {}
},{postForm,showNotification,getData,putForm})(FindRoommateForm);

export default reduxForm({
    form: 'findRoommateForm',
    initialValues: {
        type:"roommate"
    }
})(_FindRoommateForm);