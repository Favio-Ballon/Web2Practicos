import { useState, useEffect } from 'react';
import HeaderAdmin from '../components/headerAdmin';
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';



const FormHabilidad = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');


    useEffect(() => {
        if (!id) return;
        getHabilidadById();
        document.title = "Rotten Eggs";
    }, [id]);


    const getHabilidadById = () => {
        axios.get(`http://localhost:3000/habilidad/${id}`)
            .then(res => {
                const habilidad = res.data;
                setNombre(habilidad.nombre);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const onGuardarClick = (e) => {
        e.preventDefault();
        
        // Create a new FormData object
        const formData = new FormData();
        formData.append('nombre', nombre);
    
        if (!id) {
            console.log('Creando persona');
            console.log({ nombre});
    
            // Use FormData in the POST request
            axios.post('http://localhost:3000/habilidad/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log(res.data);
                navigate('/habilidad');
                setNombre('');
            })
            .catch(error => {
                console.log(error);
            });
        }else{
            console.log({ nombre});
    
            // Use FormData in the POST request
            axios.put(`http://localhost:3000/habilidad/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log(res.data);
                navigate('/habilidad');
                setNombre('');
            })
            .catch(error => {
                console.log(error);
            });
        }
    };


    return (
        <>
            <HeaderAdmin/>
            <Container fluid className="d-flex justify-content-center align-items-center" style={{ minWidth: '200vh' }}>
                <Row className="w-100 justify-content-center">
                    <Col md={8} lg={6} className="mx-auto">
                        <Card>
                            <Card.Body>
                                <Card.Title className="text-center">
                                    <h2>Formulario Habilidad</h2>
                                </Card.Title>
                                <Form>
                                    <Form.Group >
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control value={nombre} type="text" onChange={(e) => {
                                            setNombre(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group className="mt-3 text-center">
                                        <Button onClick={onGuardarClick}>Guardar datos</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>);
}


export default FormHabilidad