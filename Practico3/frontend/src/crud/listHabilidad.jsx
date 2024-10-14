import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderAdmin from "../components/headerAdmin";

const ListaHabilidades = () => {
    const [ListaHabilidades, setListaHabilidades] = useState([]);
    
    useEffect(() => {
        getListaHabilidades();
        document.title = "Pokedex";
    }, []);

    const getListaHabilidades = () => {
        console.log("si daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        axios.get('http://localhost:3000/habilidad')
            .then(res => {
                setListaHabilidades(res.data);
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
        axios.delete(`http://localhost:3000/habilidad/${id}`)
            .then(res => {
                console.log(res.data);
                getListaHabilidades();
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
                                    <h2>Lista de Habilidades</h2>
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
                                        {ListaHabilidades.map(habilidad =>
                                            <tr key={habilidad.id}>
                                                <td>{habilidad.id}</td>
                                                <td>{habilidad.nombre}</td>
                                                <td><Link className="btn btn-primary" to={"/habilidad/edit/" + habilidad.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(habilidad.id) }}>Eliminar</Button></td>
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

export default ListaHabilidades;
