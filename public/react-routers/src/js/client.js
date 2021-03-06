import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import Novel from './pages/Novel';
import NotFound from './pages/NotFound';
import noPage from './pages/404';
import NewsDetale from './pages/NewsDetale';
import Author from './pages/Author';
import Request from './pages/Request';
import createRequest from './pages/createRequest';
const app = document.getElementById('app');

ReactDOM.render(
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={Top}></Route>
        <Route path="/404" component={noPage}></Route>
        <Route path="/ranking" component={Ranking}></Route>
        <Route path="/search" component={Search}></Route>
        <Route path="/createNovel" component={createNovel}></Route>
        <Route path="/signIn" component={SignIn}></Route>
        <Route path="/signUp" component={SignUp}></Route>
        <Route path="/novel" component={Novel}></Route>
        <Route path="/newsdetale" component={NewsDetale}></Route>
        <Route path="/author" component={Author}></Route>
        <Route path="/createrequest" component={createRequest}></Route>
        <Route path="/request" component={Request}></Route>
        <Auth>
          <Switch>
            <Route path="/bookmarks/" component={Bookmarks}></Route>
            <Route path="/history/" component={History}></Route>
            <Route path="/mypage/" component={MyPage}></Route>
            <Route component={NotFound} />
          </Switch>
        </Auth>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Router>,
  app
);
