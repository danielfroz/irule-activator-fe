import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/router'
import { Navbar as NB, Container, Nav, NavDropdown, NavItem } from 'react-bootstrap'
import * as r from '../reducers'

const Navbar = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const token = useSelector(state => state.auth.token)

  function logout() {
    router.push('/auth/logout')
  }

  return (
    <NB bg='light' className='mb-2'>
      <Container>
        <NB.Brand href='#' onClick={() => router.push('/main')}>iRule Activator</NB.Brand>
        <NB.Toggle aria-controls="basic-navbar-nav" />
        <NB.Collapse id="basic-navbar-nav">
          <Nav className='me-auto'>
            {/* {organization &&
              <>
                <Nav.Link onClick={() => router.push('/organization/view')}>{organization.name}</Nav.Link>
                <Nav.Link onClick={() => deselect()}>
                  <i className='fas fa-times'></i>
                </Nav.Link>
              </>
            } */}
          </Nav>
          <NavDropdown title={token ? 'Admin': 'None'} id='nav-dropdown'>
            <NavDropdown.Item href='#' onClick={logout}>
              <i className='fas fa-sign-out'></i>{' '}Logout
            </NavDropdown.Item>
          </NavDropdown>
        </NB.Collapse>
      </Container>
    </NB>
  )
}

export default Navbar