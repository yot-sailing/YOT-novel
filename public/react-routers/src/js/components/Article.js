import React from 'react';

export default class extends React.Component{
    render() {
        const { abstract } = this.props;
        const { title } = this.props;
        const { author } = this.props;
        const { category } = this.props;
        return (
            <div class="col-md-4">
                <h4>{ title }</h4>
                <h5>author : { author }</h5>
                <h5>category : {category}</h5>
                <p>{ abstract }</p>
                <a class="btn btn-default" href="#">More Info</a>
            </div>
        );
    }
}