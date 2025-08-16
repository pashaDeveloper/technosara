import { useEffect, useMemo } from "react";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import { useGetTagsQuery } from "@/services/tag/tagApi";
import Tag from "@/components/icons/Tag";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import Plus from "@/components/icons/Plus";
import { Controller } from "react-hook-form";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import StatusSwitch from "@/components/shared/button/StatusSwitch";

import { toast } from "react-hot-toast";

const TagsStep = ({ control, errors, register }) => {
  const {
    isLoading: fetchingTags,
    data: fetchTagsData,
    error: fetchTagsError
  } = useGetTagsQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });

  const {
    isLoading: fetchingCategories,
    data: fetchCategoriesData,
    error: fetchCategoriesError
  } = useGetCategoriesQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });
  const categories = useMemo(
    () =>
      fetchCategoriesData?.data?.map((category) => ({
        id: category._id,
        value: category.title,
        label: category.title,
        icon: category.icon
      })) || [],
    [fetchCategoriesData]
  );

  const tags = useMemo(
    () =>
      fetchTagsData?.data?.map((tag) => ({
        id: tag._id,
        value: tag.title,
        label: tag.title,
        about: tag.about
      })),
    [fetchTagsData]
  );

  useEffect(() => {
    if (fetchingTags) {
      toast.loading("در حال دریافت تگ ها بندی ...", { id: "fetchTags" });
    }

    if (fetchTagsData) {
      toast.success(fetchTagsData?.about, {
        id: "fetchTags"
      });
    }

    if (fetchTagsError) {
      toast.error(fetchTagsError?.data?.about, {
        id: "fetchTags"
      });
    }
    if (fetchingCategories) {
      toast.loading("در حال دریافت دسته بندی ...", { id: "fetchCategories" });
    }

    if (fetchCategoriesData) {
      toast.success(fetchCategoriesData?.about, {
        id: "fetchCategories"
      });
    }

    if (fetchCategoriesError) {
      toast.error(fetchCategoriesError?.data?.about, {
        id: "fetchCategories"
      });
    }
  }, [
    fetchingTags,
    fetchTagsData,
    fetchTagsError,
    fetchCategoriesData,
    fetchCategoriesData,
    fetchCategoriesError
  ]);
  return (
    <div>
      <div className="flex flex-col gap-y-4 h-full p-2">
        <label htmlFor="url" className="flex flex-col gap-y-1">
          <span className="text-sm">* لینک </span>
          <input
            type="text"
            name="url"
            id="url"
            placeholder="لینک"
            className="p-2 rounded border"
            {...register("url", {
              required: "وارد کردن لینک الزامی است",
              minLength: {
                value: 3,
                message: "لینک باید حداقل ۳ حرف داشته باشد"
              },
              maxLength: {
                value: 30,
                message: "لینک نباید بیشتر از ۳۰ حرف باشد"
              }
            })}
            maxLength={30} // مطابق با maxLength در register
          />
          {errors.url && (
            <span className="text-red-500 text-sm">{errors.url.message}</span>
          )}
        </label>

        <div className="flex flex-col gap-y-2 w-full  ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="tags" className="flex flex-col gap-y-2 ">
                <span className="text-sm"> تگ ها</span>
                <Controller
                  control={control}
                  name="tags"
                  rules={{ required: "انتخاب تگ الزامی است" }}
                  render={({ field: { onChange, value } }) => (
                    <MultiSelect
                      items={tags}
                      selectedItems={value || []}
                      handleSelect={onChange}
                      icon={<Tag />}
                      placeholder="چند مورد انتخاب کنید"
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
                aria-label="افزودن تگ جدید"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>
          </div>
          {errors.tags && (
            <span className="text-red-500 text-sm">{errors.tags.message}</span>
          )}
        </div>

        <StatusSwitch
          label={"آیا این برند بین المللی  است؟"}
          id="is_international"
          register={register}
          defaultChecked={false}
        />

        <StatusSwitch
          label="آیا این برند نام مشابه دارد؟"
          id="is_name_similar"
          register={register}
          defaultChecked={false}
        />

        <StatusSwitch
          label="آیا این برند پرمیوم است؟"
          id="is_premium"
          register={register}
          defaultChecked={false}
        />

        <StatusSwitch
          label="آیا  این برند متفرقه است؟"
          id="is_miscellaneous"
          register={register}
          defaultChecked={false}
        />
      </div>
    </div>
  );
};

export default TagsStep;
