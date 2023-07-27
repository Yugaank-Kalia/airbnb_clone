import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/navbar/navbar";

import getCurrentUser from "./actions/getCurrentUser";

import RegisterModal from "./components/modals/register-modal";
import LoginModal from "./components/modals/login-modal";
import RentModal from "./components/modals/rent-modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Airbnb",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// can write prisma function to find user here, since its a server comp
	const currentUser = await getCurrentUser();

	return (
		<html lang='en'>
			<body className={inter.className}>
				<Toaster />
				<RegisterModal />
				<LoginModal />
				<RentModal />
				<Navbar currentUser={currentUser} />
				{children}
			</body>
		</html>
	);
}
