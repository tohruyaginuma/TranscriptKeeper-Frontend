import BaseLayout from "@/components/base-layout";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const SignOutPage = () => {
	return (
		<BaseLayout IsNoHeader={true} IsNoFooter={true}>
			<div className="min-h-screen flex flex-col">
				<div className="flex-1 flex items-center justify-center px-4 py-12">
					<div className="w-full max-w-md">
						<div className="text-center mb-8">
							<h1 className="text-2xl font-bold text-foreground mb-2">
								You signed out successfully
							</h1>
							<p className="text-muted-foreground">
								You can sign in again to continue using the app.
							</p>
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

export default SignOutPage;
