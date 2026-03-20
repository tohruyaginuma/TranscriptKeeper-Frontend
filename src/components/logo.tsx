import { Link } from "react-router";
import { FileAudio } from "lucide-react";



const Logo = () => {
	return (
		<Link to="/" className="flex items-center gap-2">
			<div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
				<FileAudio className="w-4 h-4 text-primary-foreground" />
			</div>
			<span className="font-semibold text-foreground">Transcript Keeper</span>
		</Link>
	);
};

export default Logo;
