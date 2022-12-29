import React, { useReducer, useContext, createContext } from "react";

export type Color = "bg-salmon" | "bg-baby-blue" | "bg-heliotrope";
export type Font = "font-kumbh-sans" | "font-roboto-slab" | "font-space-mono";
export type Mode = "pomodoro" | "shortBreak" | "longBreak";

interface State {
	color: Color;
	font: Font;
	mode: Mode;
	timer: {
		[key: string]: number;
	};
}

interface contextType extends State {
	setColor: (color: Color) => void;
	setFont: (font: Font) => void;
	setMode: (mode: Mode) => void;
	setTimer: (name: string, time: number) => void;
}

type Action =
	| { type: "SET_FONT"; font: Font }
	| { type: "SET_COLOR"; color: Color }
	| { type: "SET_MODE"; mode: Mode }
	| { type: "SET_TIMER"; name: string; time: number };

const TimerStateContext = createContext<contextType | null>(null);

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_FONT":
			return {
				...state,
				font: action.font,
			};
		case "SET_COLOR":
			return {
				...state,
				color: action.color,
			};
		case "SET_MODE":
			return {
				...state,
				mode: action.mode,
			};
		case "SET_TIMER":
			if (action.time > 60 || action.time < 0 || isNaN(action.time))
				return state;
			const newTimer = { ...state.timer, [action.name]: action.time };
			return {
				...state,
				timer: newTimer,
			};
		default:
			throw new Error("Unhandled action");
	}
};

export function StyleProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, {
		color: "bg-salmon",
		font: "font-kumbh-sans",
		mode: "pomodoro",
		timer: {
			pomodoro: 25,
			shortBreak: 5,
			longBreak: 15,
		},
	});

	const setColor = (color: Color) => {
		dispatch({ type: "SET_COLOR", color });
	};

	const setFont = (font: Font) => {
		dispatch({ type: "SET_FONT", font });
	};

	const setMode = (mode: Mode) => {
		dispatch({ type: "SET_MODE", mode });
	};

	const setTimer = (name: string, time: number) => {
		dispatch({ type: "SET_TIMER", name, time });
	};

	const value: contextType = {
		...state,
		setColor,
		setFont,
		setMode,
		setTimer,
	};
	return (
		<TimerStateContext.Provider value={value}>
			{children}
		</TimerStateContext.Provider>
	);
}

export function useTimerState() {
	const state = useContext(TimerStateContext);
	if (!state) throw new Error("Cannot find StyleStateContext"); // 유효하지 않을땐 에러를 발생
	return state;
}
