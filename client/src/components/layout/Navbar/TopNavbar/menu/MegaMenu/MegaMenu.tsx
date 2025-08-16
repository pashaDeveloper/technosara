"use client"
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { megaMenuActions } from "@/store/megaMenu-slice";
import { Transition } from "react-transition-group";
  import { MdMenu } from "react-icons/md";
import MenusContainer from "./MenusContainer";
import { IMegaMenuRootState } from "@/lib/types/megaMenu";

const MegaMenu = () => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  function showMegaMenuHandler() {
    dispatch(megaMenuActions.openMegaMenu());
  }
  function closeMegaMenuHandler() {
    dispatch(megaMenuActions.closeMegaMenu());
  }
  const isMegaMenuOpen = useSelector(
    (state: IMegaMenuRootState) => state.megaMenu.isMegaMenuOpen
  );

  return (
    <div
      className="flex items-center"
      onMouseOver={showMegaMenuHandler}
      onMouseOut={closeMegaMenuHandler}
    >
      <div className="flex items-center font-bold cursor-pointer">
        <MdMenu style={{ fontSize: "2rem" }} />
        <h3 className="ltr:ml-1 rtl:mr-1 text-nowrap">{`دسته بندی کالا ها`}</h3>
      </div>

      <Transition
        nodeRef={nodeRef}
        in={isMegaMenuOpen!}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        {(state) => {
          return (
            <div ref={nodeRef} className="z-[100]">
              <div
                className={`fixed top-[10.2rem] inset-0 bg-gray-600/60
                ${
                  state === "entering"
                    ? "animate-fadeEntering"
                    : state === "entered"
                    ? "opacity-100"
                    : "animate-fadeExit"
                }
                `}
                onClick={closeMegaMenuHandler}
              ></div>
              <div className="absolute top-full left-0 right-0 bg-white z-[110] shadow-md rounded-br-lg rounded-bl-lg">
                <MenusContainer />
              </div>
            </div>
          );
        }}
      </Transition>
    </div>
  );
};

export default MegaMenu;
