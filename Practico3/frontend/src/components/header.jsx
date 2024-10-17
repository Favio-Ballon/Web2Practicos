import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import { useState } from 'react';


const UserHeader = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" style={{ backgroundColor: '#3B4CCA' }} fixed='top'>
            <Container>
                {/* Logo or Brand */}
                <Navbar.Brand as={Link} to="/" className="fw-bold" style={{color: '#FFDE00'}}>
                    <img
                        src="https://images.sftcdn.net/images/t_app-icon-m/p/402bec2f-fd06-47a5-90f8-b0d59580e69d/3527068709/masterdex-complete-pokedex-logo"
                        alt="Rotten Eggs Logo"
                        style={{ width: '40px', height: '40px', marginRight: '10px' }}
                    />
                    Pokedex
                </Navbar.Brand>

                {/* Toggle for mobile */}
                <Navbar.Toggle aria-controls="navbar-nav" style={{ borderColor: '#FFDE00' }} />

                {/* Navbar links and search */}
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="fw-semibold" style={{color: '#FFDE00'}}>
                            Home
                        </Nav.Link>
                    </Nav>

                    {/* Search form */}
                    <Form className="d-flex me-3">
                        <FormControl
                            type="search"
                            placeholder="Search..."
                            className="me-2"
                            aria-label="Search"
                            style={{ borderColor: '#FFDE00' }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <Button variant="outline-warning" style={{color: '#FF0000', borderColor: '#FF0000'}}  type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default UserHeader;
