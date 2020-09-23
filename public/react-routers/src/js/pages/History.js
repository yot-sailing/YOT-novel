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

    var user = firebase.auth().currentUser;
    var user_doc_id = [];
    // 閲覧履歴データ取得処理
    db.collection('users')
      .where('email', '==', user.email)
      .get()
      .then((querySnapshot) => {
        // usersのなかで、今ログインしている人と同じemailアドレスの人のidをuser_doc_idにリストアップ(使うのは一つだけ)
        querySnapshot.forEach((doc) => {
          user_doc_id.push(doc.id);
        });
        // user_doc_idの一つ目の人の閲覧履歴を5件だけリストアップ
        db.collection('histories')
          .where('user_doc_id', '==', user_doc_id[0])
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
                .then((doc) => {
                  this.state.list.push(
                    <Article
                      key={doc.id}
                      title={doc.data().title}
                      category={doc.data().category}
                      author={doc.data().name}
                      abstract={doc.data().overview}
                      id={doc.id}
                    />
                  );
                  this.setState({ list: this.state.list });
                });
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
