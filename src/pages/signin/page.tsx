import BaseLayout from "@/components/base-layout";

import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { apiClient, getApiErrorMessage } from "@/lib/api";
import { API_URI } from "@/config/constants";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useState } from "react";

const SignInPage = () => {
	const navigate = useNavigate();
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const signInBackend = async () => {
		await apiClient(`${API_URI.AUTH_LOGIN}`, "POST");
	};

	const signIn = async () => {
		setIsSigningIn(true);
		setErrorMessage(null);
		try {
			await signInWithPopup(auth, provider);
			await signInBackend();

			navigate("/notes");
		} catch (error) {
			setErrorMessage(getApiErrorMessage(error));
		} finally {
			setIsSigningIn(false);
		}
	};
	return (
		<BaseLayout IsNoHeader={true} IsNoFooter={true}>
			<div className="min-h-screen flex flex-col">
				<div className="flex-1 flex items-center justify-center px-4 py-12">
					<div className="w-full max-w-md">
						<div className="text-center mb-8">
							<Link to="/" className="inline-flex items-center gap-2 mb-8">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
									<FileText className="h-6 w-6 text-primary-foreground" />
								</div>
								<span className="text-xl font-semibold text-foreground">
									TranscriptKeeper
								</span>
							</Link>
							<h1 className="text-2xl font-bold text-foreground mb-2">
								Welcome back
							</h1>
							<p className="text-muted-foreground">
								Sign in to your account to continue
							</p>
						</div>

						<div className="rounded-xl border border-border bg-card p-6">
							<Button
								variant="outline"
								className="w-full"
								onClick={signIn}
								disabled={isSigningIn}
							>
								<svg
									className="mr-2 h-4 w-4"
									viewBox="0 0 24 24"
									aria-hidden="true"
									aria-label="Google"
								>
									<path
										fill="currentColor"
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									/>
									<path
										fill="currentColor"
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									/>
									<path
										fill="currentColor"
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									/>
									<path
										fill="currentColor"
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									/>
								</svg>
								{isSigningIn ? "Signing in..." : "Continue with Google"}
							</Button>
							{errorMessage && (
								<p className="mt-4 text-sm text-destructive">{errorMessage}</p>
							)}
						</div>

						<div className="text-center mt-6">
							<Link
								to="/"
								className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
							>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to home
							</Link>
						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default SignInPage;
