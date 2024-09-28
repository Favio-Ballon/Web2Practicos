import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderAdmin from "./components/headerAdmin";

const ListaPeliculas = () => {
    const [ListaPeliculas, setListaPeliculas] = useState([]);
    useEffect(() => {
        getListaPeliculas();
        document.title = "Prueba título";
    }, [])

    const getListaPeliculas = () => {
        axios.get('http://localhost:3000/pelicula')
            .then(res => {
                setListaPeliculas(res.data);
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
        axios.delete(`http://localhost:3000/pelicula/${id}`)
            .then(res => {
                console.log(res.data);
                getListaPeliculas();
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
                                    <h2>Lista de peliculas</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Sinopsis</th>
                                            <th>Imagen</th>
                                            <th>Fecha de lanzamiento</th>
                                            <th>Calificacion</th>
                                            <th>trailer</th>
                                            <th>Director</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaPeliculas.map(pelicula =>
                                            <tr key={pelicula.id}>
                                                <td>{pelicula.id}</td>
                                                <td>{pelicula.nombre}</td>
                                                <td>{pelicula.sinopsis}</td>
                                                <td><Image src={"http://localhost:3000/images/pelicula/" + pelicula.imagen} width="100" height="100" fluid/></td>
                                                <td>{pelicula.fechaLanzamiento}</td>
                                                <td>{pelicula.calificacion}</td>
                                                <td>{pelicula.trailer}</td>
                                                <td>{pelicula.director_id}</td>
                                                <td><Link className="btn btn-primary" to={"/pelicula/edit/" + pelicula.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(pelicula.id) }}>Eliminar</Button></td>
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

export default ListaPeliculas;