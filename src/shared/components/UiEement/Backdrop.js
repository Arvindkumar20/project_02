import ReactDOM from 'react-dom';
import "./backdrop.css"
export default function Backdrop(props) {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  )
}
