import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Mode, useTimerState } from "../context/TimerContext";

interface Props {
	remainingTime: number;
	play: boolean;
	setPlay: React.Dispatch<React.SetStateAction<boolean>>;
	setKey: React.Dispatch<React.SetStateAction<number>>;
}

const RenderTime = ({ remainingTime, play, setPlay, setKey }: Props) => {
	const minutes = Math.floor(remainingTime / 60);
	const seconds = remainingTime % 60;

	const time = `${minutes > 9 ? minutes : `0${minutes}`}:${
		seconds > 9 ? seconds : `0${seconds}`
	}`;

	const playHandler = () => {
		if (remainingTime === 0) {
			setKey((pre) => pre + 1);
		} else {
			setPlay((pre) => !pre);
		}
	};

	return (
		<div className="flex flex-col items-center space-y-3 md:space-y-3.5">
			<div className="text-[5rem] leading-[6.625rem] text-purple font-bold md:text-[6.25rem] md:leading-[8.187rem]">
				{time}
			</div>
			<div
				className="cursor-pointer text-body-1 tracking-[13.125px] text-purple font-bold md:text-base"
				onClick={playHandler}
			>
				{play && remainingTime !== 0 ? "PAUSE" : "RESTART"}
			</div>
		</div>
	);
};

const Timer = ({ mode }: { mode: Mode }) => {
	const { color, pomodoro, shortBreak, longBreak } = useTimerState();
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
		if (mode === "pomodoro") setTime(pomodoro * 60);
		if (mode === "shortBreak") setTime(shortBreak * 60);
		if (mode === "longBreak") setTime(longBreak * 60);
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
				{({ remainingTime }) => (
					<RenderTime
						remainingTime={remainingTime}
						play={play}
						setPlay={setPlay}
						setKey={setKey}
					/>
				)}
			</CountdownCircleTimer>
		</div>
	);
};

export default Timer;
