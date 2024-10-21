import './App.css'
import UserHeader from './components/header'
import { Card,Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Buscador() {

  const [listPokemon, setlistPokemon] = useState([]);
  const { tipo } = useParams();
  const { name } = useParams();

  useEffect(() => {
    getListPokemon();
    document.title = "Pokedex";
  }, [])

    useEffect(() => {
        getListPokemon();
    }, [tipo, name]);

  const getListPokemon = () => {
    if (tipo) {
      axios.get(`http://localhost:3000/search/tipo/${tipo}`)
        .then(res => {
          setlistPokemon(res.data);
          console.log(res.data);
        }).catch(error => {
          console.log(error);
        });
    } else if (name) {
        console.log(name);
        axios.get(`http://localhost:3000/search/pokemon/${name}`)
            .then(res => {
            setlistPokemon(res.data);
            console.log(res.data);
            }).catch(error => {
            console.log(error);
            });
        }
  }
  


  return (
    <>
      <UserHeader/>

      <Container className="my-4 mt-5" >
        {/* agregar titulo */}
        {name && listPokemon.length > 0 &&
            <h1>Resultados de &quot;{name}&quot;</h1>
        }
        {tipo && listPokemon.length > 0 &&
            <h1>Pokemon tipo {listPokemon[0]?.tipo}</h1>
        }
        {listPokemon.length === 0 &&
            <h1>No se encontraron resultados</h1> 

        }
      <Row className="g-4">

        {listPokemon.map((pokemon) => (
          <Col md={4} key={pokemon.id}>
            <a href={`/pokemon/${pokemon.id}`} style={{textDecoration:'none'}}>
            <Card style={{minWidth: '250px'}}>
              <Card.Img variant="top" src={`http://localhost:3000/images/pokemon/${pokemon.imagen}`} />
              <Card.Body>
                <Card.Title>{pokemon.nombre} {' #'+pokemon.nroPokedex}</Card.Title>
              </Card.Body>
            </Card>
            </a>
          </Col>
        ))}
      </Row>
      </Container>
      
      
    </>
  )
}

export default Buscador
