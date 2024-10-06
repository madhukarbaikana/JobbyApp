import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="job-details-link">
      <li className="job-card-container" key={id}>
        <div className="logo-title-location-container">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
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

          <div className="location-package-container">
            <div className="job-type-and-location-container">
              <div className="location-container">
                <MdLocationOn className="job-card-icon" />
                <p className="job-details-text">{location}</p>
              </div>

              <div className="job-card-employment-type-container">
                <BsFillBriefcaseFill className="job-card-icon" />
                <p className="job-details-text">{employmentType}</p>
              </div>
            </div>
            <h1 className="package-heading">{packagePerAnnum}</h1>
          </div>
        </div>
        <hr className="horizontal-rule" />
        <div className="description-container">
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
