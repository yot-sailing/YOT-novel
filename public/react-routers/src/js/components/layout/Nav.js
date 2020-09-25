import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';

export default class extends React.Component {
  constructor() {
    super();
    this.state = { collapsed: true, isLoggedIn: true };
  }
  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  // ログアウト処理
  handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // logout success
        alert('ログアウトしました');
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const topClass = location.pathname === '/' ? 'active' : '';
    const rankingClass = location.pathname.match(/^\/ranking/) ? 'active' : '';
    const bookmarkClass = location.pathname.match(/^\/bookmarks/)
      ? 'active'
      : '';
    const historyClass = location.pathname.match(/^\/history/) ? 'active' : '';
    const searchClass = location.pathname.match(/^\/search/) ? 'active' : '';
    const mypageClass = location.pathname.match(/^\/mypage/) ? 'active' : '';
    const signInClass = location.pathname.match(/^\/signIn/) ? 'active' : '';
    const signUpClass = location.pathname.match(/^\/signUp/) ? 'active' : '';
    const navClass = collapsed ? 'collapse' : '';

    return (
      <header>
        <Navbar className="navbar-color">
          <Navbar.Brand href="/">
            <img src="../../emblemmatic-roman-logo-237.png" width="100" />
          </Navbar.Brand>
          <Nav className="header-menu">
            <li class={topClass}>
              <Link to="/" onClick={this.toggleCollapse.bind(this)}>
                トップページ
              </Link>
            </li>
            <li class={rankingClass}>
              <Link to="/ranking" onClick={this.toggleCollapse.bind(this)}>
                ランキング
              </Link>
            </li>
            <li class={searchClass}>
              <Link to="/search" onClick={this.toggleCollapse.bind(this)}>
                小説を探す
              </Link>
            </li>
            <li class={bookmarkClass}>
              <Link to="/bookmarks" onClick={this.toggleCollapse.bind(this)}>
                お気に入り
              </Link>
            </li>
            <li class={historyClass}>
              <Link to="/history" onClick={this.toggleCollapse.bind(this)}>
                閲覧履歴
              </Link>
            </li>
            <li class={mypageClass}>
              <Link to="/mypage" onClick={this.toggleCollapse.bind(this)}>
                マイページ
              </Link>
            </li>
          </Nav>
          <ul class="nav navbar-nav sign-menu">
            <li class={signInClass}>
              {this.state.isLoggedIn ? (
                <Link
                  class="navlogout"
                  to="/"
                  onClick={(this.toggleCollapse.bind(this), this.handleLogout)}
                >
                  ログアウト
                </Link>
              ) : (
                <Link
                  class="navlogin"
                  to="/signIn"
                  onClick={this.toggleCollapse.bind(this)}
                >
                  ログイン
                </Link>
              )}
            </li>
            <li class={signUpClass}>
              {this.state.isLoggedIn ? (
                ''
              ) : (
                <Link
                  class="navreg"
                  to="signUp"
                  onClick={this.toggleCollapse.bind(this)}
                >
                  登録する
                </Link>
              )}
            </li>
          </ul>
        </Navbar>
        <br />
      </header>
    );
  }
}
{
  /* <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div class="container">
            <div class="navbar-header">
              <button
                type="button"
                class="navbar-toggle"
                onClick={this.toggleCollapse.bind(this)}
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div
              class={'navbar-collapse ' + navClass}
              id="bs-example-navbar-collapse-1"
            >
              <ul class="nav navbar-nav">
                <li class={topClass}>
                  <Link to="/" onClick={this.toggleCollapse.bind(this)}>
                    トップページ
                  </Link>
                </li>
                <li class={rankingClass}>
                  <Link to="/ranking" onClick={this.toggleCollapse.bind(this)}>
                    ランキング
                  </Link>
                </li>
                <li class={searchClass}>
                  <Link to="/search" onClick={this.toggleCollapse.bind(this)}>
                    小説を探す
                  </Link>
                </li>
                <li class={bookmarkClass}>
                  <Link
                    to="/bookmarks"
                    onClick={this.toggleCollapse.bind(this)}
                  >
                    お気に入り
                  </Link>
                </li>
                <li class={historyClass}>
                  <Link to="/history" onClick={this.toggleCollapse.bind(this)}>
                    閲覧履歴
                  </Link>
                </li>
                <li class={mypageClass}>
                  <Link to="/mypage" onClick={this.toggleCollapse.bind(this)}>
                    マイページ
                  </Link>
                </li>
              </ul>
              <ul class="nav navbar-nav sign-menu">
                <li class={signInClass}>
                  {this.state.isLoggedIn ? (
                    <Link
                      to="/"
                      onClick={
                        (this.toggleCollapse.bind(this), this.handleLogout)
                      }
                    >
                      ログアウト
                    </Link>
                  ) : (
                    <Link to="/signIn" onClick={this.toggleCollapse.bind(this)}>
                      ログイン
                    </Link>
                  )}
                </li>
                <li class={signUpClass}>
                  {this.state.isLoggedIn ? (
                    ''
                  ) : (
                    <Link to="signUp" onClick={this.toggleCollapse.bind(this)}>
                      登録する
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav> */
}
