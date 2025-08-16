import React, { forwardRef } from "react";
import { IoClose } from "react-icons/io5";
import SideNavContent from "./SideNavContent";

interface Props {
  state?: string;
  onClose: () => void;
}

const SideNav = forwardRef<HTMLDivElement, Props>(({ state, onClose }, ref) => {
  const animationClass =
    state === "entering"
      ? "ltr:animate-sidenavLTREntering rtl:animate-sidenavRTLEntering"
      : state === "entered"
      ? "translate-x-0"
      : "ltr:animate-sidenavLTRExit rtl:animate-sidenavRTLExit";

  return (
    <div
      ref={ref}
      className={`max-w-[380px] w-[90%] h-screen fixed top-0 right-0 shadow-md z-[1000] bg-white origin-right overflow-y-auto transform ${animationClass}`}
    >
      <div
        className="absolute top-3 ltr:right-0 rtl:right-0 ltr:ml-[85%] rtl:mr-[85%] text-4xl cursor-pointer"
        onClick={onClose}
      >
        <IoClose />
      </div>
      <div className="pt-5 pb-3 ltr:pl-4 rtl:pr-5" onClick={onClose}>
        TECHNOSARAY
      </div>
      <hr />
      <SideNavContent />
    </div>
  );
});

SideNav.displayName = "SideNav";

export default SideNav;
