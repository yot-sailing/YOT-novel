import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Bookmarks from './pages/Bookmark';
import Settings from './pages/Settings';
import Featured from './pages/Featured';
import History from './pages/History';
import MyPage from './pages/MyPage';

const app = document.getElementById('app');

ReactDOM.render(
    <Router>
        <Layout>
            <Route exact path="/" component={Featured}></Route>
            <Route path="/bookmarks/:article" component={Bookmarks}></Route>
            <Route path="/history/:article" component={History}></Route>
            <Route path="/settings/" component={Settings}></Route>
            <Route path="/mypage/" component={MyPage}></Route>
            <Route path="/settings/:mode(main|extra)" component={Settings}></Route>
        </Layout>
    </Router>, app
);