"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu as MenuIcon, PlusCircle as PlusCircleIcon } from "lucide-react";
import { useWindowSize } from "@lib/hooks";
import { SignInButton } from "@components/auth";
import { Leaflet, LeafletButton } from "@components/common";
import { createArticle } from "@lib/api/article";
import { MenuItem } from "../DashboardLayout";

export interface NavbarProps {
  menuItems: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({ menuItems }) => {
  const [openLeaflet, setOpenLeaflet] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { isMobile } = useWindowSize();
  const router = useRouter();
  const pathname = usePathname();

  const onCreateArticleClick = async () => {
    try {
      setFetching(true);
      const { _id } = await createArticle();
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
              onClick={onCreateArticleClick}
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
                dropdownItems={item.dropdownItems}
                Icon={item.Icon}
                onClick={() => !item.dropdownItems && setOpenLeaflet(false)}
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
              className="z-20 h-6 w-6"
              aria-hidden="true"
            />
          </div>
        )}

        <div className="z-10 flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <Link href="/">
            <p className="font-display text-2xl">Penpal</p>
          </Link>
        </div>

        <div className="absolute right-0 z-10 pr-4 sm:pr-6 lg:pr-8">
          <SignInButton />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
