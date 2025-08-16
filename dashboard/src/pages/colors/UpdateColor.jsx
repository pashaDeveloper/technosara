import Button from "@/components/shared/button/Button";
import { useGetColorQuery, useUpdateColorMutation } from "@/services/color/colorApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { useState, useEffect } from "react";
import Edit from "@/components/icons/Edit";
import { useDispatch } from "react-redux";
import { setColor } from "@/features/color/colorSlice"; // اکشن Redux
import { useForm } from "react-hook-form";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
import { HexColorPicker, HexColorInput } from "react-colorful";

const UpdateColor = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setSelectedColor] = useState("#ffffff"); // تغییر نام به setSelectedColor

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError,
  } = useGetColorQuery(id, { skip: !isOpen });
  const [
    updateColor,
    { isLoading: isUpdating, data: updateData, error: updateError },
  ] = useUpdateColorMutation();

  useEffect(() => {
    console.log("fetchData:", fetchData); // برای اشکال‌زدایی
    console.log("setColor (Redux action):", setColor); // برای بررسی اکشن Redux
    if (fetchData?.data) {
      setSelectedColor(fetchData.data.hex_code || "#ffffff"); // استفاده از setSelectedColor
      dispatch(setColor(fetchData.data)); // استفاده از اکشن Redux
      reset({
        title: fetchData.data.title_fa || "",
        status: fetchData.data.status === "active",
      });
    }
  }, [fetchData, dispatch, reset]);

  useEffect(() => {
    if (isUpdating) {
      toast.loading("در حال به‌روزرسانی...", { id: "updateColor" });
    } else {
      toast.dismiss("updateColor");
    }

    if (fetchData) {
      toast.success(fetchData?.description || "داده‌های رنگ دریافت شد", { id: "fetchColor" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message || "خطا در دریافت داده‌ها", { id: "fetchColor" });
    }

    if (updateData) {
      toast.success(updateData?.message || "رنگ با موفقیت به‌روزرسانی شد", { id: "updateColor" });
      setIsOpen(false);
      reset();
      setSelectedColor("#ffffff"); // بازنشانی رنگ
    }

    if (updateError?.data) {
      toast.error(updateError?.data?.message || "خطا در به‌روزرسانی رنگ", { id: "updateColor" });
    }
  }, [fetching, fetchData, fetchError, isUpdating, updateData, updateError, reset]);

  const handleUpdateColor = (data) => {
    const formData = new FormData();
    formData.append("title_fa", data.title);
    formData.append("hex_code", color);
    formData.append("status", data.status ? "active" : "inactive");

    updateColor({ id: id, body: formData });
  };

  return (
    <>
      <span
        type="button"
        disabled={fetching}
        className="edit-button"
        onClick={() => setIsOpen(true)}
      >
        <Edit className="w-5 h-5" />
      </span>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50 p-4 rounded-lg  overflow-y-auto max-h-[80vh]"
        >
          <form
            className="text-sm text-right w-full h-full flex flex-col gap-y-6 p-6"
            onSubmit={handleSubmit(handleUpdateColor)}
          >
            <div className="flex gap-6 flex-col">
              <div className="w-full flex flex-col gap-y-6 p-4 border ">
                {/* عنوان */}
                <label htmlFor="title" className="flex flex-col gap-y-2">
                  <span className="text-sm font-semibold text-gray-700">عنوان*</span>
                  <input
                    type="text"
                    id="title"
                    className="border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="عنوان رنگ را وارد کنید"
                    defaultValue={fetchData?.data?.title_fa || ""}
                    {...register("title", {
                      required: "عنوان الزامی است!",
                      minLength: {
                        value: 3,
                        message: "عنوان باید حداقل ۳ کاراکتر باشد!",
                      },
                      maxLength: {
                        value: 100,
                        message: "عنوان نمی‌تواند بیش از ۱۰۰ کاراکتر باشد!",
                      },
                      pattern: {
                        value: /^[آ-یA-Za-z0-9\s]+$/,
                        message: "عنوان فقط باید شامل حروف فارسی، انگلیسی و عدد باشد!",
                      },
                    })}
                  />
                  {errors.title && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.title.message}
                    </span>
                  )}
                </label>

                {/* انتخابگر رنگ پیشرفته */}
                <div className="flex flex-col gap-y-4">
                  <span className="text-sm font-semibold text-gray-700">انتخاب رنگ*</span>
                  <div className="flex gap-4">
                    {/* انتخابگر رنگ */}
                    <div className="relative">
                      <HexColorPicker
                        color={color}
                        onChange={setSelectedColor} // استفاده از setSelectedColor
                        className="shadow-md rounded-lg"
                      />
                      {/* پیش‌نمایش رنگ */}
                      <div
                        className="w-full h-12 mt-4 rounded-lg border shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    </div>

                    {/* ورودی HEX */}
                    <div className="flex flex-col gap-y-2">
                      <span className="text-xs text-gray-600">کد HEX</span>
                      <HexColorInput
                        color={color}
                        onChange={setSelectedColor} // استفاده از setSelectedColor
                        className="border rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>
                </div>

                {/* وضعیت */}
                <div className="flex flex-row gap-x-2 w-full items-center">
                  <span className="text-sm font-semibold text-gray-700">وضعیت*</span>
                  <StatusSwitch
                    label="وضعیت"
                    id="status"
                    register={register}
                    defaultChecked={fetchData?.data?.status === "active"}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isUpdating}
                className={`py-3 mt-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all ${
                  isUpdating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isUpdating ? "در حال به‌روزرسانی..." : "ویرایش کردن"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UpdateColor;