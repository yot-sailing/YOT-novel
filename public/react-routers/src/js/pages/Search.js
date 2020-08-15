import React from 'react';
import firebase, { db } from '../connectDB';
import Article from '../components/Article';
export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            list: [],
            keyword: '',
            cat: ''
        };
        db.collection("novels").get().then(querySnapshot =>  {
            querySnapshot.forEach(novel => {
                this.state.list.push(
                    <Article key={novel.id} title={novel.data().title}
                        category={novel.data().category} author={novel.data().name}
                        abstract={novel.data().overview} />
                );
                this.setState({ list: this.state.list });
            });
        });
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCatSelect = this.handleCatSelect.bind(this);
    }
    handleSubmit(event){
        console.log(this.state.cat);
        event.preventDefault();
        this.setState({ list: []});
        db.collection("novels").where("category", "==", this.state.cat).get().then(querySnapshot => {
            querySnapshot.forEach(novel => {
                this.state.list.push(
                    <Article key={novel.id} title={novel.data().title}
                        category={novel.data().category} author={novel.data().name}
                        abstract={novel.data().overview} />
                );
                this.setState({ list: this.state.list });
                console.log(this.state.list);
            });
        });
    }
    handleCatSelect(event) {
        this.setState({ cat: event.target.value});
    }
    render(){
        // const type = (this.props.match.params.mode == "extra" ? "(for experts)": "");
        return (
            <div>
                <h1>Search</h1>
                <form class="search_container" onSubmit={this.handleSubmit}>
                    <input type="text" size="25" placeholder="　キーワード検索" value={this.state.keyword}/>
                    <div class="radio-container">
                            <input id="radio-1" name="radio" type="radio" />
                            <label for="radio-1" class="radio-label">全てから </label>
                            <input id="radio-2" name="radio" type="radio" />
                            <label  for="radio-2" class="radio-label">タイトルから </label>
                            <input id="radio-3" name="radio" type="radio" />
                            <label  for="radio-3" class="radio-label">著者から </label>
                            <input id="radio-4" name="radio" type="radio" />
                            <label  for="radio-4" class="radio-label">概要から </label>
                            <input id="radio-5" name="radio" type="radio" />
                            <label  for="radio-5" class="radio-label">タグから </label>
                    </div>
                    <input type="submit" value="検索" />
                    <br />
                    <div class="cp_ipselect cp_sl01">
                        <select value={this.state.cat} onChange={this.handleCatSelect} required>
                            <option value="" hidden>カテゴリを選ぶ</option>
                            <option value="SF">SF</option>
                            <option value="サスペンス">サスペンス</option>
                            <option value="animal">animal</option>
                            <option value="comedy">comedy</option>
                    </select>
                    </div>
                </form>
                <div class="all-novel">
                    <h3>全件</h3>
                    <div class="box-list-yaxis">{this.state.list}</div>
                </div>
            </div>
        );
    }
}