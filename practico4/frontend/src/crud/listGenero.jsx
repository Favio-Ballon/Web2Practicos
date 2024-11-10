import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderAdmin from "../components/headerAdmin";

const ListaGeneros = () => {
    const [ListaGeneros, setListaGeneros] = useState([]);
    useEffect(() => {
        getListaGeneros();
        document.title = "Spotify - Lista de Generos";
    }, []);

    const getListaGeneros = () => {
        console.log("si daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        axios
            .get("http://localhost:3000/genero")
            .then(res => {
                setListaGeneros(res.data);
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
            .delete(`http://localhost:3000/genero/${id}`)
            .then(res => {
                console.log(res.data);
                getListaGeneros();
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
                                    <h2>Lista de Generos</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Imagen</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaGeneros.map(genero => (
                                            <tr key={genero.id}>
                                                <td>{genero.id}</td>
                                                <td>{genero.nombre}</td>
                                                <td>
                                                    <Image src={"http://localhost:3000/public/" + genero.imagen} width="100" height="100" fluid />
                                                </td>
                                                <td>
                                                    <Link className="btn btn-primary" to={"/genero/edit/" + genero.id}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => {
                                                            eliminar(genero.id);
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

export default ListaGeneros;
