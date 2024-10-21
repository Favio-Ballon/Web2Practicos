import './App.css'
import UserHeader from './components/header'
import { Card,Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [listPokemon, setlistPokemon] = useState([]);

  useEffect(() => {
    getListPokemon();
    document.title = "Pokedex";
  }, [])

  const getListPokemon = () => {
    axios.get('http://localhost:3000/pokemon')
      .then(res => {
        setlistPokemon(res.data);
        console.log(res.data);
      }).catch(error => {
        console.log(error);
      });
  }
  




  return (
    <>
      <UserHeader/>

      <Container className="my-4 mt-5" >
      <Row className="g-4">

        {listPokemon.map((pokemon) => (
          <Col md={4} key={pokemon.id}>
            <a href={`/pokemon/${pokemon.id}`} style={{textDecoration:'none'}}>
            <Card>
              <Card.Img variant="top" src={`http://localhost:3000/images/pokemon/${pokemon.imagen}`} />
              <Card.Body>
                <Card.Title>{pokemon.nombre} {' #' + pokemon.nroPokedex}</Card.Title>
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

export default App
