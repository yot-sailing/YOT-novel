import React from 'react';
import firebase, { db } from '../connectDB';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Article from '../components/Article';

const dbRef = db.collection('users');
const noveldbRef = db.collection('novels');
class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', novellist: [] };

    this.getData = this.getData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  getData(uid) {
    dbRef
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          const username = doc.data().username;
          this.setState({ username: username });
          noveldbRef
            .where('name', '==', doc.data().username)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((novel) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(
                  'debug print in Author. get data of',
                  novel.id,
                  ' => ',
                  novel.data()
                );
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
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }
  componentDidMount(e) {
    const query = new URLSearchParams(this.props.location.search);
    const author_id = query.get('id');
    //普通に取得
    this.getData(author_id);
  }

  handleFollow() {
    //TODO: フォローアンフォロー動作作成
  }

  render() {
    return (
      <div>
        <h1 class="list-writer-name">{this.state.username}</h1>
        <button onClick={this.handleFollow}>お気に入り登録</button>
        <div>
          <div class="authorpage-contents-title">お題箱</div>
          <div class="request-button-wrapper">
            <Link to="createrequest">お題箱はこちら</Link>
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
