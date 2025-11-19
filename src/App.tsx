import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

export const App: React.FC = () => {
	useGSAP(() => {
		const arrowTimeline = gsap.timeline({
			repeat: -1,
			yoyo: true,
			repeatDelay: 0.25,
		});

		arrowTimeline.fromTo(
			".arrow-right",
			{ x: 0 },
			{ x: 5, duration: 0.8, ease: "sine.inOut" }
		);

		const glowBar = gsap.timeline({
			repeat: -1,
			yoyo: true,
			repeatDelay: 0.125,
			delay: 1,
		});

		glowBar.fromTo(
			"#glow-bar",
			{ opacity: 0, scaleY: 1.3 },
			{ opacity: 1, scaleY: 1, duration: 2, ease: "sine.inOut" }
		);

		const earth = gsap.timeline({
			repeat: -1,
			yoyo: true,
			repeatDelay: 0.5,
			delay: 0.5,
		});

		earth.fromTo(
			"#earth",
			{ scale: 1, filter: "contrast(100%)" },
			{
				scale: 1.02,
				duration: 1.5,
				ease: "sine.inOut",
				filter: "contrast(150%)",
			}
		);
	}, []);

	return (
		<main className="h-dvh w-screen bg-black flex flex-col relative overflow-x-hidden">
			<img
				src="/glow-bar.svg"
				className="fixed bottom-0 left-0"
				id="glow-bar"
				alt=""
			/>
			<img
				src="/earth.png"
				className="fixed bottom-0 right-0 size-200"
				id="earth"
				alt=""
			/>
			<div className="flex-1 relative flex flex-col max-md:px-4 px-20 pt-8.5 pb-22.5 lg:justify-between items-stretch">
				<nav className="flex items-center gap-10 justify-between max-w-360 self-center w-full">
					<img
						src="/logo.svg"
						alt=""
					/>
					<ul className="flex items-center gap-5 max-lg:hidden text-white/70">
						{navlinks.map((link) => (
							<li
								key={link}
								className="hover:text-white transition-colors cursor-pointer"
							>
								{link}
							</li>
						))}
					</ul>
					<button
						className="relative w-50 py-2.5 rounded-[0.625rem] text-black bg-white flex items-center gap-1 justify-center"
						type="button"
					>
						<p>Get Early Access </p>
						<img
							src="/arrow-right.svg"
							className="size-6 arrow-right"
							alt=""
						/>
					</button>
				</nav>
				<div className="flex-1 flex flex-col items-start pt-24.5 gap-17">
					<div className="flex-1 flex flex-col gap-17">
						<div className="flex flex-col">
							<h1 className="text-white drop-shadow-md font-bold text-7xl mb-6 font-inter">
								What If Your Storage <br /> Could Think Ahead?
							</h1>
							<p className="text-white/70 p-2.5 text-lg">
								DeepKeep AI gives you encrypted, long-term storage that
								doesn&apos;t <br /> forget, organizing your files with
								context-aware intelligence
							</p>
						</div>
						<button
							className="relative w-50 py-2.5 rounded-[0.625rem] text-black bg-white flex items-center gap-1 justify-center ml-2.5"
							type="button"
						>
							<p>Get Early Access </p>
							<img
								src="/arrow-right.svg"
								className="size-6 arrow-right"
								alt=""
							/>
						</button>
					</div>
					<Partners />
				</div>
			</div>
			<p className="fixed bottom-4 text-white text-xs left-1/2 -translate-x-1/2 text-center">
				Code:{" "}
				<a
					className="underline"
					href="https://x.com/itzadetunji1"
				>
					Adetunji Adeyinka
				</a>{" "}
				<br />
				Design:{" "}
				<a
					className="underline"
					href="https://x.com/nerooeth"
				>
					Nero
				</a>
			</p>
		</main>
	);
};

const navlinks = [" Features", "How It Works", "Pricing", "Docs", "Contact"];

const partners = ["coinex.png", "one-key.png", "zelcore.png"];

const Partners = () => {
	const containerRef = useRef<HTMLUListElement | null>(null);

	useGSAP(() => {
		const container = containerRef.current;
		if (!container) return;

		// I am cloning the items so the animation can be seamless
		const items = container.children;
		const itemsArray = Array.from(items);

		// Add all the items to the div there
		itemsArray.forEach((item) => {
			const clone = item.cloneNode(true);
			container.appendChild(clone);
		});

		// The width is half of the width of the container since we cloned the items
		const totalWidth = container.scrollWidth / 2;

		// Timeline for gsap
		const tl = gsap.timeline({ repeat: -1 });

		tl.to(container, {
			x: -totalWidth,
			duration: 30,
			ease: "none",
			onComplete: () => {
				gsap.set(container, { x: 0 });
			},
		});

		container.addEventListener("mouseenter", () => tl.pause());
		container.addEventListener("mouseleave", () => tl.resume());

		return () => {
			tl.kill();
		};
	}, []);

	return (
		<div className="overflow-hidden max-w-md self-start py-8">
			<ul
				ref={containerRef}
				className="flex gap-12 items-center"
				id="partner-container"
				style={{ width: "fit-content" }}
			>
				{partners.map((partner, idx) => (
					<img
						key={partner}
						src={partner}
						alt={partner.split("/")[5]}
						className="w-32 h-10 object-contain"
						id={`partner-${idx}`}
					/>
				))}
			</ul>
		</div>
	);
};
