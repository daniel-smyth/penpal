"use client";

import React, { Fragment } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";

const UserDropdown: React.FC = () => {
  const { data: session } = useSession();
  const { email, image } = session?.user || {};

  if (!email) {
    return null;
  }

  return (
    <motion.div
      className="relative inline-block text-left"
      {...FADE_IN_ANIMATION_SETTINGS}
    >
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">Open user menu</span>
            <Image
              className="h-8 w-8 rounded-full"
              alt={email}
              src={
                image || `https://avatars.dicebear.com/api/micah/${email}.svg`
              }
              width={21}
              height={21}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  className="relative flex w-full cursor-not-allowed items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
                  disabled
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <p className="text-sm">Dashboard</p>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100">
                  <User className="h-4 w-4" />
                  <p className="text-sm">Profile</p>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
                  onClick={() => signOut({ redirect: false })}
                >
                  <LogOut className="h-4 w-4" />
                  <p className="text-sm">Logout</p>
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </motion.div>
  );
};

export default UserDropdown;
