import React from 'react';
import Article from '../components/Article';
import News from '../components/News';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { db } from '../connectDB';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      rankings: [],
      newNovals: [],
      news: [],
    };

    // ランキング上位十件を取得
    db.collection('novels')
      .orderBy('rating', 'desc')
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.state.rankings.push(
            <Article
              key={doc.id}
              title={doc.data().title}
              rank={this.state.rankings.length + 1}
              category={doc.data().category}
              author={doc.data().name}
              abstract={doc.data().overview}
              id={doc.id}
            />
          );
          this.setState({ rankings: this.state.rankings });
        });
      });

    // 新着小説上位十件を取得
    db.collection('novels')
      .orderBy('created', 'desc')
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.state.newNovals.push(
            <Article
              key={doc.id}
              title={doc.data().title}
              category={doc.data().category}
              author={doc.data().name}
              abstract={doc.data().overview}
              id={doc.id}
            />
          );
          this.setState({ newNovals: this.state.newNovals });
        });
      });

    // お知らせを取得
    db.collection('news')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.state.news.push(
            <News key={doc.id} title={doc.data().title} id={doc.id} />
          );
          this.setState({ news: this.state.news });
        });
      });
  }

  render() {
    return (
      <div class="toppage-contents">
        <ScrollToTopOnMount />
        <div class="contents-list ranking">
          <h3>今日のランキング</h3>
          <div class="box-list-yaxis">{this.state.rankings}</div>
        </div>
        <div class="contents-list new-novel">
          <h3>新着小説</h3>
          <div class="box-list-yaxis">{this.state.newNovals}</div>
        </div>
        <div class="contents-list news">
          <h3>お知らせ</h3>
          <div class="box-list-yaxis">{this.state.news}</div>
        </div>
      </div>
    );
  }
}
