import React from 'react';

export default class extends React.Component{
    render() {
        const { username } = this.props;
        return (
            <button class="list-writer" onClick={this.handleClick}>
                <div class="list-writer-name" >{ username }</div>
            </button>
        );
    }
}