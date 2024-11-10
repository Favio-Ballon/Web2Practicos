import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderAdmin from "../components/headerAdmin";

const ListaCanciones = () => {
    const [ListaCanciones, setListaCanciones] = useState([]);
    useEffect(() => {
        getListaCanciones();
        document.title = "Spotify - Lista de Canciones";
    }, []);

    const getListaCanciones = () => {
        console.log("si daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        axios.get('http://localhost:3000/cancion')
            .then(res => {
                setListaCanciones(res.data);
                console.log(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/cancion/${id}`)
            .then(res => {
                console.log(res.data);
                getListaCanciones();
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <HeaderAdmin />
            <Container fluid className="d-flex justify-content-center align-items-center" style={{ minWidth: '200vh' }}>
                <Row className="w-100 justify-content-center">
                    <Col md={10} lg={8}>
                        <Card className="text-center shadow">
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Canciones</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Artista</th>
                                            <th>Album</th>
                                            <th>mp3</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaCanciones.map(cancion =>
                                            <tr key={cancion.id}>
                                                <td>{cancion.id}</td>
                                                <td>{cancion.nombre}</td>
                                                <td>{cancion.artista?.nombre}</td>
                                                <td>{cancion.album?.nombre}</td>
                                                <td>{cancion.mp3}</td>
                                                <td><Link className="btn btn-primary" to={"/cancion/edit/" + cancion.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(cancion.id) }}>Eliminar</Button></td>
                                            </tr>
                                        )}
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

export default ListaCanciones;
