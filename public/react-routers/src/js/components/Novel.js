import React from 'react';
import firebase, { db } from '../connectDB';

const dbNovel = db.collection('novels');
export default class extends React.Component{
    constructor(props){
        super(props);
        this.state = { name:'', title:'' , text: '' };

        this.handleClick = this.handleClick.bind(this);
        this.getData = this.getData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    getData(uid) {
        dbNovel.doc(uid).get().then(doc => {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
                name = doc.data().name;
                title = doc.data().title;
                // this.state.text = doc.data().text;
                text = doc.data().text;
                this.setState({name:name, title:title, text:text});
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
        const novel_id = query.get(id);
        //普通に取得
        this.getData(novel_id);
    }
    handleClick(e) { 
        dbRef = db.collection('favorites');
        const query = new URLSearchParams(this.props.location.search);
        const novel_id = query.get("id");
        //ここでデータベースに追加
    }
    render() {
        return(
            <div>
                <h2> {this.state.title} </h2>
                <h4> {this.state.name} </h4>
                <button onClick={this.handleClick}>ブックマークに登録する</button>
                <p> { this.state.text} </p>
            </div>
        );
    }
}