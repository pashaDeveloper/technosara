// components/signup/steps/NameStep.jsx
import NavigationButton from "@/components/shared/button/NavigationButton";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { Controller } from "react-hook-form";
import Plus from "@/components/icons/Plus";

import { useGetWarrantyCompaniesQuery } from "@/services/warrantyCompany/warrantyCompanyApi";
import { useMemo } from "react";
const TitleStep = ({ register, errors, control, prevStep, nextStep }) => {
  const {
    isLoading: fetchingWarrantyCompanies,
    data: fetchWarrantyCompaniesData,
    error: fetchWarrantyCompaniesError,
    refetch: refetchWarrantyCompanies
  } = useGetWarrantyCompaniesQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });

  const warrantyCompanies = useMemo(
    () =>
      fetchWarrantyCompaniesData?.data?.map((warrantyCompanies) => ({
        id: warrantyCompanies._id,
        value: warrantyCompanies.name_fa,
        label: warrantyCompanies.name_fa,
        description: warrantyCompanies.description
      })) || [],
    [fetchWarrantyCompaniesData]
  );
console.log(warrantyCompanies);
  return (
    <>
      <label htmlFor="title" className="flex flex-col gap-y-1">
        <span className="text-sm">* عنوان </span>
        <input
          type="text"
          name="title"
          id="title"
          {...register("title", {
            required: "وارد کردن عنوان الزامی است",
            minLength: {
              value: 3,
              message: "عنوان باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 30,
              message: "عنوان نباید بیشتر از ۳۰ حرف باشد"
            }
          })}
          placeholder="عنوان"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </label>
      <div className="flex flex-col gap-y-2 w-full  ">
        <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
          <div className="flex flex-col flex-1">
            <label htmlFor="provider" className="flex flex-col gap-y-2 ">
              شرکت بیمه
              <Controller
                control={control}
                name="provider"
                rules={{ required: "انتخاب شرکت بیمه الزامی است" }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    items={warrantyCompanies}
                    selectedItems={value || []}
                    handleSelect={onChange}
                    placeholder="یک مورد انتخاب کنید"
                    className={"w-full h-12"}
                    returnType="id"
                  />
                )}
              />
            </label>
          </div>
          <div className="mt-7 flex justify-start">
            <button
              type="button"
              className="p-2 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
              aria-label="افزودن دسته بندی جدید"
            >
              <Plus className="w-8 h-8" />
            </button>
          </div>
        </div>
        {errors.mainCategory && (
          <span className="text-red-500 text-sm">
            {errors.mainCategory.message}
          </span>
        )}
      </div>
            {/* درصد تخفیف کلی */}
      <label htmlFor="global_discount_percent" className="flex flex-col gap-y-1">
        <span className="text-sm">درصد تخفیف کلی</span>
        <input
          type="number"
          name="global_discount_percent"
          id="global_discount_percent"
          {...register("global_discount_percent", {
            min: { value: 0, message: "مقدار نباید کمتر از 0 باشد" },
            max: { value: 100, message: "مقدار نباید بیشتر از 100 باشد" }
          })}
          placeholder="مثلاً 10"
          className="p-2 rounded border"
        />
        {errors.global_discount_percent && (
          <span className="text-red-500 text-sm">{errors.global_discount_percent.message}</span>
        )}
      </label>

      {/* مدت زمان (ماه) */}
      <label htmlFor="duration_months" className="flex flex-col gap-y-1 mt-3">
        <span className="text-sm">مدت زمان (ماه)</span>
        <input
          type="number"
          name="duration_months"
          id="duration_months"
          {...register("duration_months", {
            required: "مدت زمان الزامی است",
            min: { value: 1, message: "حداقل باید 1 ماه باشد" }
          })}
          placeholder="مثلاً 12"
          className="p-2 rounded border"
        />
        {errors.duration_months && (
          <span className="text-red-500 text-sm">{errors.duration_months.message}</span>
        )}
      </label>

      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default TitleStep;
