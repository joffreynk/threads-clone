import React from "react";
type AccountProfileProps = {
  user: {
    id: string;
    name: string;
    objectId: string;
    image:string;
    bio:string;
    username:string
  },
  btnTitle: string;
}

const AccountProfile = ({user, btnTitle}: AccountProfileProps) => {
  return <div>AccountProfile</div>;
};

export default AccountProfile;
