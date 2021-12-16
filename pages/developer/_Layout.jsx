import { Container } from 'react-bootstrap'

const Layout = ({ children }) => {
  return (
    <Container>
      <div className='mt-3'></div>
      
      {children}
    </Container>
  )
}

export default Layout