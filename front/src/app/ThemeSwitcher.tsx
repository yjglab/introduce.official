"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import classNames from "classnames";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  const currentTheme = theme === "system" ? systemTheme : theme;
  const changeTheme = () => {
    if (currentTheme === "dark") setTheme("light");
    else setTheme("dark");
  };
  const renderThemeChanger = () => {
    if (!mounted) return null;

    return (
      <i
        className={classNames(
          currentTheme === "dark" ? "text-gray-300 -rotate-180" : "text-gray-900 rotate-0",
          "duration-500 text-[16px] bi bi-circle-half",
        )}
        role='button'
        onClick={() => changeTheme()}
      />
    );
  };

  return <>{renderThemeChanger()}</>;
};

export default ThemeSwitcher;
