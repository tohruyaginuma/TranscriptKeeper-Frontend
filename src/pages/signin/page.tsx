import { SigninForm } from "@/components/signin-form";
import BaseLayout from "@/components/base-layout";

const SignInPage = () => {
	return (
		<BaseLayout>
			<div className="bg-background flex flex-col items-center justify-center">
				<div className="w-full max-w-sm flex-1">
					<SigninForm />
				</div>
			</div>
		</BaseLayout>
	);
};

export default SignInPage;
