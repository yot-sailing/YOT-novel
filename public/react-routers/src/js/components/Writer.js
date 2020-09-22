import React from 'react';
import { db } from 'firebase';
import { withRouter } from 'react-router-dom';

class Writer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  handleClick(id) {
    const site = '/author?id=' + id;
    console.log(site);
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
