import React from 'react';

export default class extends React.Component{
    render() {
        const { abstract } = this.props;
        const { title } = this.props;
        const { author } = this.props;
        const { category } = this.props;
        return (
            <a class="list-novel" href="#">
                <div class="list-novel-title">{ title }</div>
                <div class="list-novel-abst">{abstract}</div>
                <div class="list-novel-info">
                    <div class="list-novel-author">{ author }</div>
                    <div class="list-novel-cat">{category}</div>
                </div>
            </a>
        );
    }
}