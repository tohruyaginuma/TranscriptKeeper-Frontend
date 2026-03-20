import { Link } from "react-router";

import {
	NavigationMenu as NavigationMenuPrimitive,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { User } from "firebase/auth";

type NavigationMenuProps = {
	user: User | null;
};

export function NavigationMenu(props: NavigationMenuProps) {
	const { user } = props;

	return (
		<NavigationMenuPrimitive>
			<NavigationMenuList>
				{user && (
					<NavigationMenuItem>
						<NavigationMenuLink
							asChild
							className={navigationMenuTriggerStyle()}
						>
							<Link
								to="/notes"
								className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							>
								Notes
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				)}
			</NavigationMenuList>
		</NavigationMenuPrimitive>
	);
}
