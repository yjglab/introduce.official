"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import classNames from "classnames";
import { RiContrast2Line } from "@remixicon/react";
import { RiSize } from "@constants";

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
      <button onClick={() => changeTheme()} type='button'>
        <RiContrast2Line
          size={RiSize.sm}
          className={classNames(
            currentTheme === "dark" ? "text-gray-300 -rotate-180" : "text-gray-900 rotate-0",
            "duration-500",
          )}
        />
      </button>
    );
  };

  return <>{renderThemeChanger()}</>;
};

export default ThemeSwitcher;
