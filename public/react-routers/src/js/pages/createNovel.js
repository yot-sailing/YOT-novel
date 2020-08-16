import React from 'react';
import firebase, { db } from '../connectDB';

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          title: '',
          category: '',
          overview:'',
          value: '',
          list: [],
        }
    
    this.val_handleChange = this.val_handleChange.bind(this);
    this.title_handleChange = this.title_handleChange.bind(this);
    this.category_handleChange = this.category_handleChange.bind(this);
    this.overview_handleChange = this.overview_handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    val_handleChange(event) {
        this.setState({value: event.target.value});
    };
    title_handleChange(event) {
      this.setState({title: event.target.value})
    }
    category_handleChange(event) {
      this.setState({category: event.target.value})
    }
    overview_handleChange(event) {
      this.setState({overview: event.target.value})
    }

    handleSubmit(event) {
        const dbRef = db.collection('novels');
        const text = document.getElementById('overview');
        const title_text = document.getElementById('title');
        const val = this.state.value;
        const title = this.state.title;
        const category = this.state.category;
        const overview = this.state.overview;
        if ( val === '') {
            return;
        }
        dbRef.add({
            id: this.state.list.length+1,
            name: "you",
            title: title,
            category: category,
            overview: overview,
            text: val,
            created: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            this.setState({ value: '',
                            title:'',
                            category:'',
                            overview:'',
            });
            text.focus();
            title_text.focus();
        });
        this.setState({ list: this.state.list});
        event.preventDefault();
        console.log("ok")
        this.props.history.push("/mypage");
    };
    render() {
        return (
          <div className="row write-novel" style={{ margin: "1em" }}>
            <h2>小説を投稿する</h2>
            <div className="col s12 m5 l5">
              <form onSubmit={this.handleSubmit} style={{ marginTop: "4em" }}>
                <div class="novel-input-name">
                  <div class="input-name">タイトル</div>
                  <input
                    type="text"
                    id="title"
                    size="30"
                    maxLength="20"
                    value={this.state.title}
                    onChange={this.title_handleChange}
                    placeholder="タイトル"
                  ></input>
                </div>
                <div class="novel-input-name">
                  <div class="input-name">カテゴリ</div>
                  <div class="cp_ipselect cp_sl01 cat-selecter">
                    <select
                      value={this.state.category}
                      onChange={this.category_handleChange}
                      required
                    >
                      <option value="" hidden>
                        カテゴリを選ぶ
                      </option>
                      <option value="SF">SF</option>
                      <option value="サスペンス">サスペンス</option>
                      <option value="animal">animal</option>
                      <option value="comedy">comedy</option>
                    </select>
                  </div>
                </div>
                <div class="novel-input-name">
                  <div class="input-name">概要</div>
                  <div class="input-detail">*概要は一覧などに表示されます</div>
                  <textarea
                    type="text"
                    id="overview"
                    value={this.state.overview}
                    onChange={this.overview_handleChange}
                    placeholder="概要"
                  />
                </div>
                <div class="novel-input-name">
                  <div class="input-name">本文</div>
                  <textarea
                    type="text"
                    id="text"
                    value={this.state.value}
                    onChange={this.val_handleChange}
                    placeholder="本文"
                  />
                </div>
                <div class="submit-button-wrapper">
                  <button
                    type="submit"
                    className="waves-effect waves-light btn col"
                  >
                    投稿する
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      }
}

