import React from 'react';
import { signUp, changeLanguage } from '../api/apiCall';
import Input from '../components/Input';
import {withTranslation} from 'react-i18next';


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

    onChangeLanguage = (language) => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
        this.setState({ errors : {} });
    };

    onClickSignUp = async (event) => {
        event.preventDefault();
        this.setState({pendingApiCall : true});
        let {username, displayName, password, passwordRepeat} = this.state;
        if((password !== null || password !== "") && password !== passwordRepeat) {
            this.setState({errors : {passwordRepeat : this.props.t("Password mismatch")}});
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
                    <h1 className="text-center">{this.props.t("Sign Up")}</h1>
                    <Input name="username" label={this.props.t("Username")} error={this.state.errors.username} onChangeFormValue={this.onChangeFormValue} />
                    <Input name="displayName" label={this.props.t("Display Name")} error={this.state.errors.displayName} onChangeFormValue={this.onChangeFormValue} />
                    <Input name="password" label={this.props.t("Password")} error={this.state.errors.password} onChangeFormValue={this.onChangeFormValue} type="password" />
                    <Input name="passwordRepeat" label={this.props.t("Password Repeat")} error={this.state.errors.passwordRepeat} onChangeFormValue={this.onChangeFormValue} type="password" />
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={this.onClickSignUp} disabled={this.state.pendingApiCall}>
                            {this.state.pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                            {this.props.t("Sign Up")}
                        </button>
                    </div>
                    <div>
                        <img src="https://www.countryflags.io/tr/flat/24.png" alt="Turkish Flag" onClick={() => this.onChangeLanguage('tr')} style={{ cursor: 'pointer' }} />
                        <img src="https://www.countryflags.io/us/flat/24.png" alt="USA Flag" onClick={() => this.onChangeLanguage('en')} style={{ cursor: 'pointer' }} />
                    </div>
                </form>
            </div>
            
        );
    }
}
const UserSignupPageWithTranslation = withTranslation()(UserSignupPage)
export default UserSignupPageWithTranslation;
