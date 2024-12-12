import Cookies from 'js-cookie'
import { Navigate} from 'react-router-dom'

const ProtectedRoute = props => {
  const {children} =props
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
