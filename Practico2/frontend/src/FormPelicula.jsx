import { useState, useEffect } from 'react';
import HeaderAdmin from './components/headerAdmin';
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const FormPelicula = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [imagen, setImagen] = useState(null);
    const [fechaLanzamiento, setFechaLanzamiento] = useState('');
    const [calificacion, setCalificacion] = useState('');
    const [trailer, setTrailer] = useState('');
    const [director_id, setDirector_id] = useState('');
    const [repartoList, setRepartoList] = useState([]);
    const [selectedReparto, setSelectedReparto] = useState(['']); // Track reparto IDs
    const [repartoAvailable, setRepartoAvailable] = useState([]); // Track available reparto IDs

    useEffect(() => {
        getListaReparto();
    }, [selectedReparto]);

    useEffect(() => {
        if (!id) return;
        getPeliculaById();
    }, [id]);

    useEffect(() => {
        filterReparto();
    }, [repartoList]);

    const getPeliculaById = () => {
        axios.get(`http://localhost:3000/pelicula/${id}`)
            .then(res => {
                const pelicula = res.data;
                setNombre(pelicula.nombre);
                setSinopsis(pelicula.sinopsis);
                setImagen(pelicula.imagen);
                setFechaLanzamiento(transformDate(pelicula.fechaLanzamiento));
                setCalificacion(pelicula.calificacion);
                setTrailer(pelicula.trailer);
                setDirector_id(pelicula.director_id);

                //transofrm pelicula.repartos into a list of reparto IDs and add an empty one at the end
                let repartos = pelicula.repartos.map(reparto => reparto.id);
                repartos.push(''); // Add an empty selection for reparto
                setSelectedReparto(repartos);

            })
            .catch(error => {
                console.log(error);
            });
    }

    const getListaReparto = () => {
        axios.get('http://localhost:3000/reparto')
            .then(res => {
                setRepartoList(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const onGuardarClick = (e) => {
        e.preventDefault();
        //get the values that are not '' from selectedReparto
        const actores = selectedReparto.filter(repartoId => repartoId !== '');

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('imagen', imagen);
        formData.append('sinopsis', sinopsis);
        formData.append('fechaLanzamiento', fechaLanzamiento);
        formData.append('calificacion', calificacion);
        formData.append('trailer', trailer);
        formData.append('director_id', director_id);
        formData.append('repartos', actores);

        console.log(fechaLanzamiento);

        if (!id) {
            axios.post('http://localhost:3000/pelicula/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(() => {
                    navigate('/pelicula');
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            axios.put(`http://localhost:3000/pelicula/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(() => {
                    navigate('/pelicula');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const filterReparto = () => {
        console.log("Los repartos son " + repartoList.map(reparto => reparto.nombre));
        let available = repartoList.filter(reparto => !selectedReparto.includes(reparto.id));
        console.log("Los repartos disponibles son: " + available.map(reparto => reparto.nombre));
        setRepartoAvailable(available);
    }

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagen(file);
        }
    };

    const transformDate = (date) => {
        const [year, month, day] = date.split('-');
        const [dayPart] = day.split('T');
        return `${year}-${month}-${dayPart}`;
    }

    // Function to handle adding new reparto selection
    const addRepartoField = () => {
        setSelectedReparto([...selectedReparto, '']); // Add a new empty selection for reparto
    };

    // Function to handle reparto selection
    const handleRepartoChange = (index, value) => {
        //convert value to integer
        console.log('EL index es ' + index + 'el value es ' + value);
        selectedReparto[index] = parseInt(value);
        //now update the state of the web
        setSelectedReparto([...selectedReparto]);
        if (index === selectedReparto.length - 1) {
            addRepartoField(); // Add a new empty selection for reparto
        }
        filterReparto();
    };

    return (
        <>
            <HeaderAdmin />
            <Container>
                <Row className="mt-4 mb-4">
                    <Col md={8} lg={6} className="mx-auto">
                        <Card>
                            <Card.Body>
                                <Card.Title as="h2" className="mb-4">
                                    <h2>Formulario Pelicula</h2>
                                </Card.Title>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control value={nombre} type="text" onChange={(e) => setNombre(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Imagen</Form.Label>
                                        <Form.Control type="file" accept="image/jpeg, image/jpg, image/png" onChange={onFileChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Sinopsis:</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={sinopsis}
                                            onChange={(e) => setSinopsis(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Fecha de lanzamiento:</Form.Label>
                                        <Form.Control value={fechaLanzamiento} type="date" onChange={(e) => setFechaLanzamiento(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Calificacion:</Form.Label>
                                        <Form.Control value={calificacion} type="number" onChange={(e) => setCalificacion(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Trailer:</Form.Label>
                                        <Form.Control value={trailer} type="text" onChange={(e) => setTrailer(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Director:</Form.Label>
                                        <Form.Select value={director_id} onChange={(e) => setDirector_id(e.target.value)}>
                                            <option>Seleccione un Director...</option>
                                            {repartoList.map(director => (
                                                <option key={director.id} value={director.id}>{director.nombre}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    {/* Dynamic reparto selection */}
                                    {selectedReparto.map((repartoId, index) => (
                                        <Form.Group className='' key={index} >
                                            <Form.Label>Reparto {index + 1}:</Form.Label>
                                            <div className="d-flex justify-content-between">
                                                <Form.Select className='me-2' value={repartoId} onChange={(e) => handleRepartoChange(index, e.target.value)}>
                                                    {repartoId == '' &&
                                                        <option value=''>Seleccione un actor...</option>
                                                    }
                                                    {repartoList.map(actor =>
                                                        actor.id == repartoId && (
                                                            <option key={actor.id} value={actor.id}>
                                                                {actor.nombre}
                                                            </option>
                                                        )
                                                    )}
                                                    {repartoAvailable.map(actor =>
                                                        <option key={actor.id} value={actor.id}>
                                                            {actor.nombre}
                                                        </option>
                                                    )}
                                                </Form.Select>
                                                {/* add button to delete */}
                                                {repartoId !== '' &&
                                                    <Button className="btn btn-danger" onClick={() => { selectedReparto.splice(index, 1); setSelectedReparto([...selectedReparto]); filterReparto(); }}>X</Button>
                                                }
                                            </div>
                                        </Form.Group>
                                    ))}

                                    <Form.Group className="mt-3">
                                        <Button onClick={onGuardarClick}>Guardar datos</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FormPelicula;
