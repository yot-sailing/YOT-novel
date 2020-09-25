import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import DoneIcon from '@material-ui/icons/Done';
import CreateIcon from '@material-ui/icons/Create';
import { db } from '../connectDB';

class RequestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { request_content: [] };
  }

  doneRequest(key) {
    db.collection('odaibako').doc(key).delete();
    alert('お題箱から削除しました');
    this.props.history.push('/mypage');
  }

  render() {
    const { request_content } = this.props;
    const { id } = this.props;
    return (
      <div class="list-request">
        <CreateIcon
          id="request-write"
          fontSize="large"
          onClick={() => this.props.history.push('/createNovel')}
        />
        {request_content}
        <DoneIcon
          id="request-done"
          fontSize="large"
          onClick={() => this.doneRequest(id)}
        />
      </div>
    );
  }
}
export default withRouter(RequestComponent);
