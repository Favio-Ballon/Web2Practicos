// Dependencias
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
    
function HeaderAdmin() {

  return (
    <>
        {/* heador */}
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" bg="dark" fixed='top'>
      <Container>
        <Navbar.Brand href="/">Pokedex</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Pokemon" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Pokemon">Lista</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Pokemon/create">Crear</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Tipo" id="basic-nav-dropdown">
              <NavDropdown.Item href="/tipo">Lista</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/tipo/create">Crear</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Habilidad" id="basic-nav-dropdown">
              <NavDropdown.Item href="/habilidad">Lista</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/habilidad/create">Crear</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
    </>
  );
}

export default HeaderAdmin;