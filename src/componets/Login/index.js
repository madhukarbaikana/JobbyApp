import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = data => {
    this.setState({showErrorMsg: true, errorMsg: data})
  }

  submitLoginDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="username">
          USERNAME
          <br />
          <input
            type="text"
            id="username"
            value={username}
            className="input-field"
            onChange={this.onChangeUsername}
            placeholder="Username"
          />
        </label>
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="password">
          PASSWORD
          <br />
          <input
            type="password"
            id="password"
            value={password}
            className="input-field"
            onChange={this.onChangePassword}
            placeholder="Password"
          />
        </label>
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form
          className="login-form-container"
          onSubmit={this.submitLoginDetails}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-website-logo"
          />

          {this.renderUsername()}
          {this.renderPassword()}
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
