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
    alert('このお題は書き終わりました');
    this.props.history.push('/mypage');
  }

  render() {
    const { request_content } = this.props;
    const { id } = this.props;
    return (
      <ul>
        <div id="list-request">
          <p onClick={() => this.props.history.push('/createNovel')}>
            今すぐ書く
            <CreateIcon
              id="request-write"
              fontSize="large"
              onClick={() => this.props.history.push('/createNovel')}
            />
            {request_content}
          </p>
          <p id="request-done-string" onClick={() => this.doneRequest(id)}>
            書き終わったらclick!
            <DoneIcon id="request-done" fontSize="large" />
          </p>
        </div>
      </ul>
    );
  }
}
export default withRouter(RequestComponent);
