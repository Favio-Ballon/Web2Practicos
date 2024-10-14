import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderAdmin from "../components/headerAdmin";

const ListaTipos = () => {
    const [ListaTipos, setListaTipos] = useState([]);
    
    useEffect(() => {
        getListaTipos();
        document.title = "Pokedex";
    }, []);

    const getListaTipos = () => {
        console.log("si daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        axios.get('http://localhost:3000/tipo')
            .then(res => {
                setListaTipos(res.data);
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
        axios.delete(`http://localhost:3000/tipo/${id}`)
            .then(res => {
                console.log(res.data);
                getListaTipos();
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
                                    <h2>Lista de Tipos</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaTipos.map(tipo =>
                                            <tr key={tipo.id}>
                                                <td>{tipo.id}</td>
                                                <td>{tipo.nombre}</td>
                                                <td><Link className="btn btn-primary" to={"/tipo/edit/" + tipo.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(tipo.id) }}>Eliminar</Button></td>
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

export default ListaTipos;
