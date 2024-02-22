import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import Logo_principal from "../../assets/img/logo_leon.png";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userRdxData = useSelector(userData)

  const token = userRdxData.credentials.token
  const decoded = userRdxData.credentials.userData

  const logMeOut = () => {
    dispatch(logout({credentials:{}}))
    setTimeout(() => {
      navigate("/login");
    },1000);
  };

  return (
    <Navbar  data-bs-theme="dark" expand="lg" className="casa" id="navbar">
      <Container>
        <img  className= "img" src={Logo_principal} alt="soy yo" />
        <Navbar.Brand href="/">King Tattoo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="personajes">Contacto</Nav.Link>
            <Nav.Link href="artistLogin">Area Trabajador</Nav.Link>
            <NavDropdown  className="navdrop" title="Mi cuenta"  id="basic-nav-dropdown">
              {!token ? (
                <>
                  <NavDropdown.Item href="login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="register">Resgistrarse</NavDropdown.Item>
                </>
              ) : decoded.role === "ADMIN" ? (
                <>
                  <NavDropdown.Item href="profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="admin">Admin</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logMeOut()}>Log out</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="appointments">Mis citas</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logMeOut()}>Log out</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
