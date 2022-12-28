import React from "react";
import { Dialog } from "@headlessui/react";
import { closeIcon } from "../assets";
import TimeInput from "./TimeInput";
import FontList from "./FontList";
import ColorList from "./ColorList";
import { useTimerState } from "../context/TimerContext";

interface Props {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ isOpen, setIsOpen }: Props) => {
	const { font, color } = useTimerState();
	const closeHandle = () => {
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onClose={closeHandle} className={`z-50 ${font}`}>
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="relative text-center mx-auto w-[20.4375rem] h-[34.3125rem] rounded-[15px] bg-white md:w-[33.75rem] md:h-[29rem] md:rounded-[25px]">
					<div className="flex justify-between items-center p-6 border-b-[1px] border-[#E3E1E1] border-solid md:px-10 md:pt-[34px] md:pb-[31px]">
						<Dialog.Title className="text-black-russian text-xl leading-6 md:text-h2">
							Settings
						</Dialog.Title>
						<img
							src={closeIcon}
							alt="setting close icon"
							className="w-[14px] h-[14px] cursor-pointer"
							onClick={closeHandle}
						/>
					</div>
					<TimeInput />
					<FontList />
					<ColorList />
					<button
						type="button"
						onClick={closeHandle}
						className={`absolute left-1/2 -translate-x-1/2 -bottom-6 ${color} text-white text-base leading-5 rounded-[26.5px] w-[8.75rem] py-4`}
					>
						Apply
					</button>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default Modal;
