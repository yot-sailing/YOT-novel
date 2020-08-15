import React from 'react';
import {withRouter} from 'react-router-dom';
import { db } from "../connectDB";

const dbNovel = db.collection("novels");
class Article extends React.Component{
    constructor(props){
        super(props);
        // this.state = {novel_id: ""};
        this.handleClick = this.handleClick.bind(this);
    };
    handleClick(e) {
        const abstract = document.getElementById("abstract").textContent;
        const title = document.getElementById("title").textContent;
        const author = document.getElementById("author").textContent;
        const category = document.getElementById("category").textContent;
        var novel_id = "";
        console.log(abstract, title, category,author);
        e.preventDefault();
        dbNovel.where("title", "==", title).get().then(querySnapshot => {
            querySnapshot.forEach(novel => {
                novel_id = novel.id;
                console.log(novel_id);
                // this.setState({ novel_id: novel.id });
                const site = "/novel?id=" + novel_id;
                console.log(site);
                this.props.history.push(site);
            });
        });
    }
    render() {
        const {abstract}  = this.props;
        const {title} = this.props;
        const {author} = this.props;
        const {category} = this.props;
        return (
            <div class="col-md-4">
                <h4 id="title">{ title }</h4>
                <h5 id="author">author : { author }</h5>
                <h5 id="category">category : {category}</h5>
                <p id="abstract">{ abstract }</p>
                <button class="btn btn-default" onClick={this.handleClick}>More Info</button>
            </div>
        );
    }
}
export default withRouter(Article);