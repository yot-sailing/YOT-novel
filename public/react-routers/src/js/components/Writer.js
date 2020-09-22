import React from 'react';
import { db } from 'firebase';
import { withRouter } from 'react-router-dom';

// dbRef = db.collection('follow');
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
    dbRef
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          const username = doc.data().username;
          this.setState({ username: username });
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
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
