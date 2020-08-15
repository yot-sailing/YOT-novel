import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from "react-router-hash-link";

export default class extends React.Component{
    constructor() {
        super();
        this.state = {collapsed : true};
    }
    toggleCollapse() {
        const collapsed = !this.state.collapsed;
        this.setState({collapsed});
    }
    render() {
        const topClass = location.pathname === "/" ? "active" : "";
        const bookmarkClass = location.pathname.match(/^\/bookmarks/) ? "active" : "";
        const historyClass = location.pathname.match(/^\/history/) ? "active" : "";
        const searchClass = location.pathname.match(/^\/search/) ? "active" : "";
        const mypageClass = location.pathname.match(/^\/mypage/) ? "active" : "";
        const signInClass = location.pathname.match(/^\/signIn/) ? "active" : "";
        const signUpClass = location.pathname.match(/^\/signUp/) ? "active" : "";

        return (
          <footer>
            <div class="to-the-top-container">
              <HashLink smooth to="#top-link" class="to-the-top">
                ⬆️　to the top
              </HashLink>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <h2 class="footer-main">YOT</h2>
                <ul class="footer-menu">
                  <li class={topClass}>
                    <Link to="/ranking" onClick={this.toggleCollapse.bind(this)}>
                      ranking
                    </Link>
                  </li>
                  <li class={bookmarkClass}>
                    <Link
                      to="/bookmarks/news?date=today&filter=none"
                      onClick={this.toggleCollapse.bind(this)}
                    >
                      bookmark
                    </Link>
                  </li>
                  <li class={searchClass}>
                    <Link
                      to="/search"
                      onClick={this.toggleCollapse.bind(this)}
                    >
                      search
                    </Link>
                  </li>
                  <li class={historyClass}>
                    <Link
                      to="/history/news?user=1010"
                      onClick={this.toggleCollapse.bind(this)}
                    >
                      your history
                    </Link>
                  </li>
                  <br />
                  <li class={signInClass}>
                    <Link
                        to="/signIn"
                        onClick={this.toggleCollapse.bind(this)}
                      >
                        sign in
                    </Link>
                  </li>
                  <li class={signUpClass}>
                    <Link to="signUp"
                    onClick={this.toggleCollapse.bind(this)}
                    >
                      sign up
                    </Link>
                  </li>
                  <li class={mypageClass}>
                    <Link to="/mypage" onClick={this.toggleCollapse.bind(this)}>
                      mypage
                    </Link>
                  </li>
                  <li>about this </li>
                  <br />
                </ul>
                <p>Cooyright &cooy; yot.net</p>
              </div>
            </div>
          </footer>
        );
    }
}