import UserList from "../components/UserList";


export default function Users() {
  const USERS=[
    {
    "id": "u1",
    "name":"arvind",
    "image":"https://th.bing.com/th/id/OIP.OF59vsDmwxPP1tw7b_8clQHaE8?rs=1&pid=ImgDetMain",
    "places":5
  },
  {
    "id": "u2",
    "name":"Raj",
    "image":"https://th.bing.com/th/id/OIP.OF59vsDmwxPP1tw7b_8clQHaE8?rs=1&pid=ImgDetMain",
    "places":8
  },
]
  return <UserList items={USERS}/>
}
