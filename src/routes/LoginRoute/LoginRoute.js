import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginRoute.css';

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <>
        <p>Demo Username: JD123</p>
        <p>Demo Password: pass</p>
        <section className='login-form'>
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
        </section>
      </>
    );
  }
}

export default LoginRoute
