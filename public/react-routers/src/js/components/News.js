import React from 'react';
import { withRouter } from 'react-router-dom';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: [] };

    this.handleClick = this.handleClick.bind(this);
  }

  // 各お知らせページへの遷移を行う
  handleClick(key) {
    const site = '/newsdetale?id=' + key;
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
