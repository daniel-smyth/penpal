"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu as MenuIcon, PlusCircle as PlusCircleIcon } from "lucide-react";
import { useWindowSize } from "@lib/hooks";
import { SignInButton } from "@components/auth";
import { Leaflet, LeafletButton } from "@components/common";
import { MenuItem } from "../DashboardLayout";
import { fetcher } from "@lib/fetcher";

export interface NavbarProps {
  menuItems: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({ menuItems }) => {
  const [openLeaflet, setOpenLeaflet] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { isMobile } = useWindowSize();
  const router = useRouter();
  const pathname = usePathname();

  const createArticle = async () => {
    try {
      setFetching(true);
      const article = {
        title: "",
        text: {
          current: { input: "", output: { choices: [{ text: "" }] } },
          history: [],
        },
        image: {
          current: { input: "", output: { data: { url: "" } } },
          history: [],
        },
      };
      const { _id } = await fetcher({
        url: "/api/article",
        method: "POST",
        body: article,
      });
      router.push(`/article/${_id}/text`);
    } catch (err: any) {
      console.log(err);
      setFetching(false);
      throw new Error(err);
    }
  };

  return (
    <>
      {isMobile && openLeaflet && (
        <Leaflet setShow={setOpenLeaflet}>
          <div className="space-y-4 border-b border-gray-200 bg-white px-2 pt-2 pb-6 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
            <LeafletButton
              loading={fetching}
              onClick={createArticle}
              Icon={PlusCircleIcon}
            >
              Create New
            </LeafletButton>
            {menuItems.map((item) => (
              <LeafletButton
                key={item.title}
                href={
                  item.href &&
                  pathname?.slice(0, pathname.lastIndexOf("/")) + item.href
                }
                Icon={item.Icon}
                onClick={() => setOpenLeaflet(false)}
              >
                {item.title}
              </LeafletButton>
            ))}
          </div>
        </Leaflet>
      )}

      <nav className="flex h-16 items-center border border-gray-300 bg-gray-50 px-4 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:px-6 lg:px-8">
        {isMobile && (
          <div className="absolute flex text-gray-400">
            <MenuIcon
              onClick={() => setOpenLeaflet(true)}
              className="h-6 w-6"
              aria-hidden="true"
            />
          </div>
        )}

        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <Link href="/">
            <p className="font-display text-2xl">Penpal</p>
          </Link>
        </div>

        <div className="absolute right-0 pr-4 sm:pr-6 lg:pr-8">
          <SignInButton />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
