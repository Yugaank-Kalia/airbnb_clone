"use client";

import { FC } from "react";

import { TbBeach, TbWindmill } from "react-icons/tb";
import { MdOutlineVilla, MdOutlinePool } from "react-icons/md";
import {
	GiFarmTractor,
	GiIsland,
	GiCastle,
	GiForestCamp,
	GiCaveEntrance,
	GiDesert,
	GiDiamondTrophy,
} from "react-icons/gi";
import { BiWater } from "react-icons/bi";
import { PiSnowflakeLight, PiMountainsFill } from "react-icons/pi";
import { FaPersonSkiing } from "react-icons/fa6";

import Container from "../container";
import CategoryBox from "../category-box";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
	{
		label: "Luxe",
		icon: GiDiamondTrophy,
		description: "This property is in luxurious.",
	},
	{
		label: "Beach",
		icon: TbBeach,
		description: "This property is close to the beach.",
	},
	{
		label: "Windmill",
		icon: TbWindmill,
		description: "This property is close to windmills.",
	},
	{
		label: "Modern",
		icon: MdOutlineVilla,
		description: "This property is a modern villa.",
	},
	{
		label: "Mountain",
		icon: PiMountainsFill,
		description: "This property is in the mountains.",
	},
	{
		label: "Pool",
		icon: MdOutlinePool,
		description: "This property has pool(s).",
	},
	{
		label: "Island",
		icon: GiIsland,
		description: "This property is on an island.",
	},
	{
		label: "Lake",
		icon: BiWater,
		description: "This property is close to a lake.",
	},
	{
		label: "Skiing",
		icon: FaPersonSkiing,
		description: "This property has skiing activities.",
	},
	{
		label: "Castle",
		icon: GiCastle,
		description: "This property is in a castle.",
	},
	{
		label: "Camping",
		icon: GiForestCamp,
		description: "This property has camping activities.",
	},
	{
		label: "Arctic",
		icon: PiSnowflakeLight,
		description: "This property is near the arctic regions.",
	},
	{
		label: "Cave",
		icon: GiCaveEntrance,
		description: "This property is in a cave.",
	},
	{
		label: "Desert",
		icon: GiDesert,
		description: "This property is in the desert.",
	},
	{
		label: "Barn",
		icon: GiFarmTractor,
		description: "This property is in the barn.",
	},
];

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = () => {
	const params = useSearchParams();
	const category = params?.get("category");

	const pathname = usePathname();
	const isMainPage = pathname === "/";

	if (!isMainPage) return null;

	return (
		<Container>
			<div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
				{categories.map((item) => (
					<CategoryBox
						key={item.label}
						label={item.label}
						selected={category === item.label}
						icon={item.icon}
					/>
				))}
			</div>
		</Container>
	);
};

export default Categories;
