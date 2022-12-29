import React, {
	useReducer,
	useContext,
	createContext,
	useCallback,
} from "react";
import { Action, Color, contextType, Font, Mode, State } from "../types";

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

	const setColor = useCallback((color: Color) => {
		dispatch({ type: "SET_COLOR", color });
	}, []);

	const setFont = useCallback((font: Font) => {
		dispatch({ type: "SET_FONT", font });
	}, []);

	const setMode = useCallback((mode: Mode) => {
		dispatch({ type: "SET_MODE", mode });
	}, []);

	const setTimer = useCallback((name: string, time: number) => {
		dispatch({ type: "SET_TIMER", name, time });
	}, []);

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
