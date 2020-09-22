import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../connectDB';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signinCheck: false, //ログインチェックが完了してるか
      signedIn: false, //ログインしてるか
      _isMounted: false, //unmountを判断（エラー防止用）
    };
  }

  componentDidMount() {
    //mountされてる
    this.setState({ _isMounted: true });

    //ログインしてるかどうかチェック
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //してる
        if (this.state._isMounted) {
          this.setState({
            signinCheck: true,
            signedIn: true,
          });
        }
      } else {
        //してない
        if (this.state._isMounted) {
          this.setState({
            signinCheck: true,
            signedIn: false,
          });
        }
      }
    });
  }

  componentWillUnmount() {
    this.setState({ _isMounted: false });
  }

  render() {
    //チェックが終わってないなら（ローディング表示）
    if (!this.state.signinCheck) {
      return (
        <LoadingOverlay active={true} spinner text="Loading...">
          <div style={{ height: '100vh', width: '100vw' }}></div>
        </LoadingOverlay>
      );
    }

    //チェックが終わりかつ
    if (this.state.signedIn) {
      //サインインしてるとき（そのまま表示）
      return this.props.children;
    } else {
      //してないとき（ログイン画面にリダイレクト）
      return (
        <div>
          <Link to="/signin">ログインしてください</Link>
        </div>
      );
    }
  }
}

export default Auth;
