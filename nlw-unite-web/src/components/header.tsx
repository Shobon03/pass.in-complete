import logo from "../assets/logo.png";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <div className="flex items-center gap-5">
      <img src={logo} alt="" />

      <nav className="flex items-center gap-5 [&>a]:text-sm [&>a]:font-medium">
        <NavLink href="/eventos">Eventos</NavLink>
        <NavLink href="/participantes">Participantes</NavLink>
      </nav>
    </div>
  );
}

export function MyFunc() {
  return (
    <div>
      <p>Hello World!</p>
    </div>
  );
}
