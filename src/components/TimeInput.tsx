import { useEffect, useRef } from "react";
import { arrowDownIcon, arrowUpIcon } from "../assets";
import { useTimerState } from "../context/TimerContext";

const TimeInput = () => {
	const { timer, setTimer } = useTimerState();
	const inputRef = useRef<HTMLInputElement>(null);
	const timeInput = [
		{
			label: "pomodoro",
			time: timer.pomodoro,
			name: "pomodoro",
		},
		{
			label: "short break",
			time: timer.shortBreak,
			name: "shortBreak",
		},
		{
			label: "long break",
			time: timer.longBreak,
			name: "longBreak",
		},
	];

	useEffect(() => {
		inputRef.current && inputRef.current.blur();
	}, []);

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
								type="text" // number 하면 0이 안없어짐
								id="timer-duration"
								ref={inputRef}
								value={time}
								onChange={(e) => setTimer(name, +e.target.value)}
								className="relative outline-none border-none text-hawkes-blue text-body-1 bg-silver rounded-[10px] py-[11px] pl-4 w-[8.75rem]"
							/>
							<div className="absolute top-[10px] right-4 space-y-2">
								<img
									src={arrowUpIcon}
									alt="increment time"
									className="cursor-pointer"
									onClick={() => setTimer(name, time + 1)}
								/>
								<img
									src={arrowDownIcon}
									alt="decrement time"
									className="cursor-pointer"
									onClick={() => setTimer(name, time - 1)}
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
