import React, { Component } from 'react';

const options = [
    {
        type: 'color',
        name: 'background color',
    },
    {
        type: 'color',
        name: 'color',
        description: 'text color'
    },
    {
        type: 'distance',
        name: 'top',
    },
    {
        type: 'distance',
        name: 'bottom',
    },
    {
        type: 'distance',
        name: 'left',
    },
    {
        type: 'distance',
        name: 'right',
    },
]

export default class StyleBuilder extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div className="common-style-builder">
                Component content: common/StyleBuilder
      </div>
        );
    }
}
