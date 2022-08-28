import { AiFillFacebook, AiFillYoutube } from "react-icons/ai";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router-dom";
function Footer() {
  const year: number = new Date().getFullYear();
  return (
    <footer className="footer">
      <div>© {year} - Kalumian</div>
      <div className="icons">
        <Link to={"/"}><BsInstagram /></Link>
        <Link to={"/"}><AiFillFacebook /></Link>
        <Link to={"/"}><IoLogoYoutube /></Link>
        <Link to={"/"}><BsLinkedin /></Link>
      </div>
    </footer>
  );
}

export default Footer;
