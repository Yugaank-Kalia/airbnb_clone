"use client";

import { signIn } from "next-auth/react";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import { useRegisterModal } from "@/app/hooks/use-register";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./modal";
import Heading from "../heading";
import Input from "../inputs/input";
import { toast } from "react-hot-toast";
import Button from "../button";
import { useLoginModal } from "@/app/hooks/use-login";
import { useRouter } from "next/navigation";

const LoginModal = () => {
	const router = useRouter();
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoding, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			console.log(callback);

			if (callback?.ok && !callback.error) {
				toast.success("Logged in");
				router.refresh();
				loginModal.onClose();
			}

			if (callback?.error) {
				toast.error("Invalid Credentials");
				router.refresh();
				loginModal.onClose();
			}
		});
	};

	const toggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading
				title='Welcome back'
				subtitle='Login to your account'
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
				<div className='text-neutral-800'>Dont have an account?</div>
				<div
					onClick={toggle}
					className='text-neutral-500 cursor-pointer hover:underline'
				>
					Create an account
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoding}
			isOpen={loginModal.isOpen}
			title='Log in'
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
