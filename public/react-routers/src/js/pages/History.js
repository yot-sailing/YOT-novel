import React from 'react';
import Article from '../components/Article';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import firebase, { db } from '../connectDB';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      list: [],
    };

    var user = firebase.auth().currentUser;
    var email = user.email;
    var user_doc_id = [];
    console.log('今ログインしてる人のemailは', email);
    db.collection('users')
      .where('email', '==', email)
      .get()
      // .then(doc => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id);
      //   // console.log(doc.id, " => ", doc.data());
      //   user_doc_id = doc.id;
      // });
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          //user_doc_id = doc.id;
          user_doc_id.push(doc.id);
          console.log(
            'この時点でログインしてる人のuser_doc_idは',
            user_doc_id[0]
          );
        });
        console.log('今ログインしてる人のuser_doc_idは', user_doc_id[0]);
        const historyRef = db
          .collection('histories')
          .limit(5)
          .where('user_doc_id', '==', user_doc_id[0]);
        const snapshots = historyRef.get();
        snapshots.then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());
            var novel_doc_id = doc.data().novel_doc_id;
            const novelRef = db.collection('novels').doc(novel_doc_id);
            novelRef.get().then((doc) => {
              this.state.list.push(
                <Article
                  key={doc.id}
                  title={doc.data().title}
                  category={doc.data().category}
                  author={doc.data().name}
                  abstract={doc.data().overview}
                  id={doc.id}
                />
              );
              this.setState({ list: this.state.list });
            });
          });
        });
      });
  }
  render() {
    const query = new URLSearchParams(this.props.location.search);
    const { article } = this.props.match.params;
    const user = query.get('user');

    return (
      <div class="history-page contents-list history">
        <ScrollToTopOnMount />
        <div class="history-title-wrapper">
          <h1 class="history">History</h1>
          <p>最近5件を表示しています.</p>
        </div>
        <div class="box-list-yaxis">{this.state.list}</div>
      </div>
    );
  }
}
