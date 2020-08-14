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
                        abstract={change.doc.data().overview} />
            );
            this.setState({list: this.state.list});
          }
        })
      });
    };
    // db.collection('novels')
    // .doc("yT8nzci0regOkGrG7gcS")
    // .delete()

    

    toggleCollapse() {
      const collapsed = !this.state.collapsed;
      this.setState({collapsed});
    }
    render(){
        
        const favwriter = [
            "eri",
            "cyumomo"
        ].map((username, i) => <Writer key={i} username={username}/>);

        const Articles = [
            "投",
            "稿"
        ].map((title, i) => <Article key={i} title={title} author="chumomo" category="ラブストーリー"/>);
       
        return (
          <div class="container">
            <ScrollToTopOnMount />
            <h1>This is your page.</h1>
            <button type="submit" className="waves-effect waves-light btn col">
                <Link
                      to="/createNovel"
                      onClick={this.toggleCollapse.bind(this)}
                    >
                      小説の投稿
                </Link>
            </button>
            <div class="left-side">
              <h3>your favorite writers.</h3>
              <div class="box-list-yaxis"> {favwriter} </div>
            </div>
            <div class="right-side">
              <h3 class="mypage-timeline">your novels</h3>
              <div>
                {this.state.list}
              </div>
              {/* <div class="box-list-yaxis">{Articles}</div> */}
            </div>
            <br />

          </div>
        );
    }
}