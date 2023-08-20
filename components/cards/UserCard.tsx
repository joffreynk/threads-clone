import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  id: string;
  name: string;
  username: string;
  image: string;
  personType: string;
};

function UserCard({id, name, username, image, personType}: Props) {
  return (
    <article className="user-card">
        <div className="user-card_avatar">
            <Image src={image} width={48} height={48} className="rounded-full" alt="logo" />
            <div className="flex-1 text-ellipsis">
                <h4 className="text-base-semibold text-light-1">{name}</h4>
                <p className="text-small-medium text-gray-1">@{username}</p>
            </div>
        </div>
        <Link href={`/profile/${id}`}>
            <Button className="user-card_btn">view</Button>
        </Link>
    </article>
  )
}

export default UserCard