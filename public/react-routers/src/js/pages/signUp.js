import React from 'react';
import firebase, { db } from '../connectDB';
import { Link } from 'react-router-dom';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
      collapsed: true,
      loading: false,
      _isMounted: false,
    };
    this.email_handleChange = this.email_handleChange.bind(this);
    this.password_handleChange = this.password_handleChange.bind(this);
    this.username_handleChange = this.username_handleChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  // email欄の値をstateに保存
  email_handleChange(event) {
    this.setState({ email: event.target.value });
  }
  // password欄の値をstateに保存
  password_handleChange(event) {
    this.setState({ password: event.target.value });
  }
  // username欄の値をstateに保存
  username_handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleOnSubmit(e) {
    // 入力欄に記入された値
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;

    if (this.state._isMounted) {
      this.setState({ loading: true });
    }

    e.preventDefault();

    // authに追加
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        db.collection('users').doc(result.user.uid).set({ username: username });
        if (this.state._isMounted) {
          this.setState({ loading: false }); //正常終了
          this.props.history.push('/myPage');
          alert('アカウント登録に成功しました');
        }
      })
      .catch((error) => {
        if (this.state._isMounted) {
          this.setState({ loading: false });
          alert(error);
          this.setState({ email: '', password: '' }); //やり直し
          this.props.history.push('signUp');
        }
      });
  }

  componentDidMount() {
    this.state._isMounted = true;
  }

  componentWillUnmount() {
    this.state._isMounted = false;
  }

  render() {
    return (
      <div class="form-wrapper">
        <h1>アカウント作成</h1>
        <form onSubmit={this.handleOnSubmit}>
          <div class="form-item">
            <label for="username"></label>
            <input
              type="username"
              id="username"
              name="username"
              required="required"
              placeholder="ユーザー名"
              value={this.state.username}
              onChange={this.username_handleChange}
            ></input>
          </div>
          <div class="form-item">
            <label for="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              required="required"
              placeholder="メールアドレス"
              value={this.state.email}
              onChange={this.email_handleChange}
            ></input>
          </div>
          <div class="form-item">
            <label for="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              required="required"
              placeholder="パスワード"
              value={this.state.password}
              onChange={this.password_handleChange}
            ></input>
          </div>
          <div class="button-panel">
            <input
              type="submit"
              class="button"
              title="Register"
              value="作成"
            ></input>
          </div>
        </form>
        <div class="form-footer">
          <p>
            <Link to="/signIn" onClick={this.toggleCollapse.bind(this)}>
              ログインする
            </Link>
          </p>
        </div>
      </div>
    );
  }
}
