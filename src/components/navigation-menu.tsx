import { Link } from "react-router";

import {
	NavigationMenu as NavigationMenuPrimitive,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function NavigationMenu() {
	return (
		<NavigationMenuPrimitive>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<Link to="/notes">Notes</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenuPrimitive>
	);
}
