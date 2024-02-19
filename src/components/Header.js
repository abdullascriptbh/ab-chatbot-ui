import ThemeSwitcher from "./ThemeSwitcher";

export function Header() {
	return (
		<div className="fixed top-0 h-20 w-full border-b-[1px] border-date-color-100 bg-custom-white p-3 pt-4 dark:border-date-color-400 dark:bg-header-color  dark:text-slate-50">
			<div className="flex flex-row  justify-between">
				<ThemeSwitcher />
				<h4 className="text-3xl font-semibold leading-36.31 light-gradient-text dark:dark-gradient-text">AbdullaScript</h4>
			</div>
		</div>
	);
}
