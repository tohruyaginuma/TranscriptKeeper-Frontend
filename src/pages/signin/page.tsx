import { SigninForm } from "@/components/signin-form";
import BaseLayout from "@/components/base-layout";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardAction,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

const SignInPage = () => {
	return (
		<BaseLayout>
			<div className="bg-background flex flex-col items-center justify-center ">
				<div className="w-full max-w-sm flex-1">
					<Card>
						<CardHeader>
							<CardTitle>Card Title</CardTitle>
							<CardDescription>Card Description</CardDescription>
							<CardAction>Card Action</CardAction>
						</CardHeader>
						<CardContent>
							<SigninForm />
						</CardContent>
						<CardFooter>
							<p>Card Footer</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</BaseLayout>
	);
};

export default SignInPage;
