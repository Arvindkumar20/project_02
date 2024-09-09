import { NavLink } from "react-router-dom";
import "./navink.css";
export default function Navink() {
  return (<ul className="nav-links">
<li>
  <NavLink to="/" exact>ALL USERS</NavLink>
</li>
<li>
  <NavLink to="/u1/places">MY PLACES</NavLink>
</li>
<li>
  <NavLink to="/places/new">ADD PLACE</NavLink>
</li>
<li>
  <NavLink to="/auth">AUTHENTICATION</NavLink>
</li>
  </ul>
   
  )
}
