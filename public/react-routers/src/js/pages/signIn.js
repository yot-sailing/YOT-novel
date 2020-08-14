import React  from 'react';
import { Link } from 'react-router-dom';
import firebase from '../connectDB';

export default class extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            collapsed: true,
            loading: false,
            _isMounted: false
        };
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.email_handleChange = this.email_handleChange.bind(this)
        this.password_handleChange = this.password_handleChange.bind(this)
    }
    email_handleChange(event) {
        this.setState({email: event.target.value});
    };
    password_handleChange(event) {
        this.setState({password: event.target.value});
    };
    // handleChange(e) {
    //     this.setState({ [e.target.id]: e.target.value });
    // };
    toggleCollapse() {
        const collapsed = !this.state.collapsed;
        this.setState({collapsed});
    }
    handleOnSubmit(e){
        const email = document.getElementById('email')
        const password = document.getElementById('password')
        if(this.state._isMounted){
            this.setState({loading: true});
        }
        alert(email)
        firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
            alert("ok?")
                if (this.state._isMounted){  // login success
                    this.props.history.push("/MyPage");
                    this.setState({loading: false});
                    alert("success")
                }
            }).catch(error => {
                if (this.state._isMounted){
                    this.setState({loading: false});
                    alert(error)
                }
        });
        this.props.history.push("/");
    }
    componentDidMount() {
        this.setState({_isMounted:true});
    }
    componentWillUnmount() {
        this.setState({_isMounted:true})
    }

    render() {
        return (
        <div class="form-wrapper">
            <h1>Sign In</h1>
            <form onSubmit={this.handleOnSubmit}>
                <div class="form-item">
                <label for="email"></label>
                <input type="email" 
                    id="email" name="email" required="required" 
                    placeholder="Email Address" 
                    value={this.state.email}
                    onChange={this.email_handleChange}
                    >
                </input>
                </div>
                <div class="form-item">
                <label for="password"></label>
                <input type="password" 
                    id="password" name="password" required="required"
                    placeholder="Password" 
                    value={this.state.password}
                    onChange={this.password_handleChange}
                    >
                 </input>
                </div>
                <div class="button-panel">
                <input type="submit" class="button" title="Sign In" value="Sign In"></input>
                </div>
            </form>
            <div class="form-footer">
                <p>
                    <Link to="/signUp" onClick={this.toggleCollapse.bind(this)}>
                        Create an account</Link></p>
                <p><a href="#">Forgot password?</a></p>
            </div>
        </div>
        );
    }
}
