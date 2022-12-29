import { RadioGroup } from "@headlessui/react";
import { checkIcon } from "../assets";
import { useTimerState } from "../context/TimerContext";

const colors = [
	{
		color: "bg-salmon",
	},
	{
		color: "bg-baby-blue",
	},
	{
		color: "bg-heliotrope",
	},
];

const ColorList = () => {
	const { color, setColor } = useTimerState();
	return (
		<div className="px-6 pt-4 space-y-[18px] md:px-10 md:pt-6">
			<div className="space-y-[15px] pb-6 md:flex md:items-center md:justify-between md:space-y-0">
				<p className="text-[11px] leading-[13.64px] tracking-description-title md:text[13px] md:leading-[16.12px] md:tracking-[5px]">
					COLOR
				</p>
				<RadioGroup value={color} onChange={setColor}>
					<div className="flex justify-center items-center space-x-4">
						{colors.map(({ color }) => (
							<RadioGroup.Option key={color} value={color}>
								{({ checked }) => (
									<li
										className={`list-none cursor-pointer flex items-center justify-center rounded-full w-[2.5rem] h-[2.5rem] ${color} transition-all duration-150 hover:scale-110`}
									>
										{checked && (
											<img
												src={checkIcon}
												alt="checked color"
												className="w-4 h-4"
											/>
										)}
									</li>
								)}
							</RadioGroup.Option>
						))}
					</div>
				</RadioGroup>
			</div>
		</div>
	);
};

export default ColorList;
