import React from 'react';
import Article from '../components/Article';
import Writer from '../components/Writer';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { Link } from 'react-router-dom';
import firebase, { db } from '../connectDB';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: true, novelList: [], writerList: [] };

    var user = firebase.auth().currentUser;
    var username = [];
    var user_id = [];
    //小説取得処理
    db.collection('users')
      .where('email', '==', user.email)
      .get()
      .then((querySnapshot) => {
        // usersのなかで、今ログインしている人と同じemailアドレスの人のusername,idをusername,user_idにリストアップ(使うのは一つだけ)
        querySnapshot.forEach((doc) => {
          username.push(doc.data().username);
          user_id.push(doc.id);
        });

        // user_doc_idの一つ目の人が書いた小説をリストアップ
        db.collection('novels')
          .where('name', '==', username[0])
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.state.novelList.push(
                <Article
                  key={doc.id}
                  title={doc.data().title}
                  category={doc.data().category}
                  author={doc.data().name}
                  abstract={doc.data().overview}
                  id={doc.id}
                />
              );
              this.setState({ novelList: this.state.novelList });
            });
          });

        // user_doc_idの一つ目の人がお気に入りに入れている人をリストアップ
        db.collection('follows')
          .where('user_id', '==', user_id[0])
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // 該当するidのユーザーのユーザー名を取得
              db.collection('users')
                .doc(doc.data().following)
                .get()
                .then((followeeDoc) => {
                  if (followeeDoc.exists) {
                    // 該当するidのユーザーがいるなら、リストにWriterを入れる
                    this.state.writerList.push(
                      <Writer
                        key={doc.id}
                        username={followeeDoc.data().username}
                        id={doc.data().following}
                      />
                    );
                    this.setState({ writerList: this.state.writerList });
                  } else {
                    // 該当するidのユーザーがいないならコンソールにメッセージを出す
                    console.log('No such user (in MyPage)');
                  }
                })
                .catch(function (error) {
                  console.log('Error getting document in MyPage:', error);
                });
            });
          });
      });
  }

  // ログアウト処理
  handleLogout() {
    firebase.auth().signOut();
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  render() {
    return (
      <div class="container">
        <ScrollToTopOnMount />
        <h1>マイページ</h1>
        <div class="mypage-contents-title write-novel-title">小説を書く</div>
        <div class="write-button-wrapper">
          <Link to="/createNovel" onClick={this.toggleCollapse.bind(this)}>
            小説を執筆する
          </Link>
        </div>
        <div class="mypage-contents-title REQUEST-title">お題を見る</div>
        <div class="write-button-wrapper">
          <Link to="/request" onClick={this.toggleCollapse.bind(this)}>
            投稿されたお題を見る
          </Link>
        </div>
        <div class="mypage-contents-title  read-novel-title">小説を読む</div>
        <div class="user-information">
          <div class="contents-list favorite-writer">
            <h3>お気に入りユーザー</h3>
            <div class="box-list-yaxis">{this.state.writerList}</div>
          </div>
          <div class="contents-list wrote-novel">
            <h3 class="mypage-timeline">投稿した小説</h3>
            <div class="box-list-yaxis">{this.state.novelList}</div>
          </div>
        </div>
        <div class="mypage-contents-title logout-title">ログアウト</div>
        <div class="logout-button-wrapper">
          <button onClick={this.handleLogout}>ログアウト</button>
        </div>
      </div>
    );
  }
}
