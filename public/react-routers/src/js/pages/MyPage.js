import React from 'react';
import Article from '../components/Article';
import Writer from '../components/Writer';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { Link } from 'react-router-dom';
import firebase, {db} from '../connectDB';

const dbRef = db.collection('novels');
export default class extends React.Component{
    constructor(props) {
      super(props);
      this.state = {collapsed : true,
                    list: [],
                  }
      dbRef.orderBy('created').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            console.log(change.doc.data().title);
            this.state.list.push(
              <Article key={change.doc.id} title={change.doc.data().title} 
                        category={change.doc.data().category} author={change.doc.data().name} 
                        abstract={change.doc.data().overview} id={change.doc.id}/>
            );
            this.setState({list: this.state.list});
          }
        })
      });
    }
    // db.collection('novels')
    // .doc("yT8nzci0regOkGrG7gcS")
    // .delete()

    handleLogout() {
      firebase.auth().signOut();
    }

    toggleCollapse() {
      const collapsed = !this.state.collapsed;
      this.setState({collapsed});
    }
    render(){
        
        const favwriter = [
            "eri",
            "cyumomo"
        ].map((username, i) => <Writer key={i} username={username}/>);

    return (
      <div class="container">
        <ScrollToTopOnMount />
        <h1>マイページ</h1>
        <div class="mypage-contents-title write-novel-title">小説を書く</div>
        <div class="write-button-wrapper">
          <Link to="/createNovel" onClick={this.toggleCollapse.bind(this)}>
            小説を執筆する
          </Link>
        </div>
        <div class="mypage-contents-title  read-novel-title">小説を読む</div>
        <div class="user-information">
          <div class="contents-list favorite-writer">
            <h3>お気に入りユーザー</h3>
            <div class="box-list-yaxis"> {favwriter} </div>
          </div>
          <div class="contents-list wrote-novel">
            <h3 class="mypage-timeline">投稿した小説</h3>
            <div class="box-list-yaxis">{this.state.list}</div>
          </div>
        </div>
        <div class="mypage-contents-title logout-title">ログアウト</div>
        <div class="logout-button-wrapper">
          <button onClick={this.handleLogout}>ログアウト</button>
        </div>
      </div>
    );
  }
}
