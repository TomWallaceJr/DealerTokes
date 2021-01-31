import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  renderLogoutLink() {
    return (
      <div className='greeting-bar'>
        <span className='greeting'>
          Hello {this.context.user.name}!
        </span>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <>
        <h1 className='title'>
          <Link to='/'>
            Dealer Tokes
          </Link>
        </h1>
        <nav>
          <Link to='/login'>Login</Link>
          {' '}
          <Link to='/register'>Sign up</Link>
        </nav>
      </>
    )
  }

  render() {
    return (
      <header>

        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
