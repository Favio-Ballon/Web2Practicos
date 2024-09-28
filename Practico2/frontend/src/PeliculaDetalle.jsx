import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import HeaderAdmin from './components/headerAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const PeliculaDetalle = () => {

    const { id } = useParams();
    const [pelicula, setPelicula] = useState({});
    useEffect(() => {
        getPeliculaById();
    }, [id]);

    const getPeliculaById = () => {
        axios.get(`http://localhost:3000/pelicula/${id}`)
            .then(res => {
                const pelicula = res.data;
                setPelicula(pelicula);
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    //format date to month in text day and year
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('es-ES', options);
    }


    return (
        <>
            <HeaderAdmin />
            <Container className="mt-3 mb-3">
                <Card>
                    <Card.Body>
                        {/* Trailer en la parte superior */}
                        <div className="mb-4">
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe
                                    className="embed-responsive-item"
                                    src={pelicula?.trailer}
                                    title={`Trailer de ${pelicula?.nombre}`}
                                    allowFullScreen
                                    style={{ width: '100%', height: '400px', border: 'none' }}
                                ></iframe>
                            </div>
                        </div>

                        {/* Imagen y detalles */}
                        <Row>
                            {/* Imagen a la izquierda */}
                            <Col xs={12} md={4} lg={3}>
                                <Image
                                    src={`http://localhost:3000/images/pelicula/${pelicula?.imagen}`}
                                    thumbnail
                                    alt={pelicula.nombre}
                                    className="w-100"
                                />
                            </Col>
                            {/* Detalles a la derecha */}
                            <Col xs={12} md={8} lg={9}>
                                <Card className="border-0">
                                    <Card.Body>
                                        <Card.Title>{pelicula?.nombre}</Card.Title>
                                        <Card.Text>{pelicula?.sinopsis}</Card.Text>
                                        <Card.Text>
                                            Se estrenó el {formatDate(pelicula?.fechaLanzamiento)}
                                        </Card.Text>
                                        <Card.Text>
                                            <FontAwesomeIcon icon={faHeart} style={{ color: "#ea1010" }} /> {pelicula?.calificacion}%
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Tarjeta combinada para Director y Reparto */}
                <Card className="mt-4">
                    <Card.Body>
                        <Row >
                            {/* Tarjeta del Director */}
                            <Col xs={6} sm={4} md={3} lg={3} className="mb-4">
                                    <Card.Title>Director</Card.Title>
                                    <Card className="border-0" style={{ width: 'fit-content', margin: 'auto' }}>
                                        <Image
                                            src={`http://localhost:3000/images/reparto/${pelicula.director?.foto}`}
                                            rounded
                                            alt={pelicula.director?.nombre}
                                            className="mb-2"
                                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                        />
                                        <Card.Body>
                                            <Card.Text>
                                                <strong>{pelicula.director?.nombre}</strong>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                        </Row>

                        {/* Tarjeta del Reparto */}
                        <Row>
                            <Card.Title>Reparto</Card.Title>
                            {pelicula.repartos?.map((actor) => (
                                <Col key={actor.id} xs={6} sm={4} md={3} lg={3} className="mb-4">
                                    <Card className="border-0" style={{ width: 'fit-content', margin: 'auto' }}>
                                        <Image
                                            src={`http://localhost:3000/images/reparto/${actor?.foto}`}
                                            rounded
                                            alt={actor?.nombre}
                                            className="mb-2"
                                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                        />
                                        <Card.Body>
                                            <Card.Text>
                                                <strong>{actor?.nombre}</strong>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}

                        </Row>
                    </Card.Body>
                </Card>
            </Container >
        </>
    );
}

export default PeliculaDetalle;
