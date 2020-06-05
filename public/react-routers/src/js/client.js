import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Bookmarks from './pages/Bookmark';
import Search from './pages/Search';
import Top from './pages/Top';
import History from './pages/History';
import MyPage from './pages/MyPage';
import Ranking from './pages/Ranking';

const app = document.getElementById('app');

ReactDOM.render(
    <Router>
        <Layout>
            <Route exact path="/" component={Top}></Route>
            <Route path="/ranking" component={Ranking}></Route>
            <Route path="/bookmarks/:article" component={Bookmarks}></Route>
            <Route path="/history/:article" component={History}></Route>
            <Route path="/search/" component={Search}></Route>
            <Route path="/mypage/" component={MyPage}></Route>
            <Route path="/search/:mode(main|extra)" component={Search}></Route>
        </Layout>
    </Router>, app
);