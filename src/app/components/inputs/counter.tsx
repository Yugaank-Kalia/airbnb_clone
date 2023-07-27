"use client";

import { FC, useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
	title: string;
	subtitle: string;
	value: number;
	onChange: (value: number) => void;
}

const Counter: FC<CounterProps> = ({ title, subtitle, value, onChange }) => {
	const onAdd = useCallback(() => {
		onChange(value + 1);
	}, [value, onChange]);

	const onReduce = useCallback(() => {
		if (value <= 1) return null;

		onChange(value - 1);
	}, [value, onChange]);

	return (
		<div className='flex flex-row items-center justify-between'>
			<div className='flex flex-col'>
				<div className='font-normal'>{title}</div>
				<div className='font-light text-gray-600'>{subtitle}</div>
			</div>
			<div className='flex flex-row items-center gap-4'>
				<div
					onClick={onReduce}
					className='w-10 h-10 rounded-full border-dotted border-[2px] border-neutral-600
          flex items-center justify-center text-neutral-800 cursor-pointer
          hover:opacity-60 transition'
				>
					<AiOutlineMinus />
				</div>
				<div className='font-light text-xl text-neutral-600'>
					{value}
				</div>
				<div
					onClick={onAdd}
					className='w-10 h-10 rounded-full border-dotted border-[2px] border-neutral-600 
          flex items-center justify-center text-neutral-800 cursor-pointer hover:opacity-60 
          transition'
				>
					<AiOutlinePlus />
				</div>
			</div>
		</div>
	);
};

export default Counter;
