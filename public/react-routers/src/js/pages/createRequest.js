import React from 'react';
import firebase, { db } from '../connectDB';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: '',
      user: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ request: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const request = this.state.request;
    const user = this.state.user;
    const request_user = firebase.auth().currentUser;
    var email = request_user.email;
    var request_user_id = [];

    if (request == '') {
      return;
    }
    if (this.state.user == '') {
      return;
    }
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          request_user_id.push(doc.id);
        });

        db.collection('odaibako').add({
          user: user,
          request_content: request,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          request_user: request_user_id[0],
        });
      });
    e.preventDefault();
    alert('投稿しました.');
    this.props.history.push('/mypage');
  }
  componentDidMount(e) {
    const query = new URLSearchParams(this.props.location.search);
    const author_id = query.get('id');
    if (author_id == '') {
      this.props.history.push('/404');
      return;
    }
    this.setState({ user: author_id });
  }
  render() {
    return (
      <div>
        <h3>お題を投稿しよう</h3>
        <form onSubmit={this.handleSubmit}>
          <textarea
            type="text"
            id="request"
            value={this.state.request}
            cols="50"
            rows="5"
            onChange={this.handleChange}
            placeholder="ここにお題箱の内容を書いてください"
          ></textarea>
          <br />
          <button type="submit" className="waves-effect waves-light btn col">
            投稿する
          </button>
        </form>
        <div class="buck-button-wrapper">
          <button
            class="buck-button"
            onClick={() => this.props.history.goBack()}
          >
            &lt;&lt;戻る
          </button>
        </div>
      </div>
    );
  }
}
