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
          username: ''
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
        var user = firebase.auth().currentUser;
        var email = user.email;
        //var uid = user.uid;
        var user_doc_id = [];
        console.log("今ログインしてる人のemailは", email);
        db.collection("users").where("email", "==", email)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                //user_doc_id = doc.id;
                user_doc_id.push(doc.id);
                this.setState({username:doc.data().username});
                if ( val === '') {
                  return;
                }
                dbRef.add({
                    name: doc.data().username,
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
            });
            
        })
        
        event.preventDefault();
        console.log("ok")
        this.props.history.push("/mypage");
    };
    render() {
        return (
          <div className="row" style={{margin: "1em"}}>
            <h2>Create novel!</h2>
            <div className="col s12 m5 l5">
              <form onSubmit={this.handleSubmit} style={{marginTop: "4em"}}>
                  <input type="text" id="title" size="30" maxLength="20" value={this.state.title} onChange={this.title_handleChange} placeholder="title"></input>
                  <br />
                  <input type="text" id="category" size="30" maxLength="20" value={this.state.category} placeholder="category" onChange={this.category_handleChange} style={{marginTop: "3em"}}></input>
                  <br />
                  <textarea
                    type="text"
                    id="overview"
                    className="materialize-textarea col s9"
                    value={this.state.overview}
                    onChange={this.overview_handleChange}
                    style={{marginTop: "3em"}}
                    placeholder="overview"
                  />
                  <br />
                  <textarea
                    type="text"
                    id="text"
                    className="materialize-textarea col s9"
                    value={this.state.value}
                    onChange={this.val_handleChange}
                    style={{marginTop: "3em"}}
                    placeholder="text"
                  />
                  <button type="submit" className="waves-effect waves-light btn col">
                    <i class="material-icons right">Post</i>
                  </button>
                </form>
            </div>
          </div>
        );
      }
}

