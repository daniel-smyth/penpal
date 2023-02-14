"use client";

import { Mail as MailIcon, Send as SendIcon } from "lucide-react";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  width?: string;
  onClick?: () => void;
}

const Input: React.FC<InputProps> = (props) => {
  const { id, label, width, onClick } = props;

  return (
    <div className="text-left">
      <label
        htmlFor={id}
        className="pl-3 text-sm font-medium text-gray-500 dark:text-white"
      >
        {label}
      </label>
      <div className={`relative ${width && width}`}>
        <div className="absolute inset-y-0 left-0 flex items-center rounded pl-3 transition-all focus:ring-2 focus:ring-blue-400">
          <button
            onClick={onClick}
            className="h-8 w-8 rounded-lg bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
          >
            {props.type === "text" && <SendIcon className="h-5 w-5" />}
            {props.type === "email" && <MailIcon className="h-5 w-5" />}
          </button>
        </div>
        <input
          {...props}
          id={id}
          className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 outline-none focus:border-emerald-600 focus:ring-emerald-600  dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-emerald-600 dark:focus:ring-emerald-600"
        />
      </div>
    </div>
  );
};

export default Input;
