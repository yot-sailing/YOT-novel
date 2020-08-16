import React from 'react';
import { withRouter } from 'react-router-dom';
import { db } from "../connectDB";

const dbNews = db.collection('news');

class News extends React.Component{
    constructor(props){
        super(props);
        this.state = {title : []};
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e) {
        console.log("yes");
        const title = document.getElementById("news_title").textContent;
        console.log(title)
        dbNews.where("title","==", title).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const news_id = doc.id;
                console.log(news_id);
                // this.setState({ novel_id: novel.id });
                const site = "/newsdetale?id=" + news_id;
                console.log(site);
                this.props.history.push(site);
            })
        });
    }
    render() {
        const { title } = this.props;
        return (
            <a class="list-news" onClick={this.handleClick}>
                <div class="list-news-title" id="news_title">{title}</div>
            </a>
        );
    };
}
export default withRouter(News);

