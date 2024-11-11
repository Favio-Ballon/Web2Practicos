import { useState } from "react";
import "./App.css";
import UserHeader from "./components/header";
import axios from "axios";
import { useEffect } from "react";
import { Container, Col, Card, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Artistas() {
    const [listArtista, setListArtista] = useState([]);
    const [genero, setGenero] = useState();
    const { id } = useParams();

    useEffect(() => {
        getGenero();
    }, []);

    const getGenero = async () => {
        try {
            const response = await axios.get("http://localhost:3000/genero/" + id);
            setGenero(response.data);
            setListArtista(response.data?.artistas);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="contenedor">
            <UserHeader />
            <Container className="contenedor" style={{ marginTop: "0px" }}>
                <h1>Artistas</h1>
                {/* Render listArtista here */}
                <Row className="g-4">
                    {listArtista.map(artista => (
                        //card
                        <Col md={4} key={artista.id} className="genre-card">
                            <a href={`/artista/${artista.id}`} style={{ textDecoration: "none" }}>
                                <Card className="text-white bg-dark genre-card" style={{ backgroundColor: "#181818", borderRadius: "8px", overflow: "hidden" }}>
                                    <Card.Img variant="top" src={`http://localhost:3000/public/${artista.imagen}`} style={{ height: "250px", objectFit: "cover" }} />
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#FFFFFF" }}>{artista.nombre}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </a>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Artistas;
