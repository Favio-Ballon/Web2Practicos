import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderAdmin from "../components/headerAdmin";

const ListaPokemon = () => {
    const [ListaPokemon, setListaPokemon] = useState([]);
    useEffect(() => {
        getListaPokemon();
        document.title = "Pokedex";
    }, []);

    const getListaPokemon = () => {
        axios.get('http://localhost:3000/pokemon')
            .then(res => {
                setListaPokemon(res.data);
                console.log(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/pokemon/${id}`)
            .then(res => {
                console.log(res.data);
                getListaPokemon();
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <HeaderAdmin />
            <Container fluid className="d-flex justify-content-center align-items-center" style={{ minWidth: '200px', marginTop: '70px' }}>
                <Row className="w-100 justify-content-center">
                    <Col md={10} lg={8}>
                        <Card className="text-center shadow">
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Pokémon</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>nroPokedex</th>
                                            <th>Tipos</th>
                                            <th>Habilidades</th>
                                            <th>Descripción</th>
                                            <th>Estadísticas</th>
                                            <th>nivelEvolucion</th>
                                            <th>idEvPrevia</th>
                                            <th>idEvSiguiente</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaPokemon.map(pokemon =>
                                            <tr key={pokemon.id}>
                                                <td><Image src={"http://localhost:3000/images/pokemon/" + pokemon.imagen} width="100" height="100" fluid /></td>
                                                <td>{pokemon.id}</td>
                                                <td>{pokemon.nombre}</td>
                                                <td>{pokemon.nroPokedex}</td>
                                                <td>
                                                    {pokemon.tipo1?.nombre} <br />
                                                    {pokemon.tipo2?.nombre}
                                                </td>
                                                <td>
                                                    {pokemon.habilidad1?.nombre}<br />
                                                    {pokemon.habilidad2?.nombre}<br />
                                                    {pokemon.habilidad3?.nombre}<br />
                                                </td>
                                                <td>{pokemon.descripcion}</td>
                                                <td>
                                                    Hp: {pokemon.hp} <br />
                                                    Attack: {pokemon.attack} <br />
                                                    Defense: {pokemon.defense}<br />
                                                    SpAttack: {pokemon.spAttack}<br />
                                                    SpDefense: {pokemon.spDefense}<br />
                                                    Speed: {pokemon.speed}<br />
                                                </td>
                                                <td>{pokemon.nivelEvolucion ?? "N/A"}</td>
                                                <td>{pokemon.evPrevia?.nombre ?? "N/A"}</td>
                                                <td>{pokemon.evSiguiente?.nombre ?? "N/A"}</td>
                                                <td><Link className="btn btn-primary" to={"/pokemon/edit/" + pokemon.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(pokemon.id) }}>Eliminar</Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ListaPokemon;
