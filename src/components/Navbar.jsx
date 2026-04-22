import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Hem</Link> |{" "}
      <Link to="/cart">Kundvagn</Link>
    </nav>
  );
}