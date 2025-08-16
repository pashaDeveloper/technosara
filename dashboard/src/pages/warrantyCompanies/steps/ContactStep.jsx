import { useEffect } from "react";

import NavigationButton from "@/components/shared/button/NavigationButton";

import { toast } from "react-hot-toast";

const ContactStep = ({  errors, register ,prevStep, nextStep }) => {




 

  return (
    <div>
      <div className="flex flex-col gap-y-4 h-full p-2">
        {/* شماره تماس */}
        <label htmlFor="phone" className="flex flex-col gap-y-1">
          <span className="text-sm">شماره تماس</span>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="مثلاً 02112345678"
            className="p-2 rounded border"
            {...register("phone", {
              pattern: {
                value: /^0\d{10}$/,
                message: "شماره تماس باید ۱۱ رقم و با ۰ شروع شود"
              }
            })}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone.message}</span>
          )}
        </label>

        {/* وب‌سایت */}
        <label htmlFor="website" className="flex flex-col gap-y-1">
          <span className="text-sm">وب‌سایت</span>
          <input
            type="url"
            name="website"
            id="website"
            placeholder="مثلاً https://example.com"
            className="p-2 rounded "
            {...register("website", {
              pattern: {
                value:
                  /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-]*)*\/?$/,
                message: "آدرس وب‌سایت معتبر نیست"
              }
            })}
          />
          {errors.website && (
            <span className="text-red-500 text-sm">
              {errors.website.message}
            </span>
          )}
        </label>

        {/* ایمیل */}
        <label htmlFor="email" className="flex flex-col gap-y-1">
          <span className="text-sm">ایمیل</span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="مثلاً example@email.com"
            className="p-2 rounded border"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "فرمت ایمیل صحیح نیست"
              }
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </label>

   
    
      </div>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep } />
      </div>
    </div>
  );
};

export default ContactStep;
