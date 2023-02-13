"use client";

import { SendIcon } from "lucide-react";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const { width } = props;

  return (
    <div className={`relative ${width && width}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {props.type === "email" && (
          <SendIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        )}
      </div>
      <input
        {...props}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 outline-none focus:border-emerald-600 focus:ring-emerald-600  dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-emerald-600 dark:focus:ring-emerald-600"
      />
    </div>
  );
};

export default Input;
