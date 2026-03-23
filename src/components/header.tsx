import { NavigationMenu } from "@/components/navigation-menu";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router";
import Logo from "@/components/logo";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext, type AuthContextType } from "@/components/auth-context";
import { auth } from "@/lib/firebase";
import { signOut as signOutAuth, type User } from "firebase/auth";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Flex from "@/components/flex";

const Header = () => {
	const { user } = useContext<AuthContextType>(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const [isAvatarImageError, setIsAvatarImageError] = useState(false);

	const avatarImageUrl = useMemo(() => {
		if (!user) {
			return null;
		}

		const userWithPhotoUrl = user as User & { photoUrl?: string | null };
		return user.photoURL ?? userWithPhotoUrl.photoUrl ?? null;
	}, [user]);

	useEffect(() => {
		setIsAvatarImageError(false);
	}, []);

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
					{user !== null ? (
						<Flex hasPadding direction="row" gapX="sm">
							<Avatar size="lg">
								{avatarImageUrl && !isAvatarImageError ? (
									<img
										src={avatarImageUrl}
										alt={user.displayName ?? user.email ?? "User avatar"}
										className="size-full object-cover"
										referrerPolicy="no-referrer"
										onError={() => {
											setIsAvatarImageError(true);
										}}
									/>
								) : (
									<AvatarFallback>
										{user?.displayName?.charAt(0)}
									</AvatarFallback>
								)}
							</Avatar>
							<Flex>
								<p className="text-sm font-medium text-foreground">
									{user?.displayName}
								</p>
								<p className="text-sm text-muted-foreground">{user?.email}</p>
							</Flex>
							<Button
								variant="outline"
								size="icon"
								aria-label="Sign out"
								onClick={() => {
									signOut();
								}}
							>
								<LogOut />
							</Button>
						</Flex>
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
