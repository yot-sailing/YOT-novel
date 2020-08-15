import React from 'react';

export default class extends React.Component{
    render() {
        const { title } = this.props;
        return (
            <a class="list-news" href="#">
                <div class="list-news-title">{title}</div>
            </a>
        );
    }
}