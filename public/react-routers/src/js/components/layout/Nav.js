import React from 'react';
import { Link } from 'react-router-dom';

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
        const { location } = this.props;
        const { collapsed } = this.state;
        const topClass = location.pathname === "/" ? "active" : "";
        const rankingClass = location.pathname.match(/^\/ranking/) ? "active" : "";
        const bookmarkClass = location.pathname.match(/^\/bookmarks/) ? "active" : "";
        const historyClass = location.pathname.match(/^\/history/) ? "active" : "";
        const searchClass = location.pathname.match(/^\/search/) ? "active" : "";
        const mypageClass = location.pathname.match(/^\/mypage/) ? "active" : "";
        const navClass = collapsed ? "collapse" : ""; 
        return (
          <header>
            <nav
              class="navbar navbar-inverse navbar-fixed-top"
              role="navigation"
            >
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
                  <a class="navbar-brand" href="#">
                    Hi, YOT
                  </a>
                </div>
                <div
                  class={"navbar-collapse " + navClass}
                  id="bs-example-navbar-collapse-1"
                >
                  <div class="header-menu">
                    <ul class="sign-menu">
                      <li>sign in</li>
                      <li>sign up</li>
                    </ul>
                  </div>
                  <ul class="nav navbar-nav">
                    <li class={topClass}>
                      <Link to="/" onClick={this.toggleCollapse.bind(this)}>
                        TopPage
                      </Link>
                    </li>
                    <li class={topClass}>
                      <Link to="/ranking" onClick={this.toggleCollapse.bind(this)}>
                        Ranking
                      </Link>
                    </li>
                    <li class={bookmarkClass}>
                      <Link
                        to="/bookmarks/news?date=today&filter=none"
                        onClick={this.toggleCollapse.bind(this)}
                      >
                        BookMark
                      </Link>
                    </li>
                    <li class={searchClass}>
                      <Link
                        to="/search"
                        onClick={this.toggleCollapse.bind(this)}
                      >
                        Search
                      </Link>
                    </li>
                    <li class={historyClass}>
                      <Link
                        to="/history/news?user=1010"
                        onClick={this.toggleCollapse.bind(this)}
                      >
                        yourHistory
                      </Link>
                    </li>
                    <li class={mypageClass}>
                      <Link
                        to="/mypage"
                        onClick={this.toggleCollapse.bind(this)}
                      >
                        Mypage
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