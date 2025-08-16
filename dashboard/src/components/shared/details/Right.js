import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import CartButton from "./CartButton";
import Description from "./Description";
import Policies from "./Policies";

const Right = ({ product }) => {
  // انتخاب واحد محصول به طور پیش‌فرض

  return (
    <section className="lg:col-span-6 md:col-span-6 col-span-12 flex flex-col gap-y-8">
   
       <article className="flex flex-col gap-y-8">
         <div className="flex flex-col gap-y-4">
          <h1 className="lg:text-5xl md:text-3xl text-xl">{product?.title || "عنوان محصول"}</h1>
          <span className="text-xs flex items-center gap-x-1 px-2 h-full bg-zinc-50 rounded">
            <AiFillStar className="w-4 h-4 text-yellow-500" /> {product?.reviews?.length || 0}
          </span>
        </div>
        <CartButton product={product} /> 
      </article> 

       <Description product={product} />
       <Policies /> 
    </section>
  );
};

export default Right;
