import React from 'react';
import { db } from '../connectDB';
import { withRouter } from 'react-router';

class NewsDetale extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };

    this.getData = this.getData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  // ニュースタイトルを取得する
  getData(nid) {
    db.collection('news')
      .doc(nid)
      .get()
      .then((doc) => {
        // 指定されたidのお知らせを取得して操作
        if (doc.exists) {
          this.setState({ title: doc.data().title });
        } else {
          this.props.history.push('/404');
          return;
          console.log('Cannot find news (in NewsDetail)');
        }
      })
      .catch(function (error) {
        console.log('Error getting document in NewsDetail:', error);
      });
  }

  componentDidMount(e) {
    const query = new URLSearchParams(this.props.location.search);
    const news_id = query.get('id');
    if (news_id == '') {
      this.props.history.push('/404');
      return;
    }
    // 普通に取得
    this.getData(news_id);
  }

  render() {
    return (
      <div>
        <h5> {this.state.title} </h5>
        <a href="/">元に戻る</a>
      </div>
    );
  }
}
export default withRouter(NewsDetale);
