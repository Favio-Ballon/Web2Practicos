import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import HeaderAdmin from './components/headerAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


function App() {

  const [listPelicula, setListPelicula] = useState([]);

  useEffect(() => {
    getListPelicula();
    document.title = "Prueba título";
  }, [])

  const getListPelicula = () => {
    axios.get('http://localhost:3000/pelicula')
      .then(res => {
        setListPelicula(res.data);
        console.log(res.data);
      }).catch(error => {
        console.log(error);
      });
  }



  return (
    <>
      <HeaderAdmin />
      <Container className="my-4">
        <Row className="g-4">
          {listPelicula.map((pelicula) => (
            <Col key={pelicula.id} xs={12} sm={6} md={4} lg={3}>
              <Card style={{ width: '100%' }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/images/pelicula/${pelicula.imagen}`}
                  alt={pelicula.nombre}
                />
                <Card.Body>
                <Card.Text><FontAwesomeIcon icon={faHeart} style={{color: "#ea1010",}} /> {pelicula.calificacion}%</Card.Text>
                  <Card.Title>{pelicula.nombre}</Card.Title>
                  <Card.Text>{pelicula.sinopsis}</Card.Text>
                  <Link className="btn btn-primary" to={`/pelicula/${pelicula.id}`}>Más detalles</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App
