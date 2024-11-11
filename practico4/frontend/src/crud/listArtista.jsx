import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderAdmin from "../components/headerAdmin";

const ListaArtistas = () => {
    const [ListaArtistas, setListaArtistas] = useState([]);
    useEffect(() => {
        getListaArtistas();
        document.title = "Spotify - Lista de Artistas";
    }, []);

    const getListaArtistas = () => {
        console.log("si daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        axios
            .get("http://localhost:3000/artista")
            .then(res => {
                setListaArtistas(res.data);
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const eliminar = id => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios
            .delete(`http://localhost:3000/artista/${id}`)
            .then(res => {
                console.log(res.data);
                getListaArtistas();
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <HeaderAdmin />
            <Container fluid className="d-flex justify-content-center align-items-center" style={{ minWidth: "200vh" }}>
                <Row className="w-100 justify-content-center">
                    <Col md={10} lg={8}>
                        <Card className="text-center shadow">
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Artistas</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Imagen</th>
                                            <th>Genero</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaArtistas.map(artista => (
                                            <tr key={artista.id}>
                                                <td>{artista.id}</td>
                                                <td>{artista.nombre}</td>
                                                <td>
                                                    <Image src={"http://localhost:3000/public/" + artista.imagen} width="100" height="100" fluid />
                                                </td>
                                                <td>{artista.genero?.nombre}</td>
                                                <td>
                                                    <Link className="btn btn-primary" to={"/artista/edit/" + artista.id}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => {
                                                            eliminar(artista.id);
                                                        }}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ListaArtistas;
