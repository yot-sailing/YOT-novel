import React from 'react';
import firebase , { db } from '../connectDB';
import { withRouter } from 'react-router';

const dbRef = db.collection('users');
class Novel extends React.Component{
    constructor(props){
        super(props);
        this.state = { username:''};

        this.handleClick = this.handleClick.bind(this);
        this.getData = this.getData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    getData(uid) {
        dbRef.doc(uid).get().then(doc => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                const username = doc.data().username;
                this.setState({username:username});
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
    }
    render() {
        return (
          <div >
                <div class="list-writer-name" >{ this.state.username }</div>
                <button onClick={() => this.props.history.goBack()}>戻る</button>
          </div>
        );
    }
}
export default withRouter(Novel);