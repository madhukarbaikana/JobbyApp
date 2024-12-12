import {useState,useEffect,useCallback} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'

import Header from '../Header'
import JobCard from '../JobCard'
import FiltersGroup from '../FiltersGroup'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const Jobs=()=> {
  const [jobsList,setJobsList]=useState([])
  const [apiStatus,setApiStatus]=useState(apiStatusConstants.initial)
  const [searchInput,setSearchInput]=useState('')
  const [employmentTypeIds,setEmploymentTypeIds]=useState([])
  const [salaryRangeId,setSalaryRangeId]=useState('')
  
useEffect(()=>{
  getJobsList()
},[salaryRangeId,employmentTypeIds])

const  getJobsList = useCallback(async () => {
  setApiStatus(apiStatusConstants.inProgress)
  const employmentTypeIdsString = [...new Set(employmentTypeIds)].join()
  const jwtToken = Cookies.get('jwt_token')
  const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeIdsString}&minimum_package=${salaryRangeId}&search=${searchInput}`
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  }

try{
  const response = await fetch(apiUrl, options)
  if (response.ok) {
    const data = await response.json()
    const updatedData = data.jobs.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      packagePerAnnum: eachItem.package_per_annum,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    setApiStatus(apiStatusConstants.success)
    setJobsList(updatedData)
  } else {
   setApiStatus(apiStatusConstants.failure)
  }}
 
  catch(error){
    setApiStatus(apiStatusConstants.failure)
  }

},[salaryRangeId,employmentTypeIds, searchInput])

 const renderLoadingView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <ThreeDots  with={50} height={50} color="#ffffff" />
    </div>
  )

  const renderSuccessView = () => {
    const showNoProductView = jobsList.length === 0

    return showNoProductView ? (
      renderNoProductView()
    ) : (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobCard jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

 const renderNoProductView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-view-image"
      />
      <h1 className="no-jobs-view-heading">No Jobs Found</h1>
      <p className="no-jobs-view-description">
        We could not find any jobs, Try other filters
      </p>
    </div>
  )

const  renderFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={getJobsList} className="retry-button">
        Retry
      </button>
    </div>
  )

  const renderJobsList = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

const  onChangeSearchInput = event => {
      setSearchInput(event.target.value)
    }

const  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      getJobsList()
    }
  }

 const renderSearchInputJobsContainer = () => {
    return (
      <div className="search-and-jobs-list-container">
        <div className="search-input-container-desktop">
          <input
            type="search"
            value={searchInput}
            placeholder="Search"
            onChange={onChangeSearchInput}
            className="jobs-search-input-desktop"
            onKeyDown={onEnterSearchInput}
          />
          <button
            type="button"
            onClick={getJobsList}
            className="search-button-container-desktop"
            data-testid="searchButton"
          >
            <BsSearch className="search-icon-desktop" />
          </button>
        </div>
        {renderJobsList()}
      </div>
    )
  }

 const onUpdateSalaryRange = currentSalaryRangeId => {
   setSalaryRangeId(currentSalaryRangeId)
  }

const  onUpdateEmploymentType = employmentId => {
setEmploymentTypeIds([...employmentTypeIds,employmentId])
  }

  const removeEmploymentType = employmentId => {
   const newEmplomentIds=employmentTypeIds.filter(eachId=>(eachId!==employmentId))
setEmploymentTypeIds(newEmplomentIds)

  }

    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-container">
            { <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changSearchInput={onChangeSearchInput}
              searchInput={searchInput}
              getJobsList={getJobsList}
              updateSalaryRange={onUpdateSalaryRange}
              updateEmploymentType={onUpdateEmploymentType}
              removeEmploymentType={removeEmploymentType}
            /> }

            {renderSearchInputJobsContainer()}
            
          </div>
        </div>
      </>
    )
  
}

export default Jobs
