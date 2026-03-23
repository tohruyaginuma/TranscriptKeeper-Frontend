import BaseLayout from "@/components/base-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DESKTOP_RELEASES_URL } from "@/config/constants";
import { getLatestDmgDownloadUrl, openDownloadUrl } from "@/lib/utils";
import { Apple, Download, LoaderCircle, TriangleAlert } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const DownloadPage = () => {
	const [isResolvingDownload, setIsResolvingDownload] = useState(false);
	const [isPrefetching, setIsPrefetching] = useState(true);
	const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const preloadLatestDmg = async () => {
			try {
				const latestDownloadUrl = await getLatestDmgDownloadUrl();

				if (isMounted) {
					setDownloadUrl(latestDownloadUrl);
				}
			} catch {
				if (isMounted) {
					setDownloadUrl(null);
				}
			} finally {
				if (isMounted) {
					setIsPrefetching(false);
				}
			}
		};

		void preloadLatestDmg();

		return () => {
			isMounted = false;
		};
	}, []);

	const handleDownload = useCallback(async () => {
		setIsResolvingDownload(true);

		try {
			if (downloadUrl) {
				window.location.assign(downloadUrl);
				return;
			}

			await openDownloadUrl();
		} catch {
			toast.error("Unable to start the latest DMG download right now.");
		} finally {
			setIsResolvingDownload(false);
		}
	}, [downloadUrl]);

	return (
		<BaseLayout>
			<section className="relative overflow-hidden px-6 py-24 md:py-32">
				<div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent" />
				<div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />

				<div className="relative mx-auto flex max-w-5xl flex-col gap-10">
					<div className="mx-auto max-w-3xl text-center">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm text-muted-foreground">
							<Apple className="h-4 w-4 text-primary" />
							Desktop app for macOS
						</div>

						<h1 className="mb-6 text-4xl font-bold tracking-tight text-balance text-foreground md:text-6xl">
							Download Transcript Keeper for Mac
						</h1>

						<p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
							Install the desktop app to record meetings privately and sync
							transcripts back to your account. The button below resolves the
							latest GitHub Release and downloads the current `.dmg` installer
							directly.
						</p>
					</div>

					<Card className="mx-auto w-full max-w-4xl overflow-hidden border-border/80 bg-card/80 backdrop-blur">
						<CardContent className="grid gap-8 px-8 py-10 md:px-10">
							<div className="grid gap-6 md:grid-cols-[1fr_0.95fr] md:items-start">
								<div className="space-y-5">
								<div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary">
									<Download className="h-7 w-7" />
								</div>

								<div className="space-y-3">
									<h2 className="text-2xl font-semibold text-foreground">
										Mac desktop download
									</h2>
									<p className="leading-relaxed text-muted-foreground">
										This application currently supports macOS only. When you
										click the button, we fetch the latest release and start the
										`.dmg` download directly.
									</p>
								</div>

								<Button
									size="lg"
									className="h-12 px-8 text-base"
									onClick={() => {
										void handleDownload();
									}}
									disabled={isResolvingDownload}
								>
									{isResolvingDownload || isPrefetching ? (
										<LoaderCircle className="h-5 w-5 animate-spin" />
									) : (
										<Download className="h-5 w-5" />
									)}
									Download latest DMG
								</Button>
								</div>

								<div className="rounded-3xl border border-border bg-secondary/40 p-6">
									<p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
										Platform
									</p>
									<p className="mb-5 text-2xl font-semibold text-foreground">
										macOS only
									</p>
									<div className="space-y-4 text-sm leading-7 text-muted-foreground">
										<div className="rounded-2xl border border-border/80 bg-background/40 p-4">
											<p className="font-medium text-foreground">
												What to expect
											</p>
											<p className="mt-2">
												The button downloads the latest DMG from GitHub Releases.
											</p>
											<p className="mt-2">
												The desktop app is distributed unsigned, so macOS may ask
												you to manually approve it on first launch.
											</p>
										</div>
										<div className="rounded-2xl border border-border/80 bg-background/40 p-4">
											<p className="font-medium text-foreground">
												Need a fallback?
											</p>
											<p className="mt-2">
												If the latest installer cannot be resolved automatically,
												you can still open the{" "}
												<a
													href={DESKTOP_RELEASES_URL}
													target="_blank"
													rel="noreferrer"
													className="text-primary underline underline-offset-4"
												>
													GitHub Releases page
												</a>
												.
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-left">
								<div className="mb-2 flex items-center gap-2 text-sm font-medium text-amber-200">
									<TriangleAlert className="h-4 w-4" />
									Unsigned app notice
								</div>
								<div className="space-y-3 text-sm leading-6 text-amber-50/80">
									<p>
										If macOS blocks Transcript Keeper on first launch, please
										open it using one of the following methods.
									</p>
									<ol className="list-decimal space-y-2 pl-5">
										<li>
											Right-click{" "}
											<span className="font-medium text-amber-50">
												Transcript Keeper.app
											</span>{" "}
											in Applications, then choose{" "}
											<span className="font-medium text-amber-50">Open</span>.
										</li>
										<li>
											If that does not work, run the following command in
											Terminal:
										</li>
									</ol>
									<pre className="overflow-x-auto rounded-xl border border-amber-500/20 bg-black/20 p-3 text-xs leading-5 text-amber-50">
										<code>
											xattr -dr com.apple.quarantine
											&quot;/Applications/Transcript Keeper.app&quot;
										</code>
									</pre>
									<p>
										After that, open{" "}
										<span className="font-medium text-amber-50">
											Transcript Keeper.app
										</span>{" "}
										again.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>
		</BaseLayout>
	);
};

export default DownloadPage;
