import React from 'react';
import firebase, { db } from '../connectDB';
import RequestComponent from '../components/RequestComponent';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { request: [] };
    var uid = firebase.auth().currentUser.uid;
    db.collection('odaibako')
      .where('user', '==', uid)
      .orderBy('created', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.state.request.push(
            <RequestComponent
              key={doc.id}
              request_content={doc.data().request_content}
            />
          );
          this.setState({ request: this.state.request });
        });
      });
  }
  render() {
    return (
      <div>
        <div>{this.state.request}</div>
        <button onClick={() => this.props.history.goBack()}>戻る</button>
      </div>
    );
  }
}
