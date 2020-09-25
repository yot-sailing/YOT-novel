import React from 'react';
import Article from '../components/Article';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { db } from '../connectDB';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: true, list: [] };

    // 評価値順に10件小説を取得
    db.collection('novels')
      .orderBy('rating', 'desc')
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // 取得した小説のデータをリストアップ
          this.state.list.push(
            <Article
              key={doc.id}
              title={doc.data().title}
              rank={this.state.list.length + 1}
              category={doc.data().category}
              author={doc.data().name}
              abstract={doc.data().overview}
              id={doc.id}
            />
          );
          this.setState({ list: this.state.list });
        });
      });
  }
  render() {
    return (
      <div class="ranking-page contents-list ranking">
        <ScrollToTopOnMount />
        <h1>本日のランキング</h1>
        <div class="box-list-yaxis">{this.state.list}</div>
      </div>
    );
  }
}
