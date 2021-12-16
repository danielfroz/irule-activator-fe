import { Fragment } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Header from './Header'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  const token = useSelector(state => state.auth.token)
  return (
    <Fragment>
      <Header/>
      {token && <Navbar/>}
      <Container>
        {children}
      </Container>
    </Fragment>
  )
}

export default Layout