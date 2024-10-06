import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-found-container-image"
    />
    <h1 className="not-found-container-heading">Page Not Found</h1>
    <p className="not-found-container-description">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
