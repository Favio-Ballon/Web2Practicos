import { useState, useEffect } from 'react';
import HeaderAdmin from './components/headerAdmin';
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';



const FormReparto = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [foto, setFoto] = useState(null);


    useEffect(() => {
        if (!id) return;
        getRepartoById();
        document.title = "Rotten Eggs";
    }, [id]);


    const getRepartoById = () => {
        axios.get(`http://localhost:3000/reparto/${id}`)
            .then(res => {
                const reparto = res.data;
                setNombre(reparto.nombre);
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
        formData.append('foto', foto); // Append the file
    
        if (!id) {
            console.log('Creando persona');
            console.log({ nombre, foto });
    
            // Use FormData in the POST request
            axios.post('http://localhost:3000/reparto/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log(res.data);
                navigate('/reparto');
                setNombre('');
                setFoto('');
            })
            .catch(error => {
                console.log(error);
            });
        }else{
            console.log('Actualizando persona');
            console.log({ nombre, foto });
    
            // Use FormData in the POST request
            axios.put(`http://localhost:3000/reparto/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log(res.data);
                navigate('/reparto');
                setNombre('');
                setFoto('');
            })
            .catch(error => {
                console.log(error);
            });
        }
    };

    const onFileChange = (e) => {
        const file = e.target.files[0]; // Get the first file selected
        if (file) {
            setFoto(file); // Store the file in the state
            //setFotoPreview(URL.createObjectURL(file)); // Set preview using URL.createObjectURL
        }
    };


    return (
        <>
            <HeaderAdmin></HeaderAdmin>
            <Container>
                <Row className="mt-4 mb-4">
                    <Col md={8} lg={6} className="mx-auto">
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Formulario Reparto</h2>
                                </Card.Title>
                                <Form>
                                    <Form.Group >
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control value={nombre} type="text" onChange={(e) => {
                                            setNombre(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>foto</Form.Label>
                                        <Form.Control type="file" accept="image/jpeg, image/jpg, image/png" onChange={onFileChange} />
                                    </Form.Group>
                                    <Form.Group className="mt-3">
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


export default FormReparto