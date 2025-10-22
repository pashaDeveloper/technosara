import React, { useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import Dropdown from "@/components/shared/dropDown/Dropdown";

import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import {
  useGetIconsQuery,
} from "@/services/icon/iconApi";
const ThumbnailStep = ({
  nextStep,
  errors,
  register,
  thumbnail,
  control,
  setThumbnail,
  watch
}) => {
  const {
    isLoading: fetchingIcons,
    data: fetchIconsData,
    error: fetchIconsError
  } = useGetIconsQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });

  const icons = useMemo(
    () =>
      fetchIconsData?.data?.map((icon) => ({
        id: icon._id,
        value: icon.title,
        icon: icon.symbol,
        about: icon.about
      })),
    [fetchIconsData]
  );
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="profile-container shine-effect rounded-full flex justify-center mb-4">
          {thumbnailPreview ? (
            <img
              src={thumbnailPreview}
              alt="thumbnail"
              height={100}
              width={100}
              className="h-[100px] w-[100px] profile-pic rounded-full"
            />
          ) : (
            <SkeletonImage />
          )}
        </div>
        <label
          htmlFor="thumbnail"
          className="flex flex-col text-center gap-y-2"
        >
          تصویر عنوان دسته بندی
          <ThumbnailUpload
            setThumbnailPreview={setThumbnailPreview}
            setThumbnail={setThumbnail}
            title={"لطفا یک تصویر بند انگشتی انتخاب کنید"}
            maxFiles={1}
            register={register("thumbnail")}
          />
        </label>
        {errors?.thumbnail && (
          <span className="text-red-500 text-sm">
            {errors?.thumbnail.message}
          </span>
        )}
      </div>
      <label
        htmlFor="thumbnail"
        className="flex flex-col text-right gap-y-2"
      >
        آیکون
        <div className="col-span-2">
          <Controller
            control={control}
            name={`icons`}
            defaultValue="icons"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                items={icons}
                placeholder=""
                sendId={true}
                iconOnly={false}
                className="w-full"
                error={errors?.icons}
              />
            )}
          />
        </div>
      </label>
      <div className="flex justify-start mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </>
  );
};

export default ThumbnailStep;
