import "./PlaceList.css";
import Card from "../../shared/components/UiEement/Card";
import PlaceItem from "./PlaceItem";
const PlaceList=(props) =>{
  if(props.items.length===0){
    <Card>
      <h2>No places found. Maybe you want to add some?</h2>
      <button>Share Place</button>
    </Card>
  }
  return (
    <ul className="item-list">
      {
        props.items.map((place) => <PlaceItem 
        key={place.id}
         id={place.id} 
         image={place.imageUrl} 
         title={place.title}
         description={place.description}
         address={place.address}
         creator={place.creator}
         coordnates={place.location}
         />)
      }
    
    </ul>
  )
}
export default PlaceList
