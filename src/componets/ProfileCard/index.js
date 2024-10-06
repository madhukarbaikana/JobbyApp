import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class ProfileCard extends Component {
  state = {apiStatus: apiStatusConstants.inProgress, profileData: ''}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const ProfileDetails = data.profile_details
      const updatedData = {
        profileImageUrl: ProfileDetails.profile_image_url,
        shortBio: ProfileDetails.short_bio,
        name: ProfileDetails.name,
      }

      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {profileData} = this.state
    const {profileImageUrl, shortBio, name} = profileData

    return (
      <div className="profile-card">
        <img src={profileImageUrl} className="profile" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        onClick={this.getProfileData}
        className="profile-failure-button"
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loading-container" data-testid="loader">
      <Loader type="ThreeDots" width="50" height="50" color="#ffffff" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default ProfileCard
