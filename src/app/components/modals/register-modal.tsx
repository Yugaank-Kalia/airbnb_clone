"use client";

import axios from "axios";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { useRegisterModal } from "@/app/hooks/use-register";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./modal";
import Heading from "../heading";
import Input from "../inputs/input";
import { toast } from "react-hot-toast";
import Button from "../button";
import { signIn } from "next-auth/react";
import { useLoginModal } from "@/app/hooks/use-login";

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoding, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post("/api/register", data)
			.then(() => registerModal.onClose())
			.catch((error) => toast.error("Something went wrong"))
			.finally(() => setIsLoading(false));
	};

	const toggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading
				title='Welcome to Airbnb'
				subtitle='Create an account'
				center
			/>
			<Input
				id='email'
				label='Email'
				disabled={isLoding}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='name'
				label='Name'
				disabled={isLoding}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='password'
				type='password'
				label='Password'
				disabled={isLoding}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className='flex flex-col gap-4 mt-3'>
			<hr />
			<Button
				outline
				label='Continue with Google'
				icon={FcGoogle}
				onClick={() => signIn("google")}
			/>
			<Button
				outline
				label='Continue with Github'
				icon={AiFillGithub}
				onClick={() => signIn("github")}
			/>
			<div className='justify-center flex flex-row items-center gap-2'>
				<div className='text-neutral-800'>Already have an account?</div>
				<div
					onClick={toggle}
					className='text-neutral-500 cursor-pointer hover:underline'
				>
					Log in
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoding}
			isOpen={registerModal.isOpen}
			title='Sign Up'
			actionLabel='Continue'
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
