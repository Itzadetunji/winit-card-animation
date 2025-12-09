import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const ButtonAnimation = () => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const imgContainerRef = useRef<HTMLImageElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const img1Ref = useRef<HTMLImageElement>(null);
	const img2Ref = useRef<HTMLImageElement>(null);

	useGSAP(() => {
		const button = buttonRef.current;
		const imgContainer = imgContainerRef.current;
		const img = imgRef.current;
		if (!button || !imgContainer || !img) return;

		gsap.set(img1Ref.current, { x: -16 });
		gsap.set(img2Ref.current, { x: -16 });

		const tl = gsap.timeline({ paused: true });

		tl.to(imgContainer, {
			width: button.clientWidth - 4,
			duration: 0.2,
			ease: "sine.inOut",
		})
			.to(
				img1Ref.current,
				{
					x: 0,
					duration: 0.2,
					ease: "sine.inOut",
				},
				"<"
			)
			.to(
				img2Ref.current,
				{
					x: 0,
					duration: 0.2,
					ease: "sine.inOut",
				},
				"<"
			);

		button.addEventListener("mouseenter", () => tl.play());
		button.addEventListener("mouseleave", () => tl.reverse());
	}, []);

	return (
		<button
			className="flex items-center bg-[#ff3c00] rounded-full gap-4 pl-6 pr-14.5 relative h-11 cursor-pointer"
			type="button"
			ref={buttonRef}
		>
			<div
				className="bg-black rounded-full absolute right-0.5 flex justify-end overflow-hidden"
				ref={imgContainerRef}
			>
				<div
					className="size-10 relative flex items-center gap-4 overflow-hidden justify-center"
					ref={imgRef}
				>
					<div className="size-4 overflow-hidden flex items-center gap-0">
						<img
							src="/arrow.svg"
							alt="first arrow"
							className="size-4 shrink-0"
							ref={img1Ref}
						/>
						<img
							src="/arrow.svg"
							alt="second arrow"
							className="size-4 shrink-0"
							ref={img2Ref}
						/>
					</div>
				</div>
			</div>
			<p className="text-white relative">Play Now</p>
		</button>
	);
};
