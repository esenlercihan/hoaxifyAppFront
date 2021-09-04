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
            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control" name="username" onChange={this.onChangeFormValue}/>
                    </div>
                    <div className="form-group">
                        <label>Display name</label>
                        <input className="form-control" name="displayName" onChange={this.onChangeFormValue}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password" name="password" onChange={this.onChangeFormValue}/>
                    </div>
                    <div className="form-group">
                        <label>Password Repeat</label>
                        <input className="form-control" type="password" name="passwordRepeat" onChange={this.onChangeFormValue}/>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={this.onClickSignUp}>Sign Up</button>
                    </div>
                </form>
            </div>
            
        );
    }
}

export default UserSignupPage;
