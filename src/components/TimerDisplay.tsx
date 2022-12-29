import React from "react";

interface Props {
	remainingTime: number;
	play: boolean;
	setPlay: React.Dispatch<React.SetStateAction<boolean>>;
	setKey: React.Dispatch<React.SetStateAction<number>>;
	elapsedTime: number;
}

const TimerDisplay = ({
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

export default TimerDisplay;
