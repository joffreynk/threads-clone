import Image from "next/image"

type ProfileProps = {
  accountId: string,
  authUserId: string,
  name: string,
  username: string,
  imageUrl: string,
  bio: string
}

export default function ProfileHeader({accountId, authUserId, name, username, imageUrl, bio}: ProfileProps) {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20">
            <Image
            src={imageUrl}
            fill
            alt={name}
            className="rounded-full object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}


