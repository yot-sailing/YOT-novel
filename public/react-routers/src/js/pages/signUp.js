import React from 'react';
import firebase from '../connectDB';
import { Link } from 'react-router-dom';

export default class extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            username: '',
            collapsed: true,
            loading: false,
            _isMounted: false
        };
        this.email_handleChange = this.email_handleChange.bind(this);
        this.password_handleChange = this.password_handleChange.bind(this);
        this.username_handleChange = this.username_handleChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
    toggleCollapse() {
        const collapsed = !this.state.collapsed;
        this.setState({collapsed});
    }

    email_handleChange(event) {
        this.setState({email: event.target.value});
    };
    password_handleChange(event) {
        this.setState({password: event.target.value});
    };
    username_handleChange(event) {
        console.log("username written")
        this.setState({username: event.target.value});
    };

    handleOnSubmit(e) {
        // const username = getElementById("username")
        // e.preventDefault();
        alert(this.state._isMounted)
        const email = document.getElementById("email")
        const password = document.getElementById("password")
        if(this.state._isMounted) {
            this.setState({loading: true});
        }
        firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
            alert("success");
            if(this.state._isMounted) {
                this.setState({loading: false}); //正常終了
                this.props.history.push("/MyPage");
            }
        }).catch(error => {
            if (this.state._isMounted){
                this.setState({loading: false});
                alert(error);
            }
        });
        alert("ok");
    }

    componentDidMount() {
        this.state._isMounted = true
    }

    componentWillUnmount() {
        this.state._isMounted = false
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        return (
        <div class="form-wrapper">
            <h1>Sign Up</h1>
            <form onSubmit={this.handleOnSubmit} >
              <div class="form-item">
                <label for="username"></label>
                <input type="username" 
                    id="username" name="username" required="required" 
                    placeholder="User name" value={this.state.username} 
                    onChange={this.username_handleChange}>
                </input>
              </div>
              <div class="form-item">
                <label for="email"></label>
                <input type="email" 
                    id="email" name="email" required="required" 
                    placeholder="Email Address" value={this.state.email} 
                    onChange={this.email_handleChange}>
                </input>
              </div>
              <div class="form-item">
                <label for="password"></label>
                <input type="password" 
                    id="password" name="password" required="required" 
                    placeholder="Password" value={this.state.password}
                    onChange={this.password_handleChange}>
                </input>
              </div>
              <div class="button-panel">
                <input type="submit" class="button" title="Register" value="Register"></input>
              </div>
            </form>
            <div class="form-footer">
                <p>
                    <Link to="/signIn" onClick={this.toggleCollapse.bind(this)}>
                        already have account</Link></p>
            </div>
        </div>
        );
    }
}