import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdHome} from 'react-icons/md'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header-container">
      <div className="nav-content-container">
        <div className="nav-bar-mobile-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <ul className="nav-mobile-items-list">
            <li>
              <Link to="/">
                <MdHome className="nav-mobile-list-item" />
              </Link>
            </li>
            <li>
              <Link to="/jobs">
                <BsFillBriefcaseFill className="nav-mobile-list-item" />
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="nav-mobile-btn"
                onClick={onClickLogout}
              >
                <FiLogOut className="nav-mobile-list-item" />
              </button>
            </li>
          </ul>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>

          <ul className="header-list">
            <li className="nav-list-item">
              <Link to="/" className="link-text">
                Home
              </Link>
            </li>
            <li className="nav-list-item">
              <Link to="/jobs" className="link-text">
                Jobs
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
