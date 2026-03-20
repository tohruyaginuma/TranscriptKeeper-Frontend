import { NavigationMenu } from "@/components/navigation-menu";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router";
import Logo from "@/components/logo";
import { useCallback, useContext, useMemo } from "react";
import { AuthContext, type AuthContextType } from "@/components/auth-context";
import { auth } from "@/lib/firebase";
import { signOut as signOutAuth } from "firebase/auth";

const Header = () => {
	const { user } = useContext<AuthContextType>(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const signOut = useCallback(async () => {
		try {
			await signOutAuth(auth);
		} catch (error) {
			console.log(error);
		} finally {
			navigate("/signout");
		}
	}, [navigate]);

	const signIn = useCallback(() => {
		navigate("/signin");
	}, [navigate]);

	const isHideSignIn = useMemo(() => {
		if (location.pathname === "/signin") return true;

		return false;
	}, [location.pathname]);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
			<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
				<Logo />

				<nav className="hidden md:flex items-center gap-8">
					<NavigationMenu user={user} />
				</nav>

				<div className="flex items-center gap-3">
					{/* <Button variant="ghost" size="sm">
						Sign In
					</Button>
					<Button size="sm">Sign Up</Button> */}
					{user !== null ? (
						<Button variant="default" onClick={signOut}>
							Sign Out
						</Button>
					) : (
						!isHideSignIn && (
							<Button variant="ghost" size="sm" onClick={signIn}>
								Sign In
							</Button>
						)
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
