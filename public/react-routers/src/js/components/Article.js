import React from 'react';
import {withRouter} from 'react-router-dom';
import firebase, { db } from '../connectDB';

const dbNovel = db.collection("novels");
class Article extends React.Component{
    constructor(props){
        super(props);
        // this.state = {novel_id: ""};
        this.handleClick = this.handleClick.bind(this);
    };
    handleClick(key) {
        const abstract = document.getElementById("abstract").textContent;
        const title = document.getElementById("title").textContent;
        const author = document.getElementById("author").textContent;
        const category = document.getElementById("category").textContent;
        var novel_id = "";
        console.log(abstract, title, category,author);
        novel_id = key;
        const site = "/novel?id=" + novel_id;
        console.log(site);
        // this.props.history.push(site);
        // dbNovel.where("title", "==", title).get().then(querySnapshot => {
        //     querySnapshot.forEach(novel => {
        //         novel_id = novel.id;
        //         console.log(novel_id);
        //         // this.setState({ novel_id: novel.id });
        //         const site = "/novel?id=" + novel_id;
        //         console.log(site);
        //         this.props.history.push(site);
        //     });
        // });

        // 閲覧履歴に加えるため
        var user = firebase.auth().currentUser;
        console.log("閲覧履歴の作業を開始します");
        if(!user){
            // ログインしてなかったらなんもしない
        }else{
            var email = user.email;
            var user_doc_id = [];
            console.log("今ログインしてる人のemailは", email);
            db.collection("users").where("email", "==", email)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    //user_doc_id = doc.id;
                    user_doc_id.push(doc.id);
                    console.log("この時点でログインしてる人のuser_doc_idは", user_doc_id[0]);
                });
                console.log("今ログインしてる人のuser_doc_idは", user_doc_id[0]);
                
                var history_doc_id = [];
                var novel_doc_id = novel_id;
                db.collection("histories")
                .where("user_doc_id", "==", user_doc_id[0])
                .where("novel_doc_id", "==", novel_doc_id)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        //user_doc_id = doc.id;
                        history_doc_id.push(doc.id);
                        console.log("history_doc_idは", history_doc_id[0]);
                    });
                });
                if(!history_doc_id[0]){
                    db.collection("histories").add({
                        novel_doc_id: novel_doc_id,
                        read_at: firebase.firestore.FieldValue.serverTimestamp(),
                        user_doc_id: user_doc_id[0],
                    })
                }else{
                    return db.collection("histories")
                    .doc(history_doc_id[0])
                    .update({
                        read_at: firebase.firestore.FieldValue.serverTimestamp()
                    })
                }
            })
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
                <div class="list-novel-rank" >{ rank }</div>
                <div class="list-novel-content" >
                    <div class="list-novel-show">
                        <div class="list-novel-title" id="title">{ title }</div>
                        <div class="list-novel-info">
                            <div class="list-novel-author" id="author">{ author }</div>
                            <div class="list-novel-cat" id="category">{ category }</div>
                        </div>
                    </div>
                    <div class="list-novel-abst" id="abstract">{abstract}</div>
                </div>
            </button>
        );
    }
}
export default withRouter(Article);