import React from 'react';
import firebase, { db } from '../connectDB';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Article from '../components/Article';

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      novellist: [],
      url: 'createRequest?id=',
      id: '',
      isFavorite: false,
    };

    this.getData = this.getData.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  getData(uid) {
    db.collection('novels')
      .where('author_id', '==', uid)
      .get()
      .then((querySnapshot) => {
        // 指定されたidのユーザーが書いた小説をnovellistにリストアップ
        querySnapshot.forEach((novel) => {
          this.state.novellist.push(
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
            novellist: this.state.novellist,
          });
        });
      });
    // 今のフォロー状況を確認
    // 自分のID
    var my_uid = firebase.auth().currentUser.uid;
    db.collection('follows')
      .where('user_id', '==', my_uid)
      .where('following', '==', uid)
      .get()
      .then((querySnapshot) => {
        // フォロー関係があればtrue
        if (querySnapshot.empty) {
          this.setState({ isFavorite: false });
        } else {
          this.setState({ isFavorite: true });
        }
      })
      .catch(function (error) {
        console.log('Error getting document in Author:', error);
      });
  }

  componentDidMount(e) {
    const query = new URLSearchParams(this.props.location.search);
    const author_id = query.get('id');

    if (author_id == '') {
      this.props.history.push('/404');
      return;
    }

    var url = this.state.url;
    this.setState({ url: url + author_id });

    // 普通に取得
    this.getData(author_id);
  }

  // フォローアンフォロー動作
  handleFollow(e) {
    e.preventDefault();
    const author_id = this.state.id;
    // 自分のID
    var my_uid = firebase.auth().currentUser.uid;
    // 今のフォロー状況を確認
    db.collection('follows')
      .where('user_id', '==', my_uid)
      .where('following', '==', author_id)
      .get()
      .then((querySnapshot) => {
        // フォロー関係があれば解除、なければフォロー
        if (querySnapshot.empty) {
          // フォローしていない
          db.collection('follows').add({
            following: author_id,
            user_id: my_uid,
          });
          this.setState({ isFavorite: true });
          alert('フォローしました');
        } else {
          // フォローしていた
          querySnapshot.forEach((doc) => {
            db.collection('follows').doc(doc.id).delete();
          });
          this.setState({ isFavorite: false });
          alert('フォロー解除しました');
        }
      })
      .catch(function (error) {
        console.log('Error getting document in Author:', error);
      });
  }

  render() {
    return (
      <div>
        <h1 class="list-writer-name">{this.state.username}</h1>
        <button onClick={this.handleFollow}>
          {this.state.isFavorite ? 'お気に入り解除' : 'お気に入り登録'}
        </button>
        <div>
          <div class="authorpage-contents-title">お題箱</div>
          <div class="request-button-wrapper">
            <Link to={this.state.url}>お題箱はこちら</Link>
          </div>
        </div>
        <div class="contents-list">
          <div class="authorpage-contents-title">投稿した小説</div>
          <div class="box-list-yaxis">{this.state.novellist}</div>
        </div>
        <button onClick={() => this.props.history.goBack()}>戻る</button>
      </div>
    );
  }
}
export default withRouter(Author);
