import React from 'react';
import { withRouter } from 'react-router-dom';

class Writer extends React.Component {
  constructor(props) {
    super(props);
  }

  // 各作家のページへの遷移を行う
  handleClick(id) {
    const site = '/author?id=' + id;
    if (id == '') {
      this.props.history.push('404');
    }
    this.props.history.push(site);
  }

  render() {
    const { id } = this.props;
    const { username } = this.props;
    return (
      <button class="list-writer" onClick={() => this.handleClick(id)}>
        <div class="list-writer-name">{username}</div>
      </button>
    );
  }
}
export default withRouter(Writer);
