import { Navbar, Nav, Form, FormControl, Button, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const UserHeader = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [seleccionado, setseleccionado] = useState(null);

    const navigate = useNavigate();

    const getSearchSuggestions = async query => {
        // if (query.trim()) {
        //     console.log(query);
        //     // Fetch search suggestions
        //     const response = await fetch(`http://localhost:3000/search/${query}`);
        //     const data = await response.json();
        //     setSearchSuggestions(data.results);
        //     console.log(searchSuggestions);
        // } else {
        //     setSearchSuggestions([]);
        // }
    };

    const handleSuggestionClick = suggestion => {
        // setSearchQuery(suggestion.nombre);
        // setseleccionado(suggestion);
        // setSearchSuggestions([]);
    };

    const handleSearchChange = e => {
        // setseleccionado(null);
        // setSearchQuery(e.target.value);
        // getSearchSuggestions(e.target.value);
    };

    const handleSearchSubmit = e => {
        // e.preventDefault();
        // setSearchSuggestions([]);
        // if (searchQuery.trim()) {
        //     // Redirect to search page
        //     if (seleccionado) {
        //         if (seleccionado.tipo === "pokemon") {
        //             navigate(`/pokemon/${seleccionado.id}`);
        //         } else {
        //             navigate(`/search/tipo/${seleccionado.id}`);
        //         }
        //     } else {
        //         navigate(`/search/pokemon/${searchQuery}`);
        //     }
        // }
    };

    return (
        <Navbar expand="lg" data-bs-theme="dark" style={{ backgroundColor: "#121212" }} fixed="top">
            <Container>
                {/* Logo or Brand */}
                <Navbar.Brand as={Link} to="/" className="fw-bold" style={{ color: "#B3B3B3" }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
                        alt="Spotify logo"
                        style={{ width: "40px", height: "40px", marginRight: "10px" }}
                    />
                    Spotify
                </Navbar.Brand>

                {/* Toggle for mobile */}
                <Navbar.Toggle aria-controls="navbar-nav" style={{ borderColor: "#FFDE00" }} />

                {/* Navbar links and search */}
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="fw-semibold" style={{ color: "#B3B3B3" }}>
                            Home
                        </Nav.Link>
                    </Nav>

                    {/* Search form */}
                    <Form className="d-flex me-3 position-relative" onSubmit={handleSearchSubmit}>
                        <FormControl
                            type="search"
                            placeholder="Search..."
                            className="me-2"
                            aria-label="Search"
                            style={{ backgroundColor: "#525252" }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        {searchSuggestions.length > 0 && (
                            <Dropdown.Menu show className="position-absolute w-100" style={{ top: "100%" }}>
                                {searchSuggestions.map(suggestion => (
                                    <Dropdown.Item key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion.nombre}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        )}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default UserHeader;
