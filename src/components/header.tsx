import { NavigationMenu } from "@/components/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import Logo from "@/components/logo";

const Header = () => {
	return (
		<div className="p-4 border-b">
			<div className="flex justify-between items-center m-auto max-w-7xl">
				<Logo />
				<NavigationMenu />
				<div>
					<Button>
						<Link to="/signin">Sign In</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Header;
