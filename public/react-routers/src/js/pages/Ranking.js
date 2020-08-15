import React from 'react';
import Article from '../components/Article';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

export default class extends React.Component{
    render(){
        const Articles = [
            "ら",
            "ん",
            "き",
            "ん",
            "ぐ"
        ].map((title, i) => <Article key={i} rank={i+1} title={title} author="きいちゃん" category="猫ちゃん"/>);
        return (
          <div class="ranking-page contents-list ranking">
            <ScrollToTopOnMount />
            <h1>本日のランキング</h1>
            <div class="box-list-yaxis">{Articles}</div>
          </div>
        );
    }
}