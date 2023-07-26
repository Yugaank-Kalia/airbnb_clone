"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
	const router = useRouter();
	return (
		<Image
			alt='logo'
			className='hidden md:block cursor-pointer'
			src='/images/logo.png'
			height={100}
			width={100}
		/>
	);
};

export default Logo;
