import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
    
function HeaderAdmin() {

  return (
    <>
        {/* heador */}
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" bg="dark">
      <Container>
        <Navbar.Brand href="#home">Rotten Eggs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Reparto" id="basic-nav-dropdown">
              <NavDropdown.Item href="/reparto">Lista</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/reparto/create">Crear</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Pelicula" id="basic-nav-dropdown">
              <NavDropdown.Item href="/pelicula">Lista</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/pelicula/create">Crear</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
    </>
  );
}

export default HeaderAdmin;