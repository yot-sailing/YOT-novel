import React from 'react';
import Article from '../components/Article';
import News from '../components/News';
import firebase, { db } from '../connectDB';
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
          <div>
            <ScrollToTopOnMount />
            <div class="left-wrap">
              <h3>Today's ranking</h3>
              <div class="row box-list-yaxis">{Rankings}</div>
            </div>
            <div class="center-wrap">
              <h3>new novels</h3>
              <div class="row box-list-yaxis">{newnovels}</div>
            </div>
            <div class="right-wrap">
              <h3>News</h3>
              <div class="row box-list-yaxis">{news}</div>
            </div>
          </div>
        );
    }
}