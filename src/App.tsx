import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { ButtonAnimation } from "./ButtonAnimation";

gsap.registerPlugin(ScrollTrigger);

const handles = [
	"andi_losing",
	"ElitzaVasileva",
	"emanueledpt",
	"HsanC_",
	"JoshuaIPark",
];

export const App = () => {
	const wheel1Ref = useRef<HTMLDivElement>(null);
	const wheel2Ref = useRef<HTMLDivElement>(null);
	const hiddenTextRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const wheel1 = wheel1Ref.current;
		const wheel2 = wheel2Ref.current;
		const hiddenText = hiddenTextRef.current;
		if (!wheel1 || !wheel2 || !hiddenText) return;

		gsap.set(wheel1, { rotate: 90, x: "-4rem" });
		gsap.set(wheel2, { rotate: -90, x: "4rem" });
		gsap.set(hiddenText, { y: "-50%", scale: 0.7, opacity: 0 });

		const maskedTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: "#art",
				start: "top top",
				end: "bottom top",
				scrub: 1.25,
				pin: true,
			},
		});

		maskedTimeline
			.to(wheel1, {
				rotation: 360,
				x: "-15%",
				ease: "none",
			})
			.to(
				wheel2,
				{
					rotation: -360,
					x: "+15%",
					ease: "none",
				},
				"<"
			)
			.to(
				hiddenText,
				{
					y: 0,
					scale: 1,
					opacity: 1,
					ease: "sine.inOut",
				},
				"<"
			);
	}, []);

	useEffect(() => {
		const lenis = new Lenis();

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, []);

	return (
		<main className="min-h-dvh ">
			<div
				className="relative min-h-dvh max-h-dvh flex flex-col overflow-hidden gap-32 max-[1440px]:hidden"
				id="art"
			>
				<div className="flex flex-col items-center gap-7 pt-40">
					<h1 className="text-white text-4xl max-w-107.5 text-center">
						Check out this awesome button animation!
					</h1>
					<ButtonAnimation />
				</div>

				<div
					className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-5xl font-semibold text-center flex flex-col gap-6"
					ref={hiddenTextRef}
				>
					<p className="text-[#ff3c00]">Stop Scrolling</p>
					<p className="text-white">Start Building!</p>
					<p className="text-xs text-white">Learn form the best</p>
				</div>

				<div className="size-450 absolute left-0 -translate-x-1/2 -bottom-1/2 translate-y-1/3 flex items-end">
					<div
						ref={wheel1Ref}
						className="relative w-full h-full"
					>
						{Array.from({ length: 10 }).map((_, index) => (
							<ImageItem
								key={handles[index]}
								index={index}
							/>
						))}
					</div>
				</div>
				<div className="size-450 absolute right-0 translate-x-1/2 -bottom-1/2 translate-y-1/3 flex items-end">
					<div
						ref={wheel2Ref}
						className="relative w-full h-full"
					>
						{Array.from({ length: 10 }).map((_, index) => (
							<ImageItem
								key={handles[index]}
								index={index}
								reversed
							/>
						))}
					</div>
				</div>
			</div>
			<div className="min-h-dvh flex items-center justify-center text-center text-white relative">
				<div className="flex flex-col gap-2">
					<p className="text-7xl">FIN</p>
					<p className="text-sm block min-[1440px]:hidden">
						Kindly use a desktop device
					</p>
				</div>

				<p className="absolute bottom-4 text-sm left-1/2 -translate-x-1/2">
					Made With ❤️{" "}
					<a
						href="https://x.com/itzadetunji1"
						target="_blank"
						rel="noopener noreferrer"
						className="underline"
					>
						Adetunji Adeyinka
					</a>
				</p>
			</div>
		</main>
	);
};

const ImageItem = (props: { index: number; reversed?: boolean }) => {
	const index = props.reversed
		? handles.length - 1 - (props.index % handles.length)
		: props.index % handles.length;
	const imgIndex = index + 1;
	const handle = handles[index];
	console.log(props.index, imgIndex);

	const angle = (props.index * 360) / 10 - 90;
	const radius = 450 * 1.65;

	// Calculate position on circle
	const x = Math.cos((angle * Math.PI) / 180) * radius;
	const y = Math.sin((angle * Math.PI) / 180) * radius;

	// Calculate rotation for the card to face outward from center
	const cardRotation = angle + 90;

	return (
		<a
			className={`group absolute w-57.5 h-75 rounded-lg object-cover shadow-lg flex items-center justify-center text-white font-bold text-xl overflow-hidden`}
			style={{
				left: "50%",
				top: "50%",
				transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${cardRotation}deg)`,
				transformOrigin: "center center",
			}}
			href={`https://x.com/${handle}`}
			target="_blank"
			rel="noopener noreferrer"
		>
			<img
				className="w-full h-full object-cover"
				style={{
					objectPosition:
						imgIndex === 1 || imgIndex === 3
							? "center"
							: imgIndex === 2 || imgIndex === 4
							? "left"
							: imgIndex === 5
							? "right"
							: "center",
				}}
				src={`/${imgIndex}.jpg`}
				alt=""
			/>
			<div className="bg-[#ff3c00]/10 h-full w-full absolute text-sm  duration-200 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center text-center font-regular ">
				X: {handle}
			</div>
		</a>
	);
};
