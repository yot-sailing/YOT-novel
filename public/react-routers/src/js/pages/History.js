import React from 'react';
import Article from '../components/Article';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

export default class extends React.Component{
    render(){
        const query = new URLSearchParams(this.props.location.search);
        const { article } = this.props.match.params;
        const user = query.get("user");

        const Articles = [
            "え",
            "つ",
            "ら",
            "ん",
            "り",
            "れ",
            "き"
        ].map((title, i) => <Article key={i} title={title} author="erina" category="サスペンス"/>);
        return (
            <div class="history-page contents-list history">
                <ScrollToTopOnMount />
                <div class="history-title-wrapper">
                    <h1 class="history">History</h1><p>最近5件を表示しています.</p>
                </div>
                <div class="box-list-yaxis">{Articles}</div>
            </div>
        );
    }
}