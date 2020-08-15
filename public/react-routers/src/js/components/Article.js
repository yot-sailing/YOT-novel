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

        const { abstract } = this.props;
        const { title } = this.props;
        const { author } = this.props;
        const { category } = this.props;
        const { rank } = this.props;
        return (
            <a class="list-novel" onClick={this.handleClick}>
                <div class="list-novel-rank">{ rank }</div>
                <div class="list-novel-content">
                    <div class="list-novel-show">
                        <div class="list-novel-title">{ title }</div>
                        <div class="list-novel-info">
                            <div class="list-novel-author">{ author }</div>
                            <div class="list-novel-cat">{ category }</div>
                        </div>
                    </div>
                    <div class="list-novel-abst">{abstract}</div>
                </div>
            </a>
        );
    }
}
export default withRouter(Article);