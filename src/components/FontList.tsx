import { RadioGroup } from "@headlessui/react";
import { useStyleState } from "../context/TimerContext";

const fonts = [
	{
		name: "Aa",
		font: "kumbh-sans",
	},
	{
		name: "Aa",
		font: "roboto-slab",
	},
	{
		name: "Aa",
		font: "space-mono",
	},
];

function FontList() {
	const { font, setFont } = useStyleState();
	return (
		<div className="px-6 pt-6 md:px-10 ">
			<div className="space-y-[15px] pb-6 border-b-[1px] border-[#E3E1E1] border-solid md:flex md:items-center md:justify-between md:space-y-0">
				<p className="text-[11px] leading-[13.64px] tracking-description-title md:text[13px] md:leading-[16.12px] md:tracking-[5px]">
					FONT
				</p>
				<RadioGroup value={font} onChange={setFont}>
					<div className="flex justify-center items-center space-x-4">
						{fonts.map(({ name, font }) => (
							<RadioGroup.Option key={font} value={font}>
								{({ checked }) => (
									<li
										className={`list-none cursor-pointer flex items-center justify-center rounded-full w-[2.5rem] h-[2.5rem] font-${font} ${
											checked
												? "bg-black-russian text-white"
												: "bg-silver text-hawkes-blue/70"
										}`}
									>
										{name}
									</li>
								)}
							</RadioGroup.Option>
						))}
					</div>
				</RadioGroup>
			</div>
		</div>
	);
}

export default FontList;
