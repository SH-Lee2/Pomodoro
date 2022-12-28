import { Tab } from "@headlessui/react";
import { Mode, useTimerState } from "../context/TimerContext";

interface Tabs {
	tab: string;
	name: Mode;
}

const tabs: Tabs[] = [
	{ tab: "pomodoro", name: "pomodoro" },
	{ tab: "short break", name: "shortBreak" },
	{ tab: "long break", name: "longBreak" },
];

const TabBar = () => {
	const { color, setMode } = useTimerState();

	return (
		<>
			<Tab.Group>
				<Tab.List className="bg-black-russian rounded-[31.5px] h-[3.9rem] w-[20.4rem] flex  px-1.5 py-2 md:w-[23.3rem]">
					{tabs.map(({ tab, name }) => (
						<Tab
							key={tab}
							onClick={() => setMode(name)}
							className={({ selected }) =>
								`text-body-2 font-bold flex-1 outline-none md:text-body-1 ${
									selected
										? `${color} text-hawkes-blue rounded-[26.5px]`
										: "bg-black-russian text-purple/40"
								}`
							}
						>
							{tab}
						</Tab>
					))}
				</Tab.List>
			</Tab.Group>
		</>
	);
};

export default TabBar;
