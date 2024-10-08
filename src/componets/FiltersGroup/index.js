import {BsSearch} from 'react-icons/bs'

import ProfileCard from '../ProfileCard'
import './index.css'

const FiltersGroup = props => {
  const onChangeSearchInput = event => {
    const {changSearchInput} = props
    changSearchInput(event)
  }
  const onEnterSearchInput = event => {
    const {getJobsList} = props
    if (event.key === 'Enter') {
      getJobsList()
    }
  }
  const renderSearchInput = () => {
    const {getJobsList, searchInput} = props

    return (
      <div className="search-input-container">
        <input
          type="search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
          placeholder="Search"
          className="search-input"
        />
        <button
          type="button"
          onClick={getJobsList}
          className="search-button-container"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props
    return (
      <div className="employment-type-container">
        <h1 className="employment-type-heading">Type of Employment</h1>
        <ul className="employment-type-list-container">
          {employmentTypesList.map(eachEmployeeType => {
            const {updateEmploymentType, removeEmploymentType} = props
            const onChangeEmploymentType = event => {
              if (event.target.checked) {
                updateEmploymentType(event.target.value)
               
              } else {
                removeEmploymentType(event.target.value)
               
              }
            }

            const {label, employmentTypeId} = eachEmployeeType

            return (
              <li className="employ-type-list-item" key={employmentTypeId}>
                <input
                  type="checkbox"
                  id={employmentTypeId}
                  value={employmentTypeId}
                  name={employmentTypeId}
                  className="checkbox-element"
                  onChange={onChangeEmploymentType}
                />
                <label htmlFor={employmentTypeId} className="check-label">
                  {label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const onChangeSalaryRange = event => {
    const {updateSalaryRange} = props
    updateSalaryRange(event.target.value)
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <div className="salary-range-container">
        <h1 className="salary-heading">Salary Range</h1>
        <ul className="salary-range-list-container">
          <form onChange={onChangeSalaryRange}>
            {salaryRangesList.map(eachSalary => {
              const {salaryRangeId, label} = eachSalary
              return (
                <li className="salary-range-list-item" key={salaryRangeId}>
                  <input
                    type="radio"
                    id={salaryRangeId}
                    value={salaryRangeId}
                    name="salary_range"
                  />
                  <label htmlFor={salaryRangeId} className="check-label">
                    {label}
                  </label>
                </li>
              )
            })}
          </form>
        </ul>
      </div>
    )
  }

  return (
    <div className="filter-group-container">
      {renderSearchInput()}
      <ProfileCard />
      <hr className="horizontal-rule" />
      {renderTypeOfEmployment()}
      <hr className="horizontal-rule" />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
