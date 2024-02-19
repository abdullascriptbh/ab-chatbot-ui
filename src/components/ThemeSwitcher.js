import React, { useState, useEffect } from "react";
import { MdOutlineWbSunny } from "react-icons/md";

import { MdOutlineDarkMode } from "react-icons/md";

const ThemeSwitcher = () => {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const isDarkMode = localStorage.getItem("darkMode") === "true";
		setDarkMode(isDarkMode);
	}, []);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", darkMode);
		localStorage.setItem("darkMode", darkMode);
	}, [darkMode]);

	const toggleDarkMode = () => {
		setDarkMode((prevMode) => !prevMode);
	};
	return (
		<label className="inline-flex cursor-pointer select-none items-center">
			<div className="relative">
				<input type="checkbox" checked={darkMode} onChange={toggleDarkMode} className="sr-only" />
				<div className="block h-8 w-14 rounded-full bg-chat-bubble-100 dark:bg-chat-bubble-400"></div>
				<div className="dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#ffffff] transition dark:bg-[#50577A]">
					<span className="inactive bg-[#ffffff] dark:bg-[#50577A]">
						<MdOutlineWbSunny className="text-slate-900 dark:text-slate-50" />
					</span>
					<span className="active hidden dark:bg-[#50577A]">
						<MdOutlineDarkMode className="text-slate-900 dark:text-slate-50" />
					</span>
				</div>
			</div>
		</label>
	);
	// return darkMode ? (
	// 	<button onClick={toggleDarkMode} className="px-3 py-3 rounded-md bg-slate-50 text-gray-800 dark:text-white dark:bg-gray-500">
	// 		<MdDarkMode />
	// 	</button>
	// ) : (
	// 	<button onClick={toggleDarkMode} className="px-3 py-3 rounded-md bg-slate-50 text-gray-800 dark:text-white dark:bg-gray-500">
	// 		<MdSunny />
	// 	</button>
	// );
};

export default ThemeSwitcher;
