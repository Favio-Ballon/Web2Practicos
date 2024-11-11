import { useState } from "react";
import "./App.css";
import UserHeader from "./components/header";
import axios from "axios";
import { useEffect } from "react";
import { Container, Row, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

function VistaArtista() {
    const [listAlbum, setListAlbum] = useState([]);
    const [artista, setArtista] = useState();
    const { id } = useParams();
    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        getArtista();
    }, []);

    useEffect(() => {
        const hash = window.location.hash.substring(1); 
        if (hash) {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                element.classList.add("highlight");
                setTimeout(() => {
                    element.classList.remove("highlight");
                }, 2000);
            }
        }
    }, [listAlbum]);

    const getArtista = async () => {
        try {
            const response = await axios.get("http://localhost:3000/artista/" + id);
            setArtista(response.data);
            setListAlbum(response.data?.albums);
        } catch (error) {
            console.error(error);
        }
    };

    const clickCancion = (e, nombre) => {
        e.preventDefault();
        setCurrentSong(nombre);
        console.log(nombre);
    };

    return (
        <div className="contenedor">
            <UserHeader />
            <Container className="contenedor" style={{ marginTop: "0px" }}>
                <div style={{ position: "relative", marginBottom: "20px" }}>
                    <Image
                        src={`http://localhost:3000/public/${artista?.imagen}`}
                        style={{ width: "100%", height: "250px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
                    />
                    <h1
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "2%",
                            transform: "translate(0%, -50%)",
                            fontSize: "5rem",
                            textTransform: "uppercase",
                        }}
                    >
                        {artista?.nombre}
                    </h1>
                </div>
                <Row className="g-4">
                    {listAlbum.map(album => (
                        //card
                        <div key={album.id} className="album">
                            <div style={{ display: "flex" }}>
                                <Image
                                    src={`http://localhost:3000/public/${album?.imagen}`}
                                    style={{ width: "200px", height: "200px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
                                />
                                <div id={album.nombre} style={{ marginLeft: "20px", alignSelf: "center" }}>
                                    <p>Album</p>
                                    <h2>{album.nombre}</h2>
                                </div>
                            </div>
                            <div>
                                <table style={{ backgroundColor: "#212121" }}>
                                    <thead style={{ backgroundColor: "#212121", color: "#fff" }}>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ backgroundColor: "#212121", color: "#fff" }}>
                                        {album?.canciones.map((cancion, index) => (
                                            <tr id={cancion.nombre} key={cancion.id} onClick={e => clickCancion(e, cancion.mp3)}>
                                                <td>{index + 1}</td>
                                                <td>{cancion.nombre}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </Row>
                {currentSong && (
                    <div className="reproductor">
                        <audio key={currentSong} controls autoPlay>
                            <source src={`http://localhost:3000/public/${currentSong}`} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default VistaArtista;
