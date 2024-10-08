import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { MdLocationOn } from 'react-icons/md';
import { BsFillBriefcaseFill, BsStarFill } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import { TailSpin } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

import SkillItem from '../SkillItem';
import SimilarJobCard from '../SimilarJobCard';
import Header from '../Header';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIALS',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
};

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState({});
  const [similarJobs, setSimilarJobs] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const { id } = useParams(); 

  useEffect(() => {
    getJobDetails();
  }, [id]);

  const getFormattedSimilarJobs = (similarJobs) =>
    similarJobs.map((data) => ({
      companyLogoUrl: data.company_logo_url,
      employmentType: data.employment_type,
      id: data.id,
      jobDescription: data.job_description,
      location: data.location,
      rating: data.rating,
      title: data.title,
    }));

  const getFormattedJobDetails = (jobDetails) => ({
    companyLogoUrl: jobDetails.company_logo_url,
    companyWebsiteUrl: jobDetails.company_website_url,
    employmentType: jobDetails.employment_type,
    id: jobDetails.id,
    jobDescription: jobDetails.job_description,
    lifeAtCompany: {
      description: jobDetails.life_at_company.description,
      imageUrl: jobDetails.life_at_company.image_url,
    },
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,
    rating: jobDetails.rating,
    title: jobDetails.title,
    skills: jobDetails.skills.map((eachSkill) => ({
      name: eachSkill.name,
      imageUrl: eachSkill.image_url,
    })),
  });

  const getJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token');

    setApiStatus(apiStatusConstants.inProgress);

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);

    if (response.ok) {
      const data = await response.json();
      const formattedJobDetails = getFormattedJobDetails(data.job_details);
      const formattedSimilarJobs = getFormattedSimilarJobs(data.similar_jobs);

      setJobDetails(formattedJobDetails);
      setSimilarJobs(formattedSimilarJobs);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderLoadingView = () => (
    <div className="job-details-loader-container" data-testid="loader">
      <TailSpin type="ThreeDots" width={50} height={50} color="#ffffff" />
    </div>
  );

  const renderFailureView = () => (
    <div className="job-details-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-details-failure-image"
      />
      <h1 className="job-details-failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="job-details-failure-view-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="job-details-retry-button"
        type="button"
        onClick={getJobDetails}
      >
        Retry
      </button>
    </div>
  );

  const renderSuccessView = () => {
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
    } = jobDetails;

    const { description, imageUrl } = lifeAtCompany;

    return (
      <div className="job-details-and-similar-jobs-container">
        <div className="job-details-card">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
            <p className="package-heading">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-rule" />
          <div className="description-visit-container">
            <h1 className="description-heading">Description</h1>
            <div className="visit-container">
              <a
                href={companyWebsiteUrl}
                rel="noreferrer"
                target="_blank"
                className="visit-heading"
              >
                Visit
              </a>
              <FiExternalLink className="visit-icon" />
            </div>
          </div>

          <p className="description">{jobDescription}</p>

          <h1 className="skills-heading">Skills</h1>

          <ul className="skills-list-container">
            {skills.map((skill) => (
              <SkillItem skillDetails={skill} key={skill.name} />
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life At Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-job-items-list">
          {similarJobs.map((eachItem) => (
            <SimilarJobCard jobDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    );
  };

  const renderJobDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="job-detail-bg-container">{renderJobDetails()}</div>
    </>
  );
};

export default JobDetails;
