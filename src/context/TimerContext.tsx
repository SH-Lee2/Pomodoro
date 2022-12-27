import React, { useReducer, useContext, createContext } from "react";

export type Color = "salmon" | "baby-blue" | "heliotrope";
export type Font = "kumbh-sans" | "roboto-slab" | "space-mono";

type State = {
	color: Color;
	font: Font;
	pomodoro: number;
	shortBreak: number;
	longBreak: number;
};

interface contextType extends State {
	setColor: (color: Color) => void;
	setFont: (font: Font) => void;
	setPomodoro: (pomodoro: number) => void;
	setShortBreak: (shortBreak: number) => void;
	setLongBreak: (longBreak: number) => void;
}

type Action =
	| { type: "SET_FONT"; font: Font }
	| { type: "SET_COLOR"; color: Color }
	| { type: "SET_POMODORO"; pomodoro: number }
	| { type: "SET_SHORT_BREAK"; shortBreak: number }
	| { type: "SET_LONG_BREAK"; longBreak: number };

const StyleStateContext = createContext<contextType | null>(null);

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
		case "SET_POMODORO":
			return {
				...state,
				pomodoro: state.pomodoro + action.pomodoro,
			};
		case "SET_SHORT_BREAK":
			return {
				...state,
				shortBreak: state.shortBreak + action.shortBreak,
			};
		case "SET_LONG_BREAK":
			return {
				...state,
				longBreak: state.longBreak + action.longBreak,
			};
		default:
			throw new Error("Unhandled action");
	}
};

export function StyleProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, {
		color: "salmon",
		font: "kumbh-sans",
		pomodoro: 25,
		shortBreak: 5,
		longBreak: 15,
	});

	const setColor = (color: Color) => {
		dispatch({ type: "SET_COLOR", color });
	};

	const setFont = (font: Font) => {
		dispatch({ type: "SET_FONT", font });
	};

	const setPomodoro = (pomodoro: number) => {
		dispatch({ type: "SET_POMODORO", pomodoro });
	};

	const setShortBreak = (shortBreak: number) => {
		dispatch({ type: "SET_SHORT_BREAK", shortBreak });
	};

	const setLongBreak = (longBreak: number) => {
		dispatch({ type: "SET_LONG_BREAK", longBreak });
	};

	const value: contextType = {
		...state,
		setColor,
		setFont,
		setPomodoro,
		setShortBreak,
		setLongBreak,
	};
	return (
		<StyleStateContext.Provider value={value}>
			{children}
		</StyleStateContext.Provider>
	);
}

export function useStyleState() {
	const state = useContext(StyleStateContext);
	if (!state) throw new Error("Cannot find StyleStateContext"); // 유효하지 않을땐 에러를 발생
	return state;
}
