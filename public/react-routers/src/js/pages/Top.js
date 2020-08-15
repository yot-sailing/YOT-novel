import React from 'react';
import Article from '../components/Article';
import News from '../components/News';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

export default class extends React.Component{
    render() {
        const Rankings = [
            "い", 
            "ち",
            "い",
            "か",
            "ら",
            "順",
            "番",
            "に",
            "10",
            "位"
        ].map((title,author, category, i) => <Article key={i} title={title} author="Gorrila" category="animal"/>);
        const newnovels = [
            "あ","た","ら","し","い","や","つ"
        ].map((title, i) => <Article key={i} title={title} />);
        const news = [
            "新しい機能の追加","今度サイトリニューアルします"
        ].map((title, i) => <News key={i} title={title}/>);
        return (
          <div class="toppage-contents">
            <ScrollToTopOnMount />
            <div class="contents-list ranking">
              <h3>今日のランキング</h3>
              <div class="box-list-yaxis">{Rankings}</div>
            </div>
            <div class="contents-list new-novel">
              <h3>新着小説</h3>
              <div class="box-list-yaxis">{newnovels}</div>
            </div>
            <div class="contents-list news">
              <h3>お知らせ</h3>
              <div class="box-list-yaxis">{news}</div>
            </div>
          </div>
        );
    }
}