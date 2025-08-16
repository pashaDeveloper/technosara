import React from "react";
import StepAddCategory from "./steps/StepAddCategory";
import ThemeToggle from "../../components/ThemeToggle";
function AddCategory() {

  return (
    <section className="w-screen relative h-screen overflow-hidden flex justify-center items-center p-4 ">
    <div className="wave "></div>
    <div className="wave wave2 "></div>
    <div className="wave wave3"></div>
    <div className="max-w-md w-full bg-white justify-center dark:bg-gray-900 z-50 flex flex-col gap-y-4  p-8 rounded-primary shadow-lg">
    <div className="flex flex-row  items-center gap-x-2">

   <StepAddCategory />
    </div>

   <ThemeToggle />
    </div>
    </section>
  );
}

export default AddCategory;
