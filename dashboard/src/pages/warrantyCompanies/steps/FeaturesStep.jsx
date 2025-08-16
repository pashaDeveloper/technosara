import React from "react";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
import NavigationButton from "@/components/shared/button/NavigationButton";

function FeaturesStep({ register, errors, control, prevStep, nextStep }) {
  return (
    <div className="flex flex-col gap-y-4 h-full p-2">
      <StatusSwitch
        label="آیا این شرکت بین المللی است؟"
        id="is_international"
        register={register}
        defaultChecked={false}
      />

      <StatusSwitch
        label="آیا این شرکت مورد اعتماد است؟"
        id="is_trusted"
        register={register}
        defaultChecked={false}
      />

      <StatusSwitch
        label="آیا این شرکت رسمی است؟"
        id="is_official"
        register={register}
        defaultChecked={false}
      />

      <StatusSwitch
        label="آیا این شرکت جدید است؟"
        id="is_new"
        register={register}
        defaultChecked={false}
      />

      <label htmlFor="solvency_level" className="flex flex-col gap-y-1">
        <span className="text-sm">سطح توانگری مالی (1 تا 5)</span>
        <input
          type="number"
          id="solvency_level"
          min={1}
          max={5}
          step={1}
          placeholder="مثلاً 3"
          className="p-2 rounded border"
          {...register("solvency_level", {
            min: { value: 1, message: "حداقل مقدار 1 است" },
            max: { value: 5, message: "حداکثر مقدار 5 است" }
          })}
        />
        {errors.solvency_level && (
          <span className="text-red-500 text-sm">
            {errors.solvency_level.message}
          </span>
        )}
      </label>

      <label htmlFor="regulatory_body" className="flex flex-col gap-y-1">
        <span className="text-sm">نهاد نظارتی</span>
        <input
          type="text"
          id="regulatory_body"
          placeholder="مثلاً شرکت مرکزی"
          className="p-2 rounded border"
          {...register("regulatory_body")}
        />
        {errors.regulatory_body && (
          <span className="text-red-500 text-sm">
            {errors.regulatory_body.message}
          </span>
        )}
      </label>
      <label htmlFor="license_number" className="flex flex-col gap-y-1">
        <span className="text-sm">شماره مجوز</span>
        <input
          type="text"
          id="license_number"
          placeholder="مثلاً AB12-3456CD"
          className="p-2 rounded border"
          {...register("license_number", {
            pattern: {
              value: /^[A-Z0-9-]{8,12}$/,
              message:
                "شماره مجوز باید ۸ تا ۱۲ کاراکتر شامل حروف بزرگ، اعداد و خط تیره باشد"
            }
          })}
        />
        {errors.license_number && (
          <span className="text-red-500 text-sm">
            {errors.license_number.message}
          </span>
        )}
      </label>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
}

export default FeaturesStep;
