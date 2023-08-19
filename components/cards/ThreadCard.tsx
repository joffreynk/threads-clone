type Props = {
  id: string,
  currentUser: string,
  parentId: string,
  content: string,
  createdAt: string,
  author: {
    name: string,
    image: string,
    id: string,
  },
  community: {
    id: string,
    name: string,
    image: string,
  } | null,
  comments: {
    author: {
      image: string,
    },
  }[],
  isCommented?: boolean,
}

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ThreadCard({ id, currentUser, parentId, content, author, community, createdAt, comments, isCommented}: Props) {
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="author image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-f it">
              <h4 className="cursor-pointer text-base-regular text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart-gray.svg"
                  width={24}
                  height={24}
                  className="cursor-pointer  object-contain"
                  alt="like"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    width={24}
                    height={24}
                    className="cursor-pointer  object-contain"
                    alt="reply"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  width={24}
                  height={24}
                  className="cursor-pointer  object-contain"
                  alt="repost"
                />
                <Image
                  src="/assets/share.svg"
                  width={24}
                  height={24}
                  className="cursor-pointer  object-contain"
                  alt="share"
                />
              </div>

              {isCommented && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length}{" "}
                    {comments.length > 1 ? "Replies" : "Reply"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

