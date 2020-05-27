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
        const featuredClass = location.pathname === "/" ? "active" : "";
        const bookmarkClass = location.pathname.match(/^\/bookmarks/) ? "active" : "";
        const historyClass = location.pathname.match(/^\/history/) ? "active" : "";
        const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
        const mypageClass = location.pathname.match(/^\/mypage/) ? "active" : "";
        const navClass = collapsed ? "collapse" : ""; 
        return (
            <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)}>
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    </button>
                </div>
                <div class={"navbar-collapse " + navClass } id="bs-example-navbar-collapse-1">
                    <div class="header-menu">
                        <h1>Hi, YOT</h1>
                        <ul class="sign-menu">
                        <li>sign in</li>
                        <li>sign up</li>
                        </ul>
                    </div>
                    <ul class="nav navbar-nav">
                    <li class={featuredClass}>
                        <Link to="/" onClick={this.toggleCollapse.bind(this)}>Ranking</Link>
                    </li>
                    <li class={bookmarkClass}>
                        <Link to="/bookmarks/news?date=today&filter=none" onClick={this.toggleCollapse.bind(this)}>BookMark</Link>
                    </li>
                    <li class={settingsClass}>
                        <Link to="/settings" onClick={this.toggleCollapse.bind(this)}>Search</Link>
                    </li>
                    <li class={historyClass}>
                        <Link to="/history/news?user=1010" onClick={this.toggleCollapse.bind(this)}>yourHistory</Link>
                    </li>
                    <li class={mypageClass}>
                        <Link to="/mypage" onClick={this.toggleCollapse.bind(this)}>Mypage</Link>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
        );
    }
}