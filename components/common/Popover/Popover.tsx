import { Dispatch, SetStateAction, ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useWindowSize } from "@lib/hooks";
import { Leaflet } from "../Leaflet";

interface PopoverProps {
  children?: ReactNode;
  content: ReactNode | string;
  align?: "center" | "start" | "end";
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
}

/**
 * Displays additional content on top of a page. Smaller and less intrusive than the modal.
 * Allows users to interact with the main page while still being able to access the contents of
 * the popover. Modal completely blocks the main page and requires user interaction with the
 * modal before being able to access the main page again.
 */
const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  align = "center",
  openPopover,
  setOpenPopover,
}) => {
  const { isMobile, isDesktop } = useWindowSize();
  return (
    <>
      {isMobile && children}
      {openPopover && isMobile && (
        <Leaflet setShow={setOpenPopover}>{content}</Leaflet>
      )}
      {isDesktop && (
        <PopoverPrimitive.Root>
          <PopoverPrimitive.Trigger className="inline-flex" asChild>
            {children}
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content
            sideOffset={4}
            align={align}
            className="animate-slide-up-fade z-20 items-center rounded-md border border-gray-200 bg-white drop-shadow-lg"
          >
            {content}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      )}
    </>
  );
};

export default Popover;
