import { Navbar, Nav, Form, FormControl, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./search.css";
const UserHeader = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [seleccionado, setseleccionado] = useState(null);
    const [canciones, setCanciones] = useState([]);
    const [artistas, setArtistas] = useState([]);
    const [albums, setAlbums] = useState([]);

    const navigate = useNavigate();

    const getSearchSuggestions = async query => {
        if (query.trim()) {
            console.log(query);
            const response = await fetch(`http://localhost:3000/search/${query}`);
            const data = await response.json();
            setCanciones(data.canciones);
            setArtistas(data.artistas);
            setAlbums(data.albums);
            console.log(canciones);
        }
    };

    const handleSuggestionClickArtista = id => {
        navigate(`/artista/${id}`);
    };

    const handleSuggestionClickCancion = (id, nombre) => {
        navigate(`/artista/${id}#${nombre}`);
        window.location.reload();
    };

    const handleSuggestionClickAlbum = (id, nombre) => {
        navigate(`/artista/${id}#${nombre}`);
        window.location.reload();
    };

    const handleSearchChange = e => {
        setseleccionado(null);
        setSearchQuery(e.target.value);
        getSearchSuggestions(e.target.value);
    };

    const handleSearchSubmit = e => {
        e.preventDefault();
        return;
    };

    return (
        <Navbar expand="lg" data-bs-theme="dark" style={{ backgroundColor: "#121212" }} fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold" style={{ color: "#B3B3B3" }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
                        alt="Spotify logo"
                        style={{ width: "40px", height: "40px", marginRight: "10px" }}
                    />
                    Spotify
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" style={{ borderColor: "#FFDE00" }} />

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="fw-semibold" style={{ color: "#B3B3B3" }}>
                            Home
                        </Nav.Link>
                    </Nav>

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
                        {(canciones?.length > 0 || artistas?.length > 0 || albums?.length) > 0 && (
                            <Dropdown.Menu show className="position-absolute w-100" style={{ top: "100%" }}>
                                {canciones.length > 0 && <Dropdown.Item className="dropdown-titulo">Canciones</Dropdown.Item>}
                                {canciones?.map(suggestion => (
                                    <Dropdown.Item key={suggestion.id} onClick={() => handleSuggestionClickCancion(suggestion.artista?.id, suggestion.nombre)}>
                                        {suggestion.nombre}
                                    </Dropdown.Item>
                                ))}
                                {artistas.length > 0 && <Dropdown.Item className="dropdown-titulo">Artistas</Dropdown.Item>}
                                {artistas?.map(suggestion => (
                                    <Dropdown.Item key={suggestion.id} onClick={() => handleSuggestionClickArtista(suggestion.id)}>
                                        {suggestion.nombre}
                                    </Dropdown.Item>
                                ))}
                                {albums.length > 0 && <Dropdown.Item className="dropdown-titulo">Albums</Dropdown.Item>}
                                {albums?.map(suggestion => (
                                    <Dropdown.Item key={suggestion.id} onClick={() => handleSuggestionClickAlbum(suggestion.artista?.id, suggestion.nombre)}>
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
