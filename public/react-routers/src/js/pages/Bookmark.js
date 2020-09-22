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

    var user = firebase.auth().currentUser;
    var user_doc_id = [];
    db.collection('users')
      .where('email', '==', user.email)
      .get()
      .then((querySnapshot) => {
        // usersのなかで、今ログインしている人と同じemailアドレスの人のidをuser_doc_idにリストアップ(使うのは一つだけ)
        querySnapshot.forEach((doc) => {
          user_doc_id.push(doc.id);
        });

        // user_doc_idの一つ目の人のお気に入りの小説をリストアップ
        db.collection('bookmarks')
          .where('user_doc_id', '==', user_doc_id[0])
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
                    // 該当の小説がなければエラー出力
                    console.log('Cannot find novel (in Bookmark)');
                  }
                });
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
