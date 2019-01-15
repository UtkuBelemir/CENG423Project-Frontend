import React from 'react';
import {Field} from "redux-form";

class FileSelector extends React.Component {
    render() {
        const {record_id, ...rest} = this.props;
        const {onChange, value, ...inputRest} = this.props.input;
        let imgUrl = null
        if (value == 1 && record_id) {
            imgUrl = `http://localhost:3001/advertisement/${record_id}/image`

        }else if(value && value != 1){
            imgUrl = window.URL.createObjectURL(value)
        }
        return (
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                 onClick={() => document.getElementById('fileSelect').click()}>
                <div className="file-upload-box">
                    {imgUrl ? <img src={imgUrl} style={{maxWidth: 256, maxHeight: 256,width : 'auto',height : 'auto'}}/> :
                        <span>Click to select image</span>}
                </div>
                <input type="file" style={{display: 'none'}} id="fileSelect" onChange={(e) => {
                    onChange(e.target.files[0])
                }} {...rest} {...inputRest} />
            </div>
        )
    }
}

const FileUploader = (props) => {
    return (
        <Field component={FileSelector} {...props}/>
    )
}

export default FileUploader