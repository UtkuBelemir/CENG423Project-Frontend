import React from 'react';
import ReactDOM from 'react-dom';
import {FormControl, InputLabel, Select, MenuItem, OutlinedInput} from '@material-ui/core';
import {Field} from 'redux-form';

class MUISelectField extends React.Component {
    state = {
        labelWidth : 0
    }
    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.inputLabelRef).offsetWidth,
        });
    }
    render() {
        const {input, items, meta, label} = this.props;

        return (
            <FormControl variant="outlined" style={{minWidth : '100%'}} margin="dense">
                <InputLabel htmlFor={input.name} ref={ (e) => this.inputLabelRef = e}>{label}</InputLabel>
                <Select {...input} style={{width : '100%'}} input={
                    <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        name={input.name}
                        id={input.name}
                    />
                }>
                    {items && items.length > 0 ? items.map((i1) => <MenuItem key={i1.value} value={i1.value}>{i1.label}</MenuItem>) : null}
                </Select>
            </FormControl>
        )
    }
}

const Selectfield = (props) => {
    return (
        <Field component={MUISelectField} {...props}/>
    )
}
export default Selectfield;