import React from 'react';
import Article from '../components/Article';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import firebase, { db } from '../connectDB';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      list: [],
    };

    // 自分のID
    var uid = firebase.auth().currentUser.uid;
    // 閲覧履歴データ取得処理
    // 自分の閲覧履歴を5件だけリストアップ
    db.collection('histories')
      .where('user_doc_id', '==', uid)
      .orderBy('read_at', 'desc')
      .limit(5)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // 閲覧履歴に登録されている小説IDから、その小説のデータを取得し、リストアップ
          const history_novel_doc_id = doc.data().novel_doc_id;
          db.collection('novels')
            .doc(history_novel_doc_id)
            .get()
            .then((novel) => {
              if (novel.exists) {
                // 小説が存在するなら表示に追加
                this.state.list.push(
                  <Article
                    key={novel.id}
                    title={novel.data().title}
                    category={novel.data().category}
                    author={novel.data().name}
                    abstract={novel.data().overview}
                    id={novel.id}
                  />
                );
                this.setState({ list: this.state.list });
              } else {
                db.collection('histories').doc(doc.id).delete();
                console.log('Cannot find novel (in History). Delete history.');
              }
            });
        });
      });
  }

  render() {
    return (
      <div class="history-page contents-list history">
        <ScrollToTopOnMount />
        <div class="history-title-wrapper">
          <h1 class="history">History</h1>
          <p>最近5件を表示しています.</p>
        </div>
        <div class="box-list-yaxis">{this.state.list}</div>
      </div>
    );
  }
}
