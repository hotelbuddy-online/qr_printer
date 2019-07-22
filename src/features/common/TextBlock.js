import React, { Component } from 'react';

export default class TextBlock extends Component {
    static propTypes = {

    };

    render() {
        const { text, style, common } = this.props;
        if (!text) return null
        const { venue } = common;
        return (
            <div className="common-text-block vertical layout">
                <span style={style}>{text}</span>
            </div>
        );
    }
}
