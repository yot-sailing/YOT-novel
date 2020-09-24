import React from 'react';
import { withRouter } from 'react-router-dom';

class RequestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { request_content: [] };
  }

  render() {
    const { request_content } = this.props;
    const { key } = this.props;
    return (
    <div class="list-request">
        <p>
            { request_content }
        </p>
        <button onClick={() => this.props.history.push('/createNovel')}>書く</button>
    </div>
    );
  }
}
export default withRouter(RequestComponent);
