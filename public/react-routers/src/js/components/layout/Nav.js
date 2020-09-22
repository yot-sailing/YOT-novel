import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

export default class extends React.Component {
  constructor() {
    super();
    this.state = { collapsed: true, login: 'ログアウト' };
  }
  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }
  componentDidMount(e) {
    const user = firebase.auth().currentUser;
    console.log('user:', user);
    if (user) {
      this.setState({ login: 'ログアウト' });
    } else {
      this.setState({ login: 'ログイン' });
    }
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
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
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

              <Link class="navbar-brand" to="/">
                小説投稿サイト
              </Link>
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
                <li class={bookmarkClass}>
                  <Link
                    to="/bookmarks"
                    onClick={this.toggleCollapse.bind(this)}
                  >
                    お気に入り
                  </Link>
                </li>
                <li class={searchClass}>
                  <Link to="/search" onClick={this.toggleCollapse.bind(this)}>
                    小説を探す
                  </Link>
                </li>
                <li class={historyClass}>
                  <Link
                    to="/history/news?user=1010"
                    onClick={this.toggleCollapse.bind(this)}
                  >
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
                  <Link to="/signIn" onClick={this.toggleCollapse.bind(this)}>
                    {this.state.login}
                  </Link>
                </li>
                <li class={signUpClass}>
                  <Link to="signUp" onClick={this.toggleCollapse.bind(this)}>
                    登録する
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
