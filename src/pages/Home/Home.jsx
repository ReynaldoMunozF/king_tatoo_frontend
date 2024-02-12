import logo_home from "../../assets/img/logo_principal.png";

import "./Home.css";

export const Home = () => {
  return (
    <div className="portada_principal">
      <img className="img" src={logo_home} alt="soy yo" />
    </div>
  );
};
