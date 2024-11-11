import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import HeaderAdmin from "../components/headerAdmin";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";

const FormAlbum = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [imagen, setImagen] = useState();
    const [artista, setArtista] = useState();
    const [listArtistas, setListArtistas] = useState([]);

    useEffect(() => {
        document.title = "Agregar Album";
        getArtistas();
        if (!id) return;
        getAlbumById();
        document.title = "Editar Album";
    }, [id]);

    const getAlbumById = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/album/${id}`);
            setNombre(response.data.nombre);
            setImagen(response.data.imagen);
            setArtista(response.data.artista?.id);
        } catch (error) {
            console.error(error);
        }
    };

    const getArtistas = async () => {
        try {
            const response = await axios.get("http://localhost:3000/artista");
            setListArtistas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", nombre);
        if (imagen) {
            formData.append("imagen", imagen);
        }
        formData.append("artistaId", artista);

        if (id) {
            await axios
                .put(`http://localhost:3000/album/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(res => {
                    console.log(res.data);
                    navigate("/album");
                    setNombre("");
                })
                .catch(error => {
                    console.log(error);
                    return;
                });
        } else {
            try {
                await axios.post("http://localhost:3000/album", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } catch (error) {
                console.error(error);
                return;
            }
        }
        navigate("/album");
    };

    return (
        <>
            <HeaderAdmin />
            <Container fluid className="d-flex justify-content-center align-items-center" style={{ minWidth: "200vh" }}>
                <Row className="w-100 justify-content-center">
                    <Col md={8} lg={6} className="mx-auto">
                        <Card>
                            <Card.Body>
                                <Card.Title className="text-center">
                                    <h2>Formulario Album</h2>
                                </Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control
                                            value={nombre}
                                            type="text"
                                            onChange={e => {
                                                setNombre(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-6">
                                        <Form.Label>Artista:</Form.Label>
                                        <Form.Control
                                            value={artista}
                                            as="select"
                                            onChange={e => {
                                                setArtista(e.target.value);
                                            }}
                                        >
                                            <option value="">Seleccionar</option>
                                            {listArtistas.map(artista => (
                                                <option key={artista.id} value={artista.id}>
                                                    {artista.nombre}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Imagen:</Form.Label>
                                        {/* solo imagenes */}
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={e => {
                                                setImagen(e.target.files[0]);
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mt-3 text-center">
                                        <Button onClick={handleSubmit}>Guardar datos</Button>
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

export default FormAlbum;
