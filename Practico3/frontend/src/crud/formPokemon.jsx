import { useState, useEffect } from 'react';
import HeaderAdmin from '../components/headerAdmin';
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';



const FormPokemon = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [nroPokedex, setnroPokedex] = useState('');
    const [tipo1, setTipo] = useState('');
    const [tipo2, setTipo2] = useState('');
    const [habilidad1, setHabilidad1] = useState('');
    const [habilidad2, setHabilidad2] = useState('');
    const [habilidad3, setHabilidad3] = useState('');
    const [descripcion, setdescripcion] = useState('');
    const [hp, sethp] = useState('');
    const [attack, setAttack] = useState('');
    const [defense, setDefense] = useState('');
    const [spAttack, setspAttack] = useState('');
    const [spDefense, setspDefense] = useState('');
    const [speed, setSpeed] = useState('');
    const [nivelEvolucion, setNivelEvolucion] = useState('');
    const [evPrevia, setEvPrevia] = useState('');
    const [evSiguiente, setEvSiguiente] = useState('');
    const [imagen, setImagen] = useState(null);
    const [tipos, setTipos] = useState([]);
    const [habilidades, setHabilidades] = useState([]);
    const [pokemon, setPokemon] = useState([]);



    useEffect(() => {
        getHabilidades();
        getTipos();
        getAllPokemon();
        if (!id) return;
        getPokemonById();
        document.title = "Pokedex";
    }, [id]);

    const getHabilidades = () => {
        axios.get('http://localhost:3000/habilidad')
            .then(res => {
                setHabilidades(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const getTipos = () => {
        axios.get('http://localhost:3000/tipo')
            .then(res => {
                setTipos(res.data);
            }
            ).catch(error => {
                console.log(error);
            }
            );
    }

    const getAllPokemon = () => {
        axios.get('http://localhost:3000/pokemon')
            .then(res => {
                setPokemon(res.data);
                console.log(res.data);
            }).catch(error => {
                console.log(error);
            });
    }

    const getPokemonById = () => {
        axios.get(`http://localhost:3000/pokemon/${id}`)
            .then(res => {
                const pokemon = res.data;
                setNombre(pokemon.nombre || '');
                setnroPokedex(pokemon.nroPokedex || '');
                setTipo(pokemon.idTipo1 || '');
                setTipo2(pokemon.idTipo2 || '');
                setHabilidad1(pokemon.idHabilidad1 || '');
                setHabilidad2(pokemon.idHabilidad2 || '');
                setHabilidad3(pokemon.idHabilidad3 || '');
                setdescripcion(pokemon.descripcion || '');
                sethp(pokemon.hp || '');
                setAttack(pokemon.attack || '');
                setDefense(pokemon.defense || '');
                setspAttack(pokemon.spAttack || '');
                setspDefense(pokemon.spDefense || '');
                setSpeed(pokemon.speed || '');
                setNivelEvolucion(pokemon.nivelEvolucion || '');
                setEvPrevia(pokemon.idEvPrevia || '');
                setEvSiguiente(pokemon.idEvSiguiente || '');
                setImagen(pokemon.imagen || null);
                

                console.log(pokemon);
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
        formData.append('nroPokedex', nroPokedex);
        formData.append('idTipo1', tipo1);
        if (tipo2) {
            formData.append('idTipo2', tipo2);
        }
        formData.append('idHabilidad1', habilidad1);
        if (habilidad2) {
            formData.append('idHabilidad2', habilidad2);
        }
        if (habilidad3) {
            formData.append('idHabilidad3', habilidad3);
        }
        formData.append('descripcion', descripcion);
        formData.append('hp', hp);
        formData.append('attack', attack);
        formData.append('defense', defense);
        formData.append('spAttack', spAttack);
        formData.append('spDefense', spDefense);
        formData.append('speed', speed);
        formData.append('nivelEvolucion', nivelEvolucion);
        if (evPrevia) {
            console.log("se apendeja")
            console.log(evPrevia);
            formData.append('idEvPrevia', evPrevia);
        }
        if (evSiguiente) {
            formData.append('idEvSiguiente', evSiguiente);
        }
        if (imagen) {
            formData.append('imagen', imagen);
        }
        

        console.log(formData);

        if (!id) {
            console.log('Creando persona');
            console.log({ nombre });

            // Use FormData in the POST request
            axios.post('http://localhost:3000/pokemon/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res.data);
                    navigate('/pokemon');
                    setNombre('');
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            console.log('Actualizando persona');
            console.log({ nombre });

            // Use FormData in the POST request
            axios.put(`http://localhost:3000/pokemon/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res.data);
                    navigate('/pokemon');
                    setNombre('');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            setImagen(file);
        }
    };


    return (
        <>
            <HeaderAdmin />
            <Container fluid className="d-flex justify-content-center align-items-center" style={{ minWidth: '200vh' }}>
                <Row className="w-100 justify-content-center">
                    <Col md={8} lg={6} className="mx-auto">
                        <Card>
                            <Card.Body>
                                <Card.Title className="text-center">
                                    <h2>Formulario Pokemon</h2>
                                </Card.Title>
                                <Form>
                                    <Form.Group >
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control value={nombre} type="text" onChange={(e) => {
                                            setNombre(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Nro Pokedex:</Form.Label>
                                        <Form.Control value={nroPokedex} type="number" onChange={(e) => {
                                            setnroPokedex(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Tipo 1:</Form.Label>
                                        <Form.Control value={tipo1} as="select" onChange={(e) => {
                                            setTipo(e.target.value);
                                        }}>
                                            <option value="">Seleccionar</option>
                                            {tipos.map(tipo =>
                                                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Tipo 2:</Form.Label>
                                        <Form.Control value={tipo2} as="select" onChange={(e) => {
                                            setTipo2(e.target.value);
                                        }}>
                                            <option value="">Seleccionar</option>
                                            {tipos.map(tipo =>
                                                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Habilidad 1:</Form.Label>
                                        <Form.Control value={habilidad1} as="select" onChange={(e) => {
                                            setHabilidad1(e.target.value);
                                        }}>
                                            <option value="">Seleccionar</option>
                                            {habilidades.map(habilidad =>
                                                <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Habilidad 2:</Form.Label>
                                        <Form.Control value={habilidad2} as="select" onChange={(e) => {
                                            setHabilidad2(e.target.value);
                                        }}>
                                            <option value="">Seleccionar</option>
                                            {habilidades.map(habilidad =>
                                                <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Habilidad 3:</Form.Label>
                                        <Form.Control value={habilidad3} as="select" onChange={(e) => {
                                            setHabilidad3(e.target.value);
                                        }}>
                                            <option value="">Seleccionar</option>
                                            {habilidades.map(habilidad =>
                                                <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Descripción:</Form.Label>
                                        <Form.Control value={descripcion} type="text" onChange={(e) => {
                                            setdescripcion(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Hp:</Form.Label>
                                        <Form.Control value={hp} type="number" onChange={(e) => {
                                            sethp(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Attack:</Form.Label>
                                        <Form.Control value={attack} type="number" onChange={(e) => {
                                            setAttack(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Defense:</Form.Label>
                                        <Form.Control value={defense} type="number" onChange={(e) => {
                                            setDefense(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>SpAttack:</Form.Label>
                                        <Form.Control value={spAttack} type="number" onChange={(e) => {
                                            setspAttack(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>SpDefense:</Form.Label>
                                        <Form.Control value={spDefense} type="number" onChange={(e) => {
                                            setspDefense(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Speed:</Form.Label>
                                        <Form.Control value={speed} type="number" onChange={(e) => {
                                            setSpeed(e.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Nivel Evolución:</Form.Label>
                                        <Form.Control value={nivelEvolucion} type="number" onChange={(e) => {
                                            setNivelEvolucion(e.target.value);
                                        }} />
                                    </Form.Group>
                                    {/* select evolucion previa */}
                                    <Form.Group >
                                        <Form.Label>Evolución Previa:</Form.Label>
                                        <Form.Control value={evPrevia} as="select" onChange={(e) => {
                                            setEvPrevia(e.target.value);
                                        }}>
                                            <option value="">Seleccionar</option>
                                            {pokemon.map(pokemon =>
                                                <option key={pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Evolución Siguiente:</Form.Label>
                                        <Form.Control value={evSiguiente} as="select" onChange={(e) => {
                                            setEvSiguiente(e.target.value);
                                        }}>
                                            <option value="">Seleccionar</option>
                                            {pokemon.map(pokemon =>
                                                <option key={pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    
                                    <Form.Group >
                                        <Form.Label>Imagen:</Form.Label>
                                        <Form.Control type="file" accept="image/jpeg, image/jpg, image/png" onChange={onFileChange} />
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


export default FormPokemon