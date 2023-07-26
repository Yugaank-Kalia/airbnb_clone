"use client";

import Image from "next/image";
import { FC } from "react";

interface AvatarProps {}

const Avatar: FC<AvatarProps> = () => {
	return (
		<Image
			key='placeholder'
			className='rounded-full'
			height={30}
			width={30}
			alt='avatar'
			src='/images/placeholder.jpg'
		/>
	);
};

export default Avatar;
