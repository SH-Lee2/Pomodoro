export type Color = "bg-salmon" | "bg-baby-blue" | "bg-heliotrope";
export type Font = "font-kumbh-sans" | "font-roboto-slab" | "font-space-mono";
export type Mode = "pomodoro" | "shortBreak" | "longBreak";

export interface State {
	color: Color;
	font: Font;
	mode: Mode;
	timer: {
		[key: string]: number;
	};
}

export interface contextType extends State {
	setColor: (color: Color) => void;
	setFont: (font: Font) => void;
	setMode: (mode: Mode) => void;
	setTimer: (name: string, time: number) => void;
}

export type Action =
	| { type: "SET_FONT"; font: Font }
	| { type: "SET_COLOR"; color: Color }
	| { type: "SET_MODE"; mode: Mode }
	| { type: "SET_TIMER"; name: string; time: number };
