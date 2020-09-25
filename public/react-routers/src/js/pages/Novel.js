import React from 'react';
import firebase, { db } from '../connectDB';
import { withRouter } from 'react-router';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Link } from 'react-router-dom';
import FavoriteIcon from '../../../node_modules/@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { styled } from '../../../node_modules/@material-ui/core/styles';
import Button from '../../../node_modules/@material-ui/core/Button';
import RubyText from '../components/RubyText';

const MyHeart = styled(FavoriteIcon)({
  color: 'red',
  fontSize: 'large',
  '&:hover': {
    background: '#317eac',
    fontSize: 22,
  },
});
const MyButton = styled(Button)({
  background: '#317eac',
  fontSize: 14,

  '&:hover': {
    background: '#317eac',
  },
  border: 0,
  borderRadius: 2,
  boxShadow: '1px 1px 1px #022a50',
  color: 'white',
  height: 28,
  padding: '10 10px',
  margin: '10px',
});


class Novel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      title: '',
      text: '',
      add: false,
      value: 0,
      isEdit: true,
      comment: '',
      novel_id: '',
      isFavorite: false,
      reviews: [],
      show_review: true,
      rating: '',
      isLoggedIn: true,
      authorId: '',
      site: '',
      sameUser: false,
    };

    this.handleClickBookMark = this.handleClickBookMark.bind(this);
    this.getData = this.getData.bind(this);
    this.getFavDiv = this.getFavDiv.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInitialize = this.handleInitialize.bind(this);
    this.handleReview = this.handleReview.bind(this);
  }

  // 小説データを取得する
  async getData(novel_id) {
    var aId;
    await db
      .collection('novels')
      .doc(novel_id)
      .get()
      .then((doc) => {
        // 指定されたidの小説を取得して操作
        if (doc.exists) {
          // 指定されたidの小説の情報をstateにセット
          const name = doc.data().name;
          const title = doc.data().title;
          const text = doc.data().text;
          const authorId = doc.data().author_id;
          aId = authorId;
          this.setState({
            name: name,
            title: title,
            text: text,
            rating: doc.data().rating,
            authorId: authorId,
            site: '/author?id=' + authorId,
          });
        } else {
          this.props.history.push('/404');
          return;
          console.log('Cannot find novel (in Novel)');
        }
      })
      .catch(function (error) {
        console.log('Error getting document in Novel getData:', error);
      });

    // お気に入りかどうかを確認
    var uid = '';
    var user = await firebase.auth().currentUser;
    if (user) {
      // ログインしている
      uid = await firebase.auth().currentUser.uid;
    } else {
      // ログインしていない
    }

    if (aId == uid) {
      this.setState({ sameUser: true });
    }

    await db
      .collection('bookmarks')
      .where('user_doc_id', '==', uid)
      .where('novel_doc_id', '==', novel_id)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          // お気に入りではない
          this.setState({ isFavorite: false });
        } else {
          // お気に入り
          this.setState({ isFavorite: true });
        }
      })
      .catch(function (error) {
        console.log('Error check bookmark in Novel getData:', error);
      });
  }

  componentDidMount(e) {
    // 見ている小説のIDをURLのパラメータから取得
    const query = new URLSearchParams(this.props.location.search);
    const novel_id = query.get('id');
    if (novel_id == '') {
      this.props.history.push('/404');
      return;
    }
    this.setState({ novel_id: novel_id });
    // 小説データ取得
    this.getData(novel_id);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  // ブックマーク登録
  handleClickBookMark(e) {
    const novel_id = this.state.novel_id;
    if (novel_id == '') {
      this.props.history.push('/404');
      return;
    }

    // 自分のID
    var uid = firebase.auth().currentUser.uid;

    e.preventDefault();
    // お気に入り登録
    db.collection('bookmarks')
      .where('user_doc_id', '==', uid)
      .where('novel_doc_id', '==', novel_id)
      .get()
      .then((favoriteQuerySnapshot) => {
        if (favoriteQuerySnapshot.empty) {
          // まだお気に入りに入れていないなら、今の小説を追加
          db.collection('bookmarks')
            .add({
              novel_doc_id: novel_id,
              user_doc_id: uid,
            })
            .then(() => {
              this.setState({ isFavorite: true });
              // 追加できたらアラート表示
              alert('お気に入りに追加しました');
            })
            .catch(function (error) {
              // 追加時にエラーが起きたら出力・アラート表示
              console.error(
                'Error adding document in Novel add bookmarks: ',
                error
              );
              alert('お気に入り登録に失敗しました。');
            });
        } else {
          // お気に入り済みなら、今の小説は削除
          favoriteQuerySnapshot.forEach((favdoc) => {
            db.collection('bookmarks').doc(favdoc.id).delete();
            this.setState({ isFavorite: false });
          });
          alert('お気に入り解除しました。');
        }
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
    this.setState({ comment: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const novel_id = this.state.novel_id;
    const rate_one = this.state.selectedValue;
    const review = this.state.comment;
    var new_rate = 1;
    if (rate_one == '' && review == '') {
      return;
    }
    db.collection('novels')
      .doc(novel_id)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var eval_num = doc.data().eval_num;
          if (eval_num == null || rate_one == '') {
            eval_num = 1;
            new_rate = rate_one;
          } else {
            new_rate =
              (doc.data().rating * eval_num + rate_one) / (eval_num + 1);
            new_rate = Math.round(new_rate * 10) / 10; //小数第２位で四捨五入
          }
          console.log('Document data:', new_rate);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
          return;
        }
        db.collection('novels')
          .doc(novel_id)
          .update({
            rating: new_rate,
            review: firebase.firestore.FieldValue.arrayUnion(review),
            eval_num: firebase.firestore.FieldValue.increment(1),
          })
          .then(function () {
            console.log('Document successfully updated!');
            alert('投稿できました、ありがとうございます');
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error('Error updating document: ', error);
          });
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
        return;
      });
    this.props.history.push('');
  }
  handleInitialize(e) {
    this.setState({ value: 0, selectedValue: '', comment: '', isEdit: true });
  }

  getFavDiv() {
    if (this.state.isFavorite) {
      return (
        <div class="message fav">
          <span class="nomal">お気に入り済み</span>
          <span class="hover">お気に入り解除</span>
        </div>
      );
    } else {
      return <div class="message notfav">お気に入りに登録する</div>;
    }
  }
  handleReview(e) {
    const novel_id = this.state.novel_id;
    var lists = [];
    if (this.state.show_review) {
      db.collection('novels')
        .doc(novel_id)
        .get()
        .then((doc) => {
          lists = doc.data().review;
          lists.forEach((review) => {
            this.state.reviews.push(review);
            this.setState({ reviews: this.state.reviews });
          });
        });
      this.setState({ show_review: !this.state.show_review });
    } else {
      this.setState({ show_review: !this.state.show_review });
      this.setState({ reviews: [] });
    }
  }
  Reviewer(reviews) {
    const listReviews = reviews.map((review) => (
      <li>
        <PersonIcon color="primary" />
        {''}
        {review}
      </li>
    ));
    return <ul>a{listReviews}</ul>;
  }

  render() {
    const { isEdit, value, selectedValue } = this.state;
    return (
      <div class="novel-read-page">
        <div class="novel-info">
          {this.state.isLoggedIn ? (
            <button class="novel-bookmark" onClick={this.handleClickBookMark}>
              {/* <MyHeart /> */}
              <div class="star-fav"></div>
              {this.getFavDiv()}
            </button>
          ) : (
            <h5>
              お気に入りに登録するには<Link to="/signIn">ログイン</Link>
              してください
            </h5>
          )}
          <div class="novel-title-fav">
            <div class="novel-title"> {this.state.title} </div>
          </div>
          <div class="author-name">
            <Link to={this.state.site}>{this.state.name}</Link>
          </div>
        </div>
        <div class="novel-content">
          <RubyText plainText={this.state.text}></RubyText>
        </div>
        <br />
        {this.state.sameUser ? (
          <div class="novel-sameUser">
            <hr align="center"></hr>
            自分が書いた小説にレビューすることはできません。
          </div>
        ) : (
          <form class="novel-evaluation" onSubmit={this.handleSubmit}>
            <br />
            <div class="novel-evaluation-title">評価を投稿する</div>
            <div class="novel-evaluation-rating">
              <ReactStarsRating
                onChange={this.onChange}
                isEdit={isEdit}
                value={value}
                selectedValue={selectedValue}
              />
              <div>Selected value: {selectedValue}</div>
            </div>
            <div class="novel-evaluation-comment">
              <textarea
                type="text"
                id="comment"
                placeholder="コメント"
                value={this.state.comment}
                onChange={this.handleChange}
              />
            </div>
            {/* 投稿できない問題解決してないから無効化しておく
            <MyButton>投稿</MyButton>
            <MyButton onClick={this.handleInitialize}>クリア</MyButton> */}
            <button class="evaluate-post-button">投稿</button>
            <button onClick={this.handleInitialize}>クリア</button>
            <br />
          </form>
        )}
        <br />
        <div class="now-eval">
          <div class="now-eval-str">現在の評価 : {this.state.rating}</div>
          <br />
          <button onClick={this.handleReview}>
            {this.state.show_review ? '他のレビューを見る' : 'レビューを隠す'}
          </button>
          　
          <br />
          {this.state.reviews.map((review) => (
          <ul id="reviews-list">
            <PersonPinIcon fontSize="large" id="review-person" /> {''}
            {review}
          </ul>
        　))}
         
          <div class="buck-button-wrapper">
            <button
              class="buck-button"
              onClick={() => this.props.history.goBack()}
            >
              &lt;&lt;戻る
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Novel);
