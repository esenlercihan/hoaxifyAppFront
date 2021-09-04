import axios from 'axios';
import React from 'react';

class UserSignupPage extends React.Component {

    state = {
        username : null,
        displayName : null,
        password : null,
        passwordRepeat : null
    };

    onChangeFormValue = (event) => {
        //object destraction :
        let {name, value} = event.target;
        console.log(name + " : " + value);
        this.setState({
            [name] : value
        });
    };

    onClickSignUp = (event) => {
        event.preventDefault();
        let {username, displayName, password} = this.state;
        let body = {username,displayName,password};
        axios.post("/api/1.0/users", body);
    };

    render() {
        return (
            <form>
                <h1>Sign Up</h1>
                <div>
                    <label>Username</label>
                    <input name="username" onChange={this.onChangeFormValue}/>
                </div>
                <div>
                    <label>Display name</label>
                    <input name="displayName" onChange={this.onChangeFormValue}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.onChangeFormValue}/>
                </div>
                <div>
                    <label>Password Repeat</label>
                    <input type="password" name="passwordRepeat" onChange={this.onChangeFormValue}/>
                </div>
                <button onClick={this.onClickSignUp}>Sign Up</button>
            </form>
        );
    }
}

export default UserSignupPage;
