import React from 'react';
import { withRouter } from 'react-router-dom';
import { db } from '../connectDB';

const dbNews = db.collection('news');

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: [] };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(key) {
    const site = '/newsdetale?id=' + key;
    console.log(site);
    this.props.history.push(site);
  }
  render() {
    const { title } = this.props;
    const { id } = this.props;
    return (
      <a class="list-news" onClick={() => this.handleClick(id)}>
        <div class="list-news-title" name="news_title" id="news_title">
          {title}
        </div>
      </a>
    );
  }
}
export default withRouter(News);
