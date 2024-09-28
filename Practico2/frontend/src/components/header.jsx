import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserHeader = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-3">
            <Container>
                {/* Logo or Brand */}
                <Navbar.Brand as={Link} to="/" className="fw-bold text-warning">
                    <img
                        src="https://static.thenounproject.com/png/1245437-200.png" // Use your logo path
                        alt="Rotten Eggs Logo"
                        style={{ width: '40px', height: '40px', marginRight: '10px' }}
                    />
                    Rotten Eggs
                </Navbar.Brand>

                {/* Toggle for mobile */}
                <Navbar.Toggle aria-controls="navbar-nav" />

                {/* Navbar links and search */}
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="fw-semibold text-light">
                            Home
                        </Nav.Link>
                    </Nav>

                    {/* Search form */}
                    <Form className="d-flex me-3">
                        <FormControl
                            type="search"
                            placeholder="Search movies..."
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-warning">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default UserHeader;
