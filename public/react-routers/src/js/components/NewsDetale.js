import React from 'react';
import { db } from '../connectDB';
import { withRouter } from 'react-router';

const dbNews = db.collection('news');
class NewsDetale extends React.Component{
    constructor(props){
        super(props);
        this.state = { title:''};

        this.getData = this.getData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    getData(uid) {
        dbNews.doc(uid).get().then(doc => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                const title = doc.data().title;
                this.setState({title:title});
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
        const news_id = query.get("id");
        //普通に取得
        this.getData(news_id);
    }
    render() {
        return(
            <div>
                <h5> {this.state.title} </h5>
                <a href="/">元に戻る</a>
            </div>
        );
    }
}
export default withRouter(NewsDetale);