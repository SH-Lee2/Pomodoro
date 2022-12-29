import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Mode, useTimerState } from "../context/TimerContext";

interface Props {
	remainingTime: number;
	play: boolean;
	setPlay: React.Dispatch<React.SetStateAction<boolean>>;
	setKey: React.Dispatch<React.SetStateAction<number>>;
	elapsedTime: number;
}

const RenderTime = ({
	remainingTime,
	play,
	setPlay,
	setKey,
	elapsedTime,
}: Props) => {
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

	const resetHandler = () => {
		setKey((pre) => pre + 1);
		setPlay(false);
	};

	return (
		<div className="flex flex-col items-center space-y-3 md:space-y-3.5">
			{elapsedTime !== 0 && (
				<div
					className="cursor-pointer text-body-1 tracking-[13.125px] text-purple font-bold md:text-base"
					onClick={resetHandler}
				>
					RESET
				</div>
			)}
			<div className="text-[5rem] leading-[6.625rem] -tracking-[4px] text-purple font-bold md:text-[6.25rem] md:leading-[8.187rem] md:-tracking-[5px]">
				{time}
			</div>
			<div
				className="cursor-pointer text-body-1 tracking-[13.125px] text-purple font-bold md:text-base"
				onClick={playHandler}
			>
				{elapsedTime === 0 ? "START" : play ? "PAUSE" : "RESTART"}
			</div>
		</div>
	);
};

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
					<RenderTime
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
