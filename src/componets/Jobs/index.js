import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {TailSpin} from 'react-loader-spinner'

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
class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentTypeIds: [],
    salaryRangeId: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {salaryRangeId, employmentTypeIds, searchInput} = this.state
    const employmentTypeIdsString = [...new Set(employmentTypeIds)].join()
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeIdsString}&minimum_package=${salaryRangeId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

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
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <TailSpin type="ThreeDots" with={50} height={50} color="#ffffff" />
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state

    const showNoProductView = jobsList.length === 0

    return showNoProductView ? (
      this.renderNoProductView()
    ) : (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobCard jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderNoProductView = () => (
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

  renderFailureView = () => (
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
      <button type="button" onClick={this.getJobsList} className="retry-button">
        Retry
      </button>
    </div>
  )

  renderJobsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  renderSearchInputJobsContainer = () => {
    const {searchInput} = this.state

    return (
      <div className="search-and-jobs-list-container">
        <div className="search-input-container-desktop">
          <input
            type="search"
            value={searchInput}
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            className="jobs-search-input-desktop"
            onKeyDown={this.onEnterSearchInput}
          />
          <button
            type="button"
            onClick={this.getJobsList}
            className="search-button-container-desktop"
            data-testid="searchButton"
          >
            <BsSearch className="search-icon-desktop" />
          </button>
        </div>
        {this.renderJobsList()}
      </div>
    )
  }

  onUpdateSalaryRange = currentSalaryRangeId => {
    this.setState({salaryRangeId: currentSalaryRangeId}, this.getJobsList)
  }

  onUpdateEmploymentType = employmentId => {
    this.setState(
      prevState => ({
        employmentTypeIds: [...prevState.employmentTypeIds, ...[employmentId]],
      }),
      this.getJobsList,
    )
  }

  removeEmploymentType = employmentId => {
    this.setState(
      prevState => ({
        employmentTypeIds: prevState.employmentTypeIds.filter(
          eachId => eachId !== employmentId,
        ),
      }),
      this.getJobsList,
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-container">
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changSearchInput={this.onChangeSearchInput}
              searchInput={searchInput}
              getJobsList={this.getJobsList}
              updateSalaryRange={this.onUpdateSalaryRange}
              updateEmploymentType={this.onUpdateEmploymentType}
              removeEmploymentType={this.removeEmploymentType}
            />

            {this.renderSearchInputJobsContainer()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
