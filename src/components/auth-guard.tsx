import type { PropsWithChildren } from "react";
import type { AuthContextType } from "./auth-context";
import { useContext } from "react";
import { AuthContext } from "@/components/auth-context";
import { Spinner } from "@/components/ui/spinner";
import { Navigate } from "react-router";

type AuthGuardProps = PropsWithChildren<object>;

const AuthGuard = (props: AuthGuardProps) => {
	const { children } = props;
	const { user, isLoading } = useContext<AuthContextType>(AuthContext);

	if (isLoading) {
		return <Spinner />;
	}

	if (user === null) {
		return <Navigate to="/signin" />;
	}

	return <>{children}</>;
};

export default AuthGuard;
