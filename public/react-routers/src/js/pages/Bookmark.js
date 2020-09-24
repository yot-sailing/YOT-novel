import React from 'react';
import Article from '../components/Article';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import firebase, { db } from '../connectDB';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      favoriteNovels: [],
    };

    // 自分のID
    var uid = firebase.auth().currentUser.uid;
    // お気に入りの小説をリストアップ
    db.collection('bookmarks')
      .where('user_doc_id', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // お気に入りに登録されている小説IDから、その小説のデータを取得し、リストアップ
          const favorite_novel_doc_id = doc.data().novel_doc_id;
          db.collection('novels')
            .doc(favorite_novel_doc_id)
            .get()
            .then((novel) => {
              if (novel.exists) {
                // 該当の小説があればfavoriteNovelsに追加
                this.state.favoriteNovels.push(
                  <Article
                    key={novel.id}
                    title={novel.data().title}
                    category={novel.data().category}
                    author={novel.data().name}
                    abstract={novel.data().overview}
                    id={novel.id}
                  />
                );
                this.setState({
                  favoriteNovels: this.state.favoriteNovels,
                });
              } else {
                // 該当の小説がなければ削除
                db.collection('bookmarks').doc(doc.id).delete();
                // 該当の小説がなければエラー出力
                console.log('Cannot find novel (in Bookmark)');
              }
            });
        });
      });
  }
  render() {
    return (
      <div class="bookmark-page contents-list bookmark">
        <ScrollToTopOnMount />
        <h1>お気に入り</h1>
        <div class="box-list-yaxis">{this.state.favoriteNovels}</div>
      </div>
    );
  }
}
