import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useTimerState } from "../context/TimerContext";
import TimerDisplay from "./TimerDisplay";

const Timer = () => {
	const { color, mode, timer } = useTimerState();
	const [play, setPlay] = useState(false);
	const [key, setKey] = useState(0);
	const [time, setTime] = useState(0);

	const convertColor = () => {
		if (color === "bg-salmon") return "#F87070";
		if (color === "bg-baby-blue") return "#70F3F8";
		if (color === "bg-heliotrope") return "#D881F8";
	};
	const circleColor = convertColor();

	const [windowSize, setWindowSize] = useState(window.innerWidth);

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(window.innerWidth);
		}

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	useEffect(() => {
		if (mode === "pomodoro") setTime(timer.pomodoro * 60);
		if (mode === "shortBreak") setTime(timer.shortBreak * 60);
		if (mode === "longBreak") setTime(timer.longBreak * 60);
		setKey((pre) => pre + 1);
		setPlay(false);
		return;
	}, [mode]);

	return (
		<div className="rounded-full bg-primary-gradient p-5">
			<CountdownCircleTimer
				key={key}
				isPlaying={play}
				duration={time}
				rotation="counterclockwise"
				colors={circleColor!}
				trailColor={"#161932"}
				strokeWidth={windowSize >= 768 ? 10 : 8}
				size={windowSize >= 768 ? 339 : 267}
			>
				{({ remainingTime, elapsedTime }) => (
					<TimerDisplay
						remainingTime={remainingTime}
						play={play}
						elapsedTime={elapsedTime}
						setPlay={setPlay}
						setKey={setKey}
					/>
				)}
			</CountdownCircleTimer>
		</div>
	);
};

export default Timer;
