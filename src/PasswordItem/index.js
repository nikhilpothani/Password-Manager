import {Component} from 'react'
import './index.css'

class PasswordItem extends Component {
  onClickDeleteItem = () => {
    const {passwordItem, onClickDelete} = this.props
    const {id} = passwordItem
    onClickDelete(id)
  }

  renderImg = () => (
    <img
      className="password"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )

  renderPassword = password => <p>{password}</p>

  render() {
    const {passwordItem, isHide} = this.props
    const {websiteName, userName, passwordText} = passwordItem
    const initial = userName[0].toUpperCase()
    const password = isHide
      ? this.renderImg()
      : this.renderPassword(passwordText)

    return (
      <li className="password-card-container">
        <div className="password-details-container">
          <div className="initial-container">
            <p className="initial">{initial}</p>
          </div>
          <div className="details-container">
            <h1 className="website">{websiteName}</h1>
            <p className="username">{userName}</p>
            {password}
          </div>
        </div>
        <button
          className="delete-button"
          type="button"
          onClick={this.onClickDeleteItem}
        >
          <img
            className="delete-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </li>
    )
  }
}

export default PasswordItem
