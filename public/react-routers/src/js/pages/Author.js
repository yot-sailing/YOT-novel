import React from 'react';
import { db } from '../connectDB';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Article from '../components/Article';

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', novellist: [], url:'createRequest?id=' };

    this.getData = this.getData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  getData(uid) {
    db.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        // 指定されたidのユーザーを取得して操作
        if (doc.exists) {
          const username = doc.data().username;
          this.setState({ username: username });
          db.collection('novels')
            .where('name', '==', username)
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
        } else {
          console.log('Cannot find user (in Author)');
        }
      })
      .catch(function (error) {
        console.log('Error getting document in Author:', error);
      });
  }
  componentDidMount(e) {
    const query = new URLSearchParams(this.props.location.search);
    const author_id = query.get('id');
    if (author_id == ''){
      this.props.history.push('/404');
      return;
    }
    var url = this.state.url
    this.setState({url: url + author_id});
    // 普通に取得
    this.getData(author_id);
  }

  handleFollow() {
    // TODO: フォローアンフォロー動作作成
    // db.collection('follow')
    //   .doc(id)
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       console.log('Document data:', doc.data());
    //       const username = doc.data().username;
    //       this.setState({ username: username });
    //     } else {
    //       // doc.data() will be undefined in this case
    //       console.log('No such document!');
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log('Error getting document:', error);
    //   });
  }

  render() {
    return (
      <div>
        <h1 class="list-writer-name">{this.state.username}</h1>
        <button onClick={this.handleFollow}>お気に入り登録</button>
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
