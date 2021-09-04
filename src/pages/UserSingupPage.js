import React from 'react';
import { signUp } from '../api/apiCall';

class UserSignupPage extends React.Component {

    state = {
        username : null,
        displayName : null,
        password : null,
        passwordRepeat : null,
        pendingApiCall : false
    };

    onChangeFormValue = (event) => {
        //object destraction :
        let {name, value} = event.target;
        console.log(name + " : " + value);
        this.setState({
            [name] : value
        });
    };

    onClickSignUp = async (event) => {
        event.preventDefault();
        this.setState({pendingApiCall : true});
        let {username, displayName, password} = this.state;
        let body = {username,displayName,password};
        try {
            const response = await signUp(body);
        }
        catch(err) {
            
        }
        finally{
            this.setState({pendingApiCall : false});
        }
        //requestlerde promise kullanimi yerine async ve await den faydalanılabilir.
        /*
        signUp(body)
        .then((response) => {
            this.setState({pendingApiCall : false});
        })
        .catch((error) => {
            this.setState({pendingApiCall : false});
        });
        */
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
                        <button className="btn btn-primary" onClick={this.onClickSignUp} disabled={this.state.pendingApiCall}>
                            {this.state.pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
            
        );
    }
}

export default UserSignupPage;
