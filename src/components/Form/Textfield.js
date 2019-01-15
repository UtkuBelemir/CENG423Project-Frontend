import React from 'react';
import TextField from '@material-ui/core/TextField';
import {Field} from 'redux-form';
const MUITextField = (props) =>{
    const {input,...rest} = props;
    return(
        <TextField
            {...rest}
            {...input}
            margin="dense"
            inputProps={{...rest.inputProps,autoComplete : 'off'}}
            variant="outlined"
        />
    )
}
const Textfield =  (props)=>{
    return(
        <Field component={MUITextField} {...props}/>
    )
}
export default Textfield;