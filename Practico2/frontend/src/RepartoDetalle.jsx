import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import UserHeader from './components/header';

const RepartoDetalle = () => {

    const { id } = useParams();
    const [peliculas, setPeliculas] = useState([]);
    const [nombre, setNombre] = useState('');
    const [foto, setFoto] = useState('');

    useEffect(() => {
        getRepartoById();
    }, [id]);

    const getRepartoById = () => {
        axios.get(`http://localhost:3000/reparto/${id}`)
            .then(res => {
                const peliculas = res.data.peliculas;
                setNombre(res.data.nombre);
                setFoto(res.data.foto);
                setPeliculas(peliculas);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <UserHeader />
            <Container className="mt-4 mb-4">
                <Card className="shadow-sm">
                    <Card.Body>
                        <Row>
                            {/* Image on the left */}
                            <Col xs={12} md={4} lg={3}>
                                <Image
                                    src={`http://localhost:3000/images/reparto/${foto}`}
                                    thumbnail
                                    alt={nombre}
                                    className="w-100 rounded"
                                    style={{ objectFit: 'cover', height: '100%' }}
                                />
                            </Col>
                            {/* Actor details on the right */}
                            <Col xs={12} md={8} lg={9}>
                                <Card className="border-0">
                                    <Card.Body>
                                        <Card.Title className="mb-3">{nombre}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
    
                {/* Movie list */}
                <Card className="mt-5 shadow-sm">
                    <Card.Body>
                        <Card.Title className="mb-4">Películas en las que aparece</Card.Title>
                        <Row>
                            {peliculas.map((pelicula) => (
                                <Col key={pelicula.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                    <Link to={`/pelicula/${pelicula.id}`} style={{ textDecoration: 'none' }}>
                                        <Card className="border-0" style={{ textAlign: 'center' }}>
                                            <Image
                                                src={`http://localhost:3000/images/pelicula/${pelicula.imagen}`}
                                                rounded
                                                alt={pelicula.nombre}
                                                className="mb-2"
                                                style={{ width: '150px', height: '150px', objectFit: 'cover', margin: 'auto' }}
                                            />
                                            <Card.Body>
                                                <Card.Text><strong>{pelicula.nombre}</strong></Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
    
}

export default RepartoDetalle;
