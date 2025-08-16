import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopBanner = () => {
  return (
    <div className="bg-green-500 text-white text-center py-4 px-4 sm:px-4 xl:px-0">
      <div className="relative max-w-frame mx-auto">
        <p className="text-lg sm:text-md">
   با ۲۰٪ تخفیف، افتتاح فروشگاه آنلاین ما رو جشن بگیر!🛒 
          <Link href="#" className="underline font-medium mr-2">
            همین الان ثبت نام کن
          </Link>
        </p>
        <Button
          variant="ghost"
          className="hover:bg-transparent absolute right-0 top-1/2 -translate-y-1/2 w-fit h-fit p-1 hidden sm:flex"
          size="icon"
          type="button"
          aria-label="close banner"
        >
          <Image
            priority
            src="/icons/times.svg"
            height={13}
            width={13}
            alt="close banner"
          />
        </Button>
      </div>
    </div>
  );
};

export default TopBanner;
