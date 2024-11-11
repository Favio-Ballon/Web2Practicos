import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import HeaderAdmin from "../components/headerAdmin";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";

const FormCancion = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [artista, setArtista] = useState();
    const [mp3, setMp3] = useState();
    const [album, setAlbum] = useState();
    const [listArtistas, setlistArtistas] = useState([]);
    const [listAlbums, setlistAlbums] = useState([]);

    useEffect(() => {
        getArtistas();
        getAlbums();
        document.title = "Agregar Cancion";
        if (!id) return;
        getCancionById();
        document.title = "Editar Cancion";
    }, [id]);

    const getArtistas = async () => {
        try {
            const response = await axios.get("http://localhost:3000/artista");
            setlistArtistas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getAlbums = async () => {
        try {
            const response = await axios.get("http://localhost:3000/album");
            setlistAlbums(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getCancionById = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/cancion/${id}`);
            setNombre(response.data.nombre);
            setArtista(response.data.artista?.id);
            setMp3(response.data.mp3);
            setAlbum(response.data.album?.id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", nombre);
        if (mp3) {
            formData.append("mp3", mp3);
            console.log(mp3);
        }
        formData.append("artistaId", artista);
        formData.append("albumId", album);

        if (id) {
            await axios
                .put(`http://localhost:3000/cancion/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(res => {
                    console.log(res.data);
                    navigate("/canciones");
                    setNombre("");
                })
                .catch(error => {
                    console.log(error);
                    return;
                });
        } else {
            try {
                await axios.post("http://localhost:3000/cancion", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } catch (error) {
                console.error(error);
                return;
            }
        }
        navigate("/canciones");
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
                                    <h2>Formulario Cancion</h2>
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
                                    <div className="d-flex justify-content-between">
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
                                        <Form.Group className="col-6">
                                            <Form.Label>Album:</Form.Label>
                                            <Form.Control
                                                value={album}
                                                as="select"
                                                onChange={e => {
                                                    setAlbum(e.target.value);
                                                }}
                                            >
                                                <option value="">Seleccionar</option>
                                                {listAlbums.map(album => (
                                                    <option key={album.id} value={album.id}>
                                                        {album.nombre}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </div>

                                    <Form.Group>
                                        <Form.Label>Mp3:</Form.Label>
                                        <Form.Control type="file" accept="audio/mp3" onChange={e => setMp3(e.target.files[0])} />
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

export default FormCancion;
