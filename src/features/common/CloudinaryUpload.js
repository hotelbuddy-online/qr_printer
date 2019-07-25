import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { openUploadWidget } from '../../common/cloudinaryService';
import { default as Config } from '../../config/cloudinary_config';

export default class CloudinaryUpload extends Component {
    static propTypes = {

    };

    uploadImageWithCloudinary() {
        const uploadOptions = { tags: 'myphotoalbum', ...Config };
        openUploadWidget(uploadOptions, (error, photos) => {
            if (!error) {
                this.props.onPhotosUploaded(photos);
            } else {
                console.log(error);
            }
        });
    }

    render() {
        return (
            <div className="common-cloudinary-upload">
                <Button onClick={this.uploadImageWithCloudinary.bind(this)} >open upload</Button>
            </div>
        );
    }
}
