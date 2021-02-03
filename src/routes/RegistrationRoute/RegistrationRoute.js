import React, { Component } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => { },
    },
  };

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  };

  render() {
    return (
      <section>
        <h4>
          A Web App for Poker Dealers to keep track of their income.
        </h4>
        <br />
        <p>Demo Login: twallace</p>
        <p>Demo Password: Password123!</p>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  };
};

export default RegistrationRoute;
