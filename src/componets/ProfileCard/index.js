import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const ProfileCard=()=>  {

const [apiStatus,setApiStatus]=useState(apiStatusConstants.initial)
const [profileData,setProfileData]=useState("")

 useEffect(()=>{
  getProfileData()

},[])

  const getProfileData = async () => {
   setApiStatus(apiStatusConstants.inProgress)
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
        shortBio:"Software Engineer" /* ProfileDetails.short_bio */,
        name: "Madhukar Baikana"/* ProfileDetails.name */,
      }

     setApiStatus(apiStatusConstants.success)
     setProfileData(updatedData)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

 const  renderSuccessView = () => {
    const {profileImageUrl, shortBio, name} = profileData

    return (
      <div className="profile-card">
        <img src={profileImageUrl} className="profile" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

 const  renderFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        onClick={getProfileData}
        className="profile-failure-button"
      >
        Retry
      </button>
    </div>
  )

 const renderLoadingView = () => (
    <div className="profile-loading-container" data-testid="loader">
      <ThreeDots  width="50" height="50" color="#ffffff" />
    </div>
  )

    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  
}

export default ProfileCard
