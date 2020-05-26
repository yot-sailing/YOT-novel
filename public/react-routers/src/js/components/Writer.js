import React from 'react';

export default class extends React.Component{
    render() {
        const { username } = this.props;
        return (
            <div class="col-md-4">
                <h4>{ username }</h4>
                <p>I am a kyoto univ student.</p>
                <a class="btn btn-default" href="#">More Info</a>
            </div>
        );
    }
}