import { Fragment } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Table } from "react-bootstrap";
import UserHeader from "./components/header";
// import index.css
import './index.css';



function PokemonDetalle() {

    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [evoluciones, setEvoluciones] = useState([]);


    useEffect(() => {
        getPokemon();
        getEvoluciones();
        document.title = "Pokedex";
    }, []);

    const getPokemon = () => {
        axios.get(`http://localhost:3000/pokemon/${id}`)
            .then(res => {
                setPokemon(res.data);
            }).catch(error => {
                console.log(error);
            });
    }

    const getEvoluciones = () => {
        axios.get(`http://localhost:3000/pokemon/evolucion/${id}`)
            .then(res => {
                setEvoluciones(res.data);
            }).catch(error => {
                console.log(error);
            });
    }

    const calculateMinStat = (stat) => {
        return Math.floor((((((2 * stat + 0 + (0 / 4)) / 100) * 100) + 5) * 0.9));
    };

    const calculateMaxStat = (stat) => {
        return Math.floor(((((2 * stat + 31 + (252 / 4)) / 100) * 100) + 5) * 1.1);
    };




    return (
        <>
            <UserHeader />
            <Container style={{ marginTop: '45px' }}>
                <Row>
                    <Col className="text-center" >
                        <h1>{pokemon.nombre} {' #' + pokemon.nroPokedex}</h1>
                        <Image src={`http://localhost:3000/images/pokemon/${pokemon.imagen}`} alt={pokemon.nombre} width="400" height="400" fluid />
                        <p>{pokemon.descripcion}</p>
                    </Col>
                    <Col>
                        <Table striped bordered hover responsive>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td colSpan={4}><h3>Tipo</h3></td>
                                </tr>
                                <tr>
                                    <td>Tipo 1: </td>
                                    <td colSpan={3}>{pokemon.tipo1?.nombre || 'N/A'}</td>
                                </tr>
                                {pokemon.tipo2 &&
                                    <tr>
                                        <td>Tipo 2: </td>
                                        <td colSpan={3}>{pokemon.tipo2?.nombre || 'N/A'}</td>
                                    </tr>
                                }
                                <tr>
                                    <td colSpan={4}><h3>Habilidades</h3></td>
                                </tr>
                                <tr>
                                    <td>Habilidad 1: </td>
                                    <td colSpan={3}>{pokemon.habilidad1?.nombre || 'N/A'}</td>
                                </tr>
                                {pokemon.habilidad2 &&
                                    <tr>
                                        <td>Habilidad 2: </td>
                                        <td colSpan={3}>{pokemon.habilidad2?.nombre || 'N/A'}</td>
                                    </tr>
                                }
                                {pokemon.habilidad3 &&
                                    <tr>
                                        <td>Habilidad oculta: </td>
                                        <td colSpan={3}>{pokemon.habilidad3?.nombre || 'N/A'}</td>
                                    </tr>
                                }


                                <tr>
                                    <td><h3>Estadisticas</h3></td>
                                    <td> <h4>Nivel 1</h4></td>
                                    <td colSpan={2}><h4>Nivel 100</h4></td>
                                </tr>
                                <tr>
                                    <td>Hp:</td>
                                    <td>{pokemon.hp}</td>
                                    {/* minimo : (( 2×Base+0+(0/4) )/100)*100+110*/}
                                    <td>{(((2 * pokemon.hp + 0 + (0 / 4)) / 100) * 100) + 110}</td>
                                    {/* maximo : (( 2×Base + 31 + (252/4) )/100)*100+110*/}
                                    <td>{(((2 * pokemon.hp + 31 + (252 / 4)) / 100) * 100) + 110}</td>
                                </tr>
                                <tr>
                                    <td>Ataque:</td>
                                    <td>{pokemon.attack}</td>
                                    <td>{isNaN(calculateMinStat(pokemon.attack)) ? 'N/A' : calculateMinStat(pokemon.attack)}</td>
                                    <td>{isNaN(calculateMaxStat(pokemon.attack)) ? 'N/A' : calculateMaxStat(pokemon.attack)}</td>

                                </tr>
                                <tr>
                                    <td>Defensa:</td>
                                    <td>{pokemon.defense}</td>
                                    <td>{isNaN(calculateMinStat(pokemon.defense)) ? 'N/A' : calculateMinStat(pokemon.defense)}</td>
                                    <td>{isNaN(calculateMaxStat(pokemon.defense)) ? 'N/A' : calculateMaxStat(pokemon.defense)}</td>
                                </tr>
                                <tr>
                                    <td>Ataque Especial:</td>
                                    <td>{pokemon.spAttack}</td>
                                    <td>{isNaN(calculateMinStat(pokemon.spAttack)) ? 'N/A' : calculateMinStat(pokemon.spAttack)}</td>
                                    <td>{isNaN(calculateMaxStat(pokemon.spAttack)) ? 'N/A' : calculateMaxStat(pokemon.spAttack)}</td>
                                </tr>
                                <tr>
                                    <td>Defensa Especial:</td>
                                    <td>{pokemon.spDefense}</td>
                                    <td>{isNaN(calculateMinStat(pokemon.spDefense)) ? 'N/A' : calculateMinStat(pokemon.spDefense)}</td>
                                    <td>{isNaN(calculateMaxStat(pokemon.spDefense)) ? 'N/A' : calculateMaxStat(pokemon.spDefense)}</td>
                                </tr>
                                <tr>
                                    <td>Velocidad:</td>
                                    <td>{pokemon.speed}</td>
                                    <td>{isNaN(calculateMinStat(pokemon.speed)) ? 'N/A' : calculateMinStat(pokemon.speed)}</td>
                                    <td>{isNaN(calculateMaxStat(pokemon.speed)) ? 'N/A' : calculateMaxStat(pokemon.speed)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                <Col>
                    <h2>Evoluciones</h2>
                </Col>
            </Row>
            <Row>
                {evoluciones.map((evolucion, index) => (
                    <Fragment key={evolucion.id}>
                        <Col>
                            <Image
                                src={"http://localhost:3000/images/pokemon/" + evolucion.imagen}
                                width="100"
                                height="100"
                                fluid
                            /><br/>
                            <a href={`/pokemon/${evolucion.id}`}>{evolucion.nombre}</a>
                        </Col>
                        {index < evoluciones.length - 1 && (
                            <Col className="d-flex align-items-center justify-content-center">
                                <div className="blockHead">
                                <span className="blocktext">{isNaN(evolucion.nivelEvolucion) ? 'N/A' : evolucion.nivelEvolucion}</span>
                                </div>
                            </Col>
                        )}
                    </Fragment>
                ))}
            </Row>
        </Container>
        </>
    );
}

export default PokemonDetalle;