import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderAdmin from "../components/headerAdmin";

const ListaAlbums = () => {
    const [ListaAlbums, setListaAlbums] = useState([]);
    useEffect(() => {
        getListaAlbums();
        document.title = "Spotify - Lista de Albums";
    }, []);

    const getListaAlbums = () => {
        console.log("si daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        axios
            .get("http://localhost:3000/album")
            .then(res => {
                setListaAlbums(res.data);
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
            .delete(`http://localhost:3000/album/${id}`)
            .then(res => {
                console.log(res.data);
                getListaAlbums();
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
                                    <h2>Lista de Albums</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Imagen</th>
                                            <th>Artista</th>
                                            <th>Canciones</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaAlbums.map(album => (
                                            <tr key={album.id}>
                                                <td>{album.id}</td>
                                                <td>{album.nombre}</td>
                                                <td>
                                                    <Image src={"http://localhost:3000/public/" + album.imagen} width="100" height="100" fluid />
                                                </td>
                                                <td>{album.artista?.nombre}</td>
                                                {/* canciones */}
                                                <td>
                                                    <ul>
                                                        {album.canciones?.map(cancion => (
                                                            <li key={cancion.id}>{cancion.nombre}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>
                                                    <Link className="btn btn-primary" to={"/album/edit/" + album.id}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => {
                                                            eliminar(album.id);
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

export default ListaAlbums;
