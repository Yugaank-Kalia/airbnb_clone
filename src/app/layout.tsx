import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/navbar";
import RegisterModal from "./components/modals/register-modal";
import { Toaster } from "react-hot-toast";
import LoginModal from "./components/modals/login-modal";
import getCurrentUser from "./actions/getCurrentUser";

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
				<Navbar currentUser={currentUser} />
				{children}
			</body>
		</html>
	);
}
