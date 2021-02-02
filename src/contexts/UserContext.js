import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'
import config from '../config'

const UserContext = React.createContext({
  user: {},
  workdays: [],
  error: null,
  loading: true,
  submitted: false,
  setLoading: () => { },
  setError: () => { },
  clearError: () => { },
  setUser: () => { },
  setWorkdays: () => { },
  processLogin: () => { },
  processLogout: () => { },
  setClicked: () => { },
})

export default UserContext

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    const state = {
      user: {},
      workdays: [],
      error: null,
      loading: true,
      submitted: false,
      // value: localStorage.getItem("parentValueKey")
    }

    const jwtPayload = TokenService.parseAuthToken()

    // since user is persisting but workdays is not lets try storing it here
    if (jwtPayload) {
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      }
      // fetch(`${config.API_ENDPOINT}/workday/${jwtPayload.user_id}`, {
      //   headers: {
      //     authorization: `bearer ${TokenService.getAuthToken()}`,
      //   },
      // })
      //   .then(res => res.json())
      //   .then(res => state.workdays = { res })
    }

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle)
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.value !== prevState.value) {
  //     // Whatever storage mechanism you end up deciding to use.
  //     localStorage.setItem("parentValueKey", this.state.value)
  //   }
  // }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    this.setState({ user })
  }

  setWorkdays = workdays => {
    this.setState({ workdays })
  }

  setLoading = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  setClicked = (t) => {
    this.setState({
      submitted: t,
    });
  };

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    });
    IdleService.regiserIdleTimerResets()
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken()
    });
  };

  processLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setUser({});
  };

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setUser({ idle: true });
  }

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken()
        });
      })
      .catch(err => {
        this.setError(err)
      });
  };

  render() {
    const value = {
      user: this.state.user,
      workdays: this.state.workdays,
      error: this.state.error,
      submitted: this.state.submitted,
      loading: this.state.loading,
      setClicked: this.setClicked,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      setWorkdays: this.setWorkdays,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      setLoading: this.setLoading,
    };

    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  };
};
