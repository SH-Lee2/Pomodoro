import { arrowDownIcon, arrowUpIcon } from "../assets";
import { useTimerState } from "../context/TimerContext";

const TimeInput = () => {
	const {
		pomodoro,
		shortBreak,
		longBreak,
		setPomodoro,
		setShortBreak,
		setLongBreak,
	} = useTimerState();

	const timeInput = [
		{
			label: "pomodoro",
			time: pomodoro,
			name: "pomodoro",
		},
		{
			label: "short break",
			time: shortBreak,
			name: "shortBreak",
		},
		{
			label: "long break",
			time: longBreak,
			name: "longBreak",
		},
	];
	const timeHandler = (time: number, name: string, value: number) => {
		if (time + value === 0) return;
		if (name === "pomodoro") {
			setPomodoro(value);
		}
		if (name === "shortBreak") {
			setShortBreak(value);
		}
		if (name === "longBreak") {
			setLongBreak(value);
		}
	};
	return (
		<div className="px-6 pt-6 space-y-[18px] md:px-10">
			<p className="text-[11px] leading-[13.64px] tracking-description-title md:text-start md:text[13px] md:leading-[16.12px] md:tracking-[5px]">
				TIME (MINUTES)
			</p>
			<form className="flex flex-col space-y-2 pb-6 border-b-[1px] border-[#E3E1E1] border-solid md:flex-row md:space-y-0 md:justify-between">
				{timeInput.map(({ label, time, name }) => (
					<div
						key={label}
						className="flex items-center justify-between md:flex-col md:space-y-2.5 md:items-start"
					>
						<label
							htmlFor="timer-duration"
							className="text-body-2 text-hawkes-blue/40"
						>
							{label}
						</label>
						<div className="relative">
							<input
								type="number"
								id="timer-duration"
								value={time}
								min={0}
								step={1}
								readOnly
								className="relative outline-none border-none text-hawkes-blue text-body-1 bg-silver rounded-[10px] py-[11px] pl-4 w-[8.75rem]"
							/>
							<div className="absolute top-[10px] right-4 space-y-2">
								<img
									src={arrowUpIcon}
									alt="increment time"
									className="cursor-pointer"
									onClick={() => timeHandler(time, name, 1)}
								/>
								<img
									src={arrowDownIcon}
									alt="decrement time"
									className="cursor-pointer"
									onClick={() => timeHandler(time, name, -1)}
								/>
							</div>
						</div>
					</div>
				))}
			</form>
		</div>
	);
};

export default TimeInput;
