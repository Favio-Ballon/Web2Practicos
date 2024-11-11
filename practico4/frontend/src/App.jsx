import { useState } from "react";
import "./App.css";
import UserHeader from "./components/header";
import axios from "axios";
import { useEffect } from "react";
import { Container, Col, Card, Row } from "react-bootstrap";

function App() {
    const [listGenero, setListGenero] = useState([]);

    useEffect(() => {
        getGeneros();
    }, []);

    const getGeneros = async () => {
        try {
            const response = await axios.get("http://localhost:3000/genero");
            setListGenero(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="contenedor">
            <UserHeader />
            <Container className="contenedor" style={{ marginTop: "0px" }}>
                <h1>Generos</h1>
                {/* Render listGenero here */}
                <Row className="g-4">
                    {listGenero.map(genero => (
                        //card
                        <Col md={4} key={genero.id} className="genre-card">
                            <a href={`/genero/${genero.id}`} style={{ textDecoration: "none" }}>
                                <Card className="text-white bg-dark genre-card" style={{ backgroundColor: "#181818", borderRadius: "8px", overflow: "hidden" }}>
                                    <Card.Img variant="top" src={`http://localhost:3000/public/${genero.imagen}`} style={{ height: "250px", objectFit: "cover" }} />
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#FFFFFF" }}>{genero.nombre}</Card.Title>
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

export default App;
