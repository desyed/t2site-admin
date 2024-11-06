import { useTheme } from "./theme-provider";

export default function Brand() {
	const { colorMode } = useTheme();
	return (
		<>
			<img
				draggable="false"
				src="/t2-site-brand-dark.svg"
				className="w-[100px] sm:w-[130px] lg:w-[140px] h-[36px]"
				style={{
					display: colorMode.isDark ? "block" : "none",
				}}
				alt="..."
			/>

			<img
				draggable="false"
				src="/t2-site-brand-light.svg"
				className="w-[100px] sm:w-[130px] lg:w-[140px] h-[36px]"
				style={{
					display: colorMode.isLight ? "block" : "none",
				}}
				alt="..."
			/>
		</>
	);
}
