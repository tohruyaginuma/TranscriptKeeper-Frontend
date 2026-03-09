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
		<div className="sticky top-0 w-full bg-background border-b px-4 py-3">
			<div className="flex justify-between items-center m-auto max-w-7xl">
				<Logo />
				<NavigationMenu user={user} />
				<div>
					{user !== null ? (
						<Button variant="default" onClick={signOut}>
							Sign Out
						</Button>
					) : (
						!isHideSignIn && (
							<Button variant="outline" onClick={signIn}>
								Sign In
							</Button>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
