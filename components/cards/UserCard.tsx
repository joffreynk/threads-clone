type Props = {
  id: string;
  name: string;
  username: string;
  image: string;
  personType: string;
};

function UserCard({id, name, username, image, personType}: Props) {
  return (
    <div className="text-light-1">UserCard</div>
  )
}

export default UserCard