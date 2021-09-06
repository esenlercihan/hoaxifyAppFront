import React from 'react';
import { signUp } from '../api/apiCall';
import Input from '../components/Input';


class UserSignupPage extends React.Component {

    state = {
        username : null,
        displayName : null,
        password : null,
        passwordRepeat : null,
        pendingApiCall : false,
        errors : {}
    };

    onChangeFormValue = (event) => {
        //object destraction :
        let {name, value} = event.target;

        let errs = {...this.state.errors};
        errs[name] = undefined;

        this.setState({
            [name] : value,
            errors : errs
        });
    };

    onClickSignUp = async (event) => {
        event.preventDefault();
        this.setState({pendingApiCall : true});
        let {username, displayName, password, passwordRepeat} = this.state;
        if((password !== null || password !== "") && password !== passwordRepeat) {
            this.setState({errors : {passwordRepeat : "Password mismatch!"}});
            this.setState({pendingApiCall : false});
            return;
        }
        let body = {username,displayName,password};
        try {
            const response = await signUp(body);
        }
        catch(error) {
            if(error.response.data.validationErrors) {
                this.setState({errors : error.response.data.validationErrors});
            }
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
                    <Input name="username" label="Username" error={this.state.errors.username} onChangeFormValue={this.onChangeFormValue} />
                    <Input name="displayName" label="Display name" error={this.state.errors.displayName} onChangeFormValue={this.onChangeFormValue} />
                    <Input name="password" label="Password" error={this.state.errors.password} onChangeFormValue={this.onChangeFormValue} type="password" />
                    <Input name="passwordRepeat" label="Password Repeat" error={this.state.errors.passwordRepeat} onChangeFormValue={this.onChangeFormValue} type="password" />
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
