import React from 'react';
import firebase, { db } from '../connectDB';
import { withRouter } from 'react-router';
import ReactStarsRating from 'react-awesome-stars-rating';

class Novel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', title: '', text: '', add: false, value: 0, isEdit: true, comment: '' };

    this.handleClickBookMark = this.handleClickBookMark.bind(this);
    this.getData = this.getData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 小説データを取得する
  getData(novel_id) {
    db.collection('novels')
      .doc(novel_id)
      .get()
      .then((doc) => {
        // 指定されたidの小説を取得して操作
        if (doc.exists) {
          // 指定されたidの小説の情報をstateにセット
          const name = doc.data().name;
          const title = doc.data().title;
          const text = doc.data().text;
          this.setState({ name: name, title: title, text: text });
        } else {
          console.log('Cannot find novel (in Novel)');
        }
      })
      .catch(function (error) {
        console.log('Error getting document in Novel getData:', error);
      });
  }

  componentDidMount(e) {
    // 見ている小説のIDをURLのパラメータから取得
    const query = new URLSearchParams(this.props.location.search);
    const novel_id = query.get('id');
    // 小説データ取得
    this.getData(novel_id);
  }

  // ブックマーク登録
  handleClickBookMark(e) {
    // 見ている小説のIDをURLのパラメータから取得
    const query = new URLSearchParams(this.props.location.search);
    const novel_id = query.get('id');

    // 今ログイン中のユーザーのデータを取得
    var user = firebase.auth().currentUser;
    var user_doc_id = [];

    e.preventDefault();
    // お気に入り登録
    db.collection('users')
      .where('email', '==', user.email)
      .get()
      .then((querySnapshot) => {
        // usersのなかで、今ログインしている人と同じemailアドレスの人のidをuser_doc_idにリストアップ(使うのは一つだけ)
        querySnapshot.forEach((doc) => {
          user_doc_id.push(doc.id);
        });
        // user_doc_idの一つ目の人のお気に入りに今の小説を追加
        db.collection('bookmarks')
          .add({
            novel_doc_id: novel_id,
            user_doc_id: user_doc_id[0],
          })
          .then(function () {
            // 追加できたらアラート表示
            alert('ブックマークに追加しました');
          })
          .catch(function (error) {
            // 追加時にエラーが起きたら出力・アラート表示
            console.error(
              'Error adding document in Novel add bookmarks: ',
              error
            );
            alert('ブックマーク登録に失敗しました。');
          });
      });
  }
  onChange(value) {
    this.setState({
      value,
      isEdit: false,
      selectedValue: value,
    });
  }
  handleChange(e) {
    this.setState({comment: e.target.value});
  }
  handleSubmit(e) {
    
  }

  render() {
    const { isEdit, value, selectedValue } = this.state;
    return (
      <div class="novel-read-page">
        <div class="novel-info">
          <div class="novel-title-fav">
            <div class="novel-title"> {this.state.title} </div>
            <button class="novel-bookmark" onClick={this.handleClickBookMark}>
              <div class="star-fav"></div>
              <div class="message">ブックマークに登録</div>
            </button>
          </div>
          <div class="author-name"> {this.state.name} </div>
        </div>
        <div class="novel-content"> {this.state.text} </div>
        <form class="novel-evaluation" onSubmit={this.handleSubmit}>
          <div class="novel-evaluation-title">評価を投稿する</div>
          <div class="novel-evaluation-rating">
            <ReactStarsRating
              onChange={this.onChange}
              isEdit={isEdit}
              value={value}
              selectedValue={selectedValue}
            />
            <div>Selected value: {selectedValue}</div>
            <div class="rating off">★</div>
            <div class="rating off">★</div>
            <div class="rating off">★</div>
            <div class="rating off">★</div>
            <div class="rating off">★</div>
          </div>
          <div class="novel-evaluation-comment">
            <div>コメント</div>
            <textarea type="text" id="comment" placeholder="コメント" value={this.state.comment} onChange={this.handleChange}/>
          </div>
          <button class="evaluate-post-button">投稿</button>
        </form>
        <div class="buck-button-wrapper">
          <button
            class="buck-button"
            onClick={() => this.props.history.goBack()}
          >
            &lt;&lt;戻る
          </button>
        </div>
      </div>
    );
  }
}
export default withRouter(Novel);
