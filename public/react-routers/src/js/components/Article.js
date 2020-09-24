import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase, { db } from '../connectDB';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  //閲覧履歴への追加と、各小説のページへの遷移を行う
  handleClick(novel_id) {
    // 閲覧履歴に加える
    var user = firebase.auth().currentUser;
    if (user) {
      // 自分のID
      var uid = user.uid;
      // 自分の閲覧履歴にクリックした小説があるかを確認
      db.collection('histories')
        .where('user_doc_id', '==', uid)
        .where('novel_doc_id', '==', novel_id)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            // 閲覧履歴に今の小説がなければ、追加する
            db.collection('histories').add({
              novel_doc_id: novel_id,
              read_at: firebase.firestore.FieldValue.serverTimestamp(),
              user_doc_id: uid,
            });
          } else {
            // 閲覧履歴にあれば、閲覧の時刻をアップデート
            querySnapshot.forEach((doc) => {
              // TODO: 複数あったときにどうやって1つ目以外を消すか
              db.collection('histories').doc(doc.id).update({
                read_at: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
          }
        });
    }

    // ページ遷移
    const site = '/novel?id=' + novel_id;
    if (novel_id == '') {
      this.props.history.push('/404');
    }
    this.props.history.push(site);
  }

  render() {
    const { abstract } = this.props;
    const { title } = this.props;
    const { author } = this.props;
    const { category } = this.props;
    const { rank } = this.props;
    const { id } = this.props;
    return (
      <button class="list-novel" onClick={() => this.handleClick(id)}>
        <div class="list-novel-rank">{rank}</div>
        <div class="list-novel-content">
          <div class="list-novel-show">
            <div class="list-novel-title" id="title">
              {title}
            </div>
            <div class="list-novel-info">
              <div class="list-novel-author" id="author">
                {author}
              </div>
              <div class="list-novel-cat" id="category">
                {category}
              </div>
            </div>
          </div>
          <div class="list-novel-abst" id="abstract">
            {abstract}
          </div>
        </div>
      </button>
    );
  }
}
export default withRouter(Article);
