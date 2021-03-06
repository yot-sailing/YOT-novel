import React from 'react';
import Article from '../components/Article';
import Writer from '../components/Writer';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { Link } from 'react-router-dom';
import firebase, { db } from '../connectDB';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      username: '',
      novelList: [],
      writerList: [],
    };

    var uid = firebase.auth().currentUser.uid;

    // 自分の名前を知るため
    db.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          this.state.username = doc.data().username;
          this.setState({ username: this.state.username });
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });

    db.collection('novels')
      .where('author_id', '==', uid)
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

    // 自分がお気に入りに入れている人をリストアップ
    db.collection('follows')
      .where('user_id', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // 該当するidのユーザーのユーザー名を取得
          db.collection('users')
            .doc(doc.data().following)
            .get()
            .then((followsUserDoc) => {
              if (followsUserDoc.exists) {
                // 該当するidのユーザーがいるなら、リストにWriterを入れる
                this.state.writerList.push(
                  <Writer
                    key={doc.id}
                    username={followsUserDoc.data().username}
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
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  render() {
    return (
      <div class="container">
        <ScrollToTopOnMount />
        <h1>{this.state.username}さんのマイページ</h1>
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
            <h3>フォロー中のユーザー</h3>
            <div class="box-list-yaxis">{this.state.writerList}</div>
          </div>
          <div class="contents-list wrote-novel">
            <h3 class="mypage-timeline">投稿した小説</h3>
            <div class="box-list-yaxis">{this.state.novelList}</div>
          </div>
        </div>
      </div>
    );
  }
}
