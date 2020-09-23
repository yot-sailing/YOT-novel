import React from 'react';
import firebase, { db } from '../connectDB';
import createNovel from './createNovel';

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = { request : []}
    var user = firebase.auth().currentUser;
    console.log(user)
    var username = []
    var user_id = []
    db.collection('users').where('email', '==', user.email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        username.push(doc.data().username);
        user_id.push(doc.id);
      });
      db.collection('odaibako').where('user', '==', user_id[0]).get().then((querySnapshot) =>{
        querySnapshot.forEach((doc) => {
          this.state.request.push(<div><p>{doc.data().request}</p><button onClick={() => this.props.history.push('/createNovel')}>書く</button></div>);
          this.setState({request: this.state.request});
        });
      });
    });
  }
  render() {
    return <div>
      <div>{this.state.request}</div>
      <button onClick={() => this.props.history.goBack()}>戻る</button>
    </div>;
  }
}
