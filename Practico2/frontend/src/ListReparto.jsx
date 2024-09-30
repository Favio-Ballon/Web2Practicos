import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderAdmin from "./components/headerAdmin";

const ListaRepartos = () => {
    const [ListaRepartos, setListaRepartos] = useState([]);
    useEffect(() => {
        getListaRepartos();
        document.title = "Rotten Eggs";
    }, [])

    const getListaRepartos = () => {
        axios.get('http://localhost:3000/reparto')
            .then(res => {
                setListaRepartos(res.data);
                console.log(res.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/reparto/${id}`)
            .then(res => {
                console.log(res.data);
                getListaRepartos();
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <HeaderAdmin />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de repartos</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Foto</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaRepartos.map(reparto =>
                                            <tr key={reparto.id}>
                                                <td>{reparto.id}</td>
                                                <td>{reparto.nombre}</td>
                                                <td> <Image src={"http://localhost:3000/images/reparto/" + reparto.foto} width="100" height="100" fluid/></td>
                                                <td><Link className="btn btn-primary" to={"/reparto/edit/" + reparto.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(reparto.id) }}>Eliminar</Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </>
    );
}

export default ListaRepartos;