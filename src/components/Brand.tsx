import { useTheme } from "./theme-provider";

export default function Brand() {
	const { colorMode } = useTheme();
	return (
		<>
			<img
				draggable="false"
				src="/t2-site-brand-dark.svg"
				className="w-[90px] sm:w-[110px] lg:w-[120px] h-[30px]"
				style={{
					display: colorMode.isDark ? "block" : "none",
				}}
				alt="..."
			/>

			<img
				draggable="false"
				src="/t2-site-brand-light.svg"
				className="w-[90px] sm:w-[110px] lg:w-[120px] h-[30px]"
				style={{
					display: colorMode.isLight ? "block" : "none",
				}}
				alt="..."
			/>
		</>
	);
}
