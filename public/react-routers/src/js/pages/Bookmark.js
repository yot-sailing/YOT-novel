import React from 'react';
import Article from '../components/Article';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

export default class extends React.Component{
    render(){
        const query = new URLSearchParams(this.props.location.search);
        const { article } = this.props.match.params;
        const date = query.get("date");
        const filter = query.get("filter");
        const abstract = "ここには１００字以内の概要が入ります"
        const Articles = [
            "お",
            "き",
            "に",
            "い",
            "り"
        ].map((title, i) => <Article key={i} title={title} author="PandA" category="SF" abstract={abstract}/>);
        return (
          <div class="bookmark-page contents-list bookmark">
            <ScrollToTopOnMount />
            <h1>お気に入り</h1>
            <div class="box-list-yaxis">{Articles}</div>
          </div>
        );
    }
}