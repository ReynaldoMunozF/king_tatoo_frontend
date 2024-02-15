import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const ArtistCard = ({ artist, selectArtist, nombre ,BtnColor}) => {
  return (
    <Card style={{ width: "10rem" }}>
      <Card.Img
        variant="top"
        src='https://anarchy16tattoo.com/wp-content/uploads/2023/03/Dymon-Tattoo.jpg'
      />
      <Card.Body>
        <Card.Title>{artist}</Card.Title>

        <Button variant={BtnColor} onClick={selectArtist}>{nombre}</Button>
      </Card.Body>
    </Card>
  );
};
