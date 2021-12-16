import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { useApi } from '../../hooks'
import * as r from '../../reducers'

const Logout = () => {
  const alert = useAlert()
  const api = useApi()
  const router = useRouter()
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  useEffect(() => {
    const id = crypto.randomUUID()
    if(!token) {
      // user already lost the credentials... just move him to login page...
      return router.push('/')
    }
    api.post('/auth/logout', { token })
      .then(() => {
        dispatch({ type: r.AUTH_LOGOUT })
        router.push('/')
      })
      .catch(error => {
        console.error('error: %o', error)
        alert.error(error)
      })
  }, [])

  return (
    <>
      An error ocurred while logging out...
    </>
  )
}

export default Logout