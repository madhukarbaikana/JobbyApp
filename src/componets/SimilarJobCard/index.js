import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'

import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-card-container">
      <div className="logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />

        <div className="title-rating-container">
          <h1 className="title-heading">{title}</h1>

          <div className="rating-container">
            <BsStarFill className="rating-icon" />
            <p className="rating-heading">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="location-and-job-type-container">
        <div className="location-container">
          <MdLocationOn className="job-card-icon" />
          <p className="job-details-text">{location}</p>
        </div>
        <div className="job-type-container">
          <BsFillBriefcaseFill className="job-card-icon" />
          <p className="job-details-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
