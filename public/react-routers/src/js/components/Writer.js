import React from 'react';
import { db } from 'firebase';
import { withRouter } from 'react-router-dom';

class Writer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  // 各作家のページへの遷移を行う
  handleClick(id) {
    const site = '/author?id=' + id;
    this.props.history.push(site);
  }

  render() {
    const { id } = this.props;
    return (
      <button class="list-writer" onClick={() => this.handleClick(id)}>
        <div class="list-writer-name">
          {this.state.username}　{id}
        </div>
      </button>
    );
  }
}
export default withRouter(Writer);
