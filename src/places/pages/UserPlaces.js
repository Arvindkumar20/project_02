import PlaceList from "../components/PlaceList";
import { useParams} from "react-router-dom";

const DUMMY_PLACES=[{
  id: 'p1',
  title: 'Fort of Raja Mahmoodabad',
  description: 'Best Location in Mahmudabad for Visit historical place',
  imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipPg-dYbMo-dJsaHvhJco_Any3OjKLlDE4oKOVAe=w592-h404-n-k-no-v2-rj',
  address: 'Mahmudabad, Uttar Pradesh 261203',
  location: {
    lat: 27.2949703,
    lng: 81.1165455
    },
    creator: 'u1'
    },
    {
      id: 'p2',
      title: 'Roman Catholic Church',
      description: 'A historic Roman Catholic Church located at the heart of Lucknow, Hazrat Ganj. Highly encourage you to visit.',
      imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-o/0f/0c/ac/e0/cathedral-senior-school.jpg',
      address: 'Hazratgunj, Lucknow, Uttar Pradesh 226001',
      location: {
        lat: 26.8700451,
        lng: 80.9040876
        },
        creator: 'u2'


}]
const UserPlaces=()=> {
 const userId=useParams().userId;
 const loadedPlaces=DUMMY_PLACES.filter(place=>place.creator===userId)
  return (
    < PlaceList items={loadedPlaces}/>
    
    
  )
}
export default UserPlaces;
