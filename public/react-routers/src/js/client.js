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
import createNovel from './pages/createNovel';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';

import Auth from './auth/Auth';

const app = document.getElementById('app');

ReactDOM.render(
    <Router>
        <Layout>
            <Route exact path="/" component={Top}></Route>
            <Route path="/ranking" component={Ranking}></Route>
            <Route path="/search/" component={Search}></Route>
            <Route path="/search/:mode(main|extra)" component={Search}></Route>
            <Route path="/createNovel" component={createNovel}></Route>
            <Route path="/signIn" component={SignIn}></Route>
            <Route path="/signUp" component={SignUp}></Route>
            <Route path="/bookmarks/" component={Bookmarks}></Route>
            <Route path="/history/" component={History}></Route>
            <Route path="/mypage/" component={MyPage}></Route>
        </Layout>
    </Router>
    
    , app
);