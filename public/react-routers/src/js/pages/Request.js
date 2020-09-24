import React from 'react';
import firebase, { db } from '../connectDB';
import createNovel from './createNovel';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { request: [] };
    var uid = firebase.auth().currentUser.uid;
    db.collection('odaibako')
      .where('user', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.state.request.push(
            <div>
              <p>{doc.data().request_content}</p>
              <button onClick={() => this.props.history.push('/createNovel')}>
                書く
              </button>
            </div>
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
