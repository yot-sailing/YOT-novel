import React from 'react';
import firebase , { db } from '../connectDB';
import { withRouter } from 'react-router';

const dbNovel = db.collection('novels');
class Novel extends React.Component{
    constructor(props){
        super(props);
        this.state = { name:'', title:'' , text: '', add:false };

        this.handleClick = this.handleClick.bind(this);
        this.getData = this.getData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    getData(uid) {
        dbNovel.doc(uid).get().then(doc => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                const name = doc.data().name;
                const title = doc.data().title;
                // this.state.text = doc.data().text;
                const text = doc.data().text;
                this.setState({name:name, title:title, text:text});
                console.log(this.state.title);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
    componentDidMount(e)  {
        const query = new URLSearchParams(this.props.location.search);
        const novel_id = query.get("id");
        //普通に取得
        this.getData(novel_id);
    }
    handleClick(e) { 
        const query = new URLSearchParams(this.props.location.search);
        const novel_id = query.get("id");
        //   user_doc_id = doc.id;
        var user = firebase.auth().currentUser;
        var email = user.email;
        //var uid = user.uid;
        var user_doc_id = [];
        e.preventDefault();
        console.log("今ログインしてる人のemailは", email);
        db.collection("users").where("email", "==", email)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                //user_doc_id = doc.id;
                user_doc_id.push(doc.id);
                console.log("この時点でログインしてる人のuser_doc_idは", user_doc_id[0]);
            });
            console.log("今ログインしてる人のuser_doc_idは", user_doc_id[0]);
            db.collection('bookmarks').add({
                novel_doc_id: novel_id,
                user_doc_id:user_doc_id[0],
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                alert("ブックマークに追加しました");
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        });
    }
    render() {

        return (
          <div class="novel-read-page">
            <div class="novel-info">
              <div class="novel-title-fav">
                <div class="novel-title"> {this.state.title} </div>
                <button class="novel-bookmark" onClick={this.handleClick}>
                  <div class="star-fav"></div>
                  <div class="message">ブックマークに登録</div>
                </button>
              </div>
              <div class="author-name"> {this.state.name} </div>
            </div>
            <div class="novel-content"> {this.state.text} </div>
            <div class="novel-evaluation">
              <div class="novel-evaluation-title">評価を投稿する</div>
              <div class="novel-evaluation-rating">
                <div class="rating off">★</div>
                <div class="rating off">★</div>
                <div class="rating off">★</div>
                <div class="rating off">★</div>
                <div class="rating off">★</div>
              </div>
              <div class="novel-evaluation-comment">
                <div>コメント</div>
                <textarea type="text" id="comment" placeholder="コメント" />
              </div>
              <button class="evaluate-post-button">投稿</button>
            </div>
            <div class="buck-button-wrapper">
              <button class="buck-button" onClick={() => this.props.history.goBack()}>
                &lt;&lt;戻る
              </button>
            </div>
          </div>
        );
    }
}
export default withRouter(Novel);