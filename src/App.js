import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from './PasswordItem'
import './App.css'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    searchInput: '',
    isActive: false,
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  addNewDetails = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newDetails = {
      id: v4(),
      websiteName: website,
      userName: username,
      passwordText: password,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newDetails],
      website: '',
      username: '',
      password: '',
    }))
  }

  onChangeGetWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeGetUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeGetPassword = event => {
    this.setState({password: event.target.value})
  }

  onClickDelete = id => {
    const {passwordsList} = this.state
    const newList = passwordsList.filter(eachItem => eachItem.id !== id)

    this.setState({passwordsList: newList})
  }

  getSearchResults = () => {
    const {searchInput, passwordsList} = this.state

    return passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  render() {
    const {website, username, password, isActive} = this.state
    const searchResults = this.getSearchResults()
    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>
        <div className="password-container">
          <div className="img-container">
            <img
              className="password-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
          </div>
          <div className="password-input-container">
            <h1 className="main-heading">Add New Password</h1>
            <form className="input-container" onSubmit={this.addNewDetails}>
              <div className="input-card">
                <img
                  className="logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.onChangeGetWebsite}
                  value={website}
                />
              </div>
              <div className="input-card">
                <img
                  className="logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.onChangeGetUsername}
                  value={username}
                />
              </div>
              <div className="input-card">
                <img
                  className="logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  className="input"
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.onChangeGetPassword}
                  value={password}
                />
              </div>
              <div className="add-button-container">
                <button
                  className="add-button"
                  type="submit"
                  onClick={this.addNewDetails}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="show-password-container">
          <div className="header-container">
            <div className="header">
              <h1 className="heading-text">Your Passwords</h1>
              <p className="count-text">{searchResults.length}</p>
            </div>
            <div className="search-container">
              <img
                className="logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                onChange={this.getSearchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="show-checkbox-container">
            <input id="checkbox" className="checkbox" type="checkbox" />
            <label
              htmlFor="checkbox"
              className="label-text"
              onClick={this.onClickShowPassword}
            >
              Show Passwords
            </label>
          </div>
          {searchResults.length !== 0 ? (
            <ul className="passwords-container">
              {searchResults.map(eachItem => (
                <PasswordItem
                  key={eachItem.id}
                  passwordItem={eachItem}
                  onClickDelete={this.onClickDelete}
                  isHide={isActive}
                />
              ))}
            </ul>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
            />
          )}
        </div>
      </div>
    )
  }
}

export default App
