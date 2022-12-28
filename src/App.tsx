import { useState } from "react";
import { logoIcon, settingIcon } from "./assets";
import Modal from "./components/Modal";
import TabBar from "./components/TabBar";
import Timer from "./components/Timer";
import { useTimerState } from "./context/TimerContext";

function App() {
	const [isOpen, setIsOpen] = useState(false);
	const { font, mode } = useTimerState();
	return (
		<div
			className={`flex flex-col items-center justify-around bg-hawkes-blue h-screen ${font}`}
		>
			<div className="flex flex-col items-center space-y-11 md:space-y-14">
				<img
					src={logoIcon}
					alt="logo"
					className="w-[7.3rem] h-[1.5rem] md:h-[2rem] md:w-[9.75rem]"
				/>
				<TabBar />
			</div>
			<Timer mode={mode} />
			<button onClick={() => setIsOpen(true)}>
				<img
					src={settingIcon}
					alt="open setting modal icon"
					className="w-[1.75rem] h-[1.75rem]"
				/>
			</button>
			{isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
		</div>
	);
}

export default App;
