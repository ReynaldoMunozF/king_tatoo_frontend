import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const ArtistCard = ({ artist, selectArtist }) => {
  return (
    <Card style={{ width: "10rem" }}>
      <Card.Img
        variant="top"
        src="https://media.istockphoto.com/id/912922804/es/foto/cara-de-indio-hombre-vestido-con-ropa-tradicional-contra-fondo-blanco.jpg?s=612x612&w=0&k=20&c=0tLf1QSxW_iaHzI5yCf-olerGbIShVdXSZVjIgnoc9o="
      />
      <Card.Body>
        <Card.Title>{artist}</Card.Title>

        <Button variant="primary" onClick={selectArtist}>Seleccionar</Button>
      </Card.Body>
    </Card>
  );
};
