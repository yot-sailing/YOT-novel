import React from 'react';
import Article from '../components/Article';
import firebase, { db } from '../connectDB';
import Article from '../components/Article';
export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            collapsed : true,
            category: '',
            title: '',
            list: [],
        };

        const novelRef = db.collection("novels");
        const snapshots = novelRef.get();
        snapshots.then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                this.state.list.push(
                    <Article key={doc.id} title={doc.data().title} 
                              category={doc.data().category} author={doc.data().name} 
                              abstract={doc.data().overview} />
                );
                this.setState({list: this.state.list});
            });
        });

    }

    category_handleChange(event) {
        this.setState({category: event.target.value});
        console.log(this.state.category);
    }
    title_handleChange(event) {
        this.setState({title: event.target.value});
        console.log(this.state.title);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ list: []});

        var novelRef;
        if(this.state.category != "" && this.state.title != ""){
            novelRef = db.collection("novels")
            .where("category", "==", this.state.category)
            .where("title", "==", this.state.title);
            console.log("multi");
        }else if(this.state.category != ""){
            novelRef = db.collection("novels")
            .where("category", "==", this.state.category);
            console.log("single");
        }
        // const novelRef = db.collection("novels")
        // .where("category", "==", this.state.category);
        // //.where("title", "==", this.state.title);
        const snapshots = novelRef.get();
        snapshots.then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                this.state.list.push(
                    <Article key={doc.id} title={doc.data().title} 
                              category={doc.data().category} author={doc.data().name} 
                              abstract={doc.data().overview} />
                );
                this.setState({list: this.state.list});
            });
        });
    };

    render(){
        return (
            <div>
                <h1>Search</h1>
                <form onSubmit={this.handleSubmit.bind(this)} class="search_container">
                    <input type="text" size="25" placeholder="　キーワード検索" value={this.state.title} onChange={this.title_handleChange.bind(this)} />
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

                    <div  class="cp_ipselect cp_sl01">
                    <select value={this.state.category} onChange={this.category_handleChange.bind(this)} required>
                        <option value="" hidden>カテゴリを選ぶ</option>
                        <option value="SF">SF</option>
                        <option value="サスペンス">サスペンス</option>
                        <option value="animal">animal</option>
                        <option value="comedy">comedy</option>
                    </select>
                    </div>
                </form>
                <h3 className="text-center my-5">一覧表示</h3>
                <div class="box-list-yaxis">
                    {this.state.list}
                </div>
            </div>
        );
    }
}