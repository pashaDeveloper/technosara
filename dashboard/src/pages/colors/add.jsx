import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddColorMutation } from "@/services/color/colorApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { useState, useEffect } from "react";
import AddButton from "@/components/shared/button/AddButton";
import { HexColorPicker, HexColorInput } from "react-colorful";

const AddColor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("#ffffff"); // رنگ پیش‌فرض
  const [colorHistory, setColorHistory] = useState([]); // تاریخچه رنگ‌ها

  const [addColor, { isLoading: isAdding, data: addData, error: addError }] =
    useAddColorMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال افزودن رنگ...", { id: "addColor" });
    }

    if (addData&&addData?.acknowledgement) {
      toast.success(addData?.description || "رنگ با موفقیت اضافه شد", {
        id: "addColor",
      });
      setColorHistory((prev) => [color, ...prev.slice(0, 4)]); 
      setIsOpen(false);
      reset();
      setColor("#ffffff"); 
    }
    if (addData&&!addData?.acknowledgement) {
          toast.error(addData?.description , {
        id: "addColor",
      });
    }
    if (addError?.data) {
      toast.error(addError?.data?.description || "خطا در افزودن رنگ", {
        id: "addColor",
      });
    }
  }, [isAdding, addData, addError, reset, color]);

  const onSubmit = (formData) => {
    const formattedData = {
      title_fa: formData.title,
      hex_code: color,
    };
    addColor(formattedData);
  };

  const handleHistoryClick = (selectedColor) => {
    setColor(selectedColor);
  };

  return (
    <>
      <AddButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50 h-fit max-h-[80vh] overflow-y-auto"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-6 p-6  rounded-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-6 flex-col">
              {/* عنوان */}
              <label htmlFor="title" className="flex flex-col gap-y-2">
                <span className="text-sm font-semibold text-gray-700">عنوان*</span>
                <input
                  type="text"
                  id="title"
                  className="border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="عنوان رنگ را وارد کنید"
                  {...register("title", {
                    required: "وارد کردن عنوان الزامی است",
                    minLength: { value: 3, message: "حداقل ۳ کاراکتر" },
                    maxLength: { value: 70, message: "حداکثر ۷۰ کاراکتر" },
                  })}
                />
                {errors.title && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.title.message}
                  </span>
                )}
              </label>

              {/* انتخابگر رنگ پیشرفته */}
              <div className="flex flex-col gap-y-4">
                <span className="text-sm font-semibold text-gray-700">
                  انتخاب رنگ*
                </span>
                <div className="flex gap-4">
                  {/* انتخابگر رنگ */}
                  <div className="relative">
                    <HexColorPicker
                      color={color}
                      onChange={setColor}
                      className="shadow-md rounded-lg"
                    />
                    {/* پیش‌نمایش رنگ */}
                    <div
                      className="w-full h-12 mt-4 rounded-lg border shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  </div>

                  {/* ورودی HEX و تاریخچه */}
                  <div className="flex flex-col gap-y-4">
                    <div>
                      <span className="text-xs text-gray-600">کد HEX</span>
                      <HexColorInput
                        color={color}
                        onChange={setColor}
                        className="border rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="#ffffff"
                      />
                      {errors.hex_code && (
                        <span className="text-xs text-red-500 mt-1">
                          {errors.hex_code.message}
                        </span>
                      )}
                    </div>

                    {/* تاریخچه رنگ‌ها */}
                    {colorHistory.length > 0 && (
                      <div className="flex flex-col gap-y-2">
                        <span className="text-xs text-gray-600">
                          تاریخچه رنگ‌ها
                        </span>
                        <div className="flex gap-2 flex-wrap">
                          {colorHistory.map((histColor, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded-full border cursor-pointer hover:scale-110 transition-transform"
                              style={{ backgroundColor: histColor }}
                              onClick={() => handleHistoryClick(histColor)}
                              title={histColor}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* دکمه ارسال */}
              <Button
                type="submit"
                disabled={isAdding}
                className={` py-3 ${
                  isAdding ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isAdding ? "در حال پردازش..." : "ایجاد کردن"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddColor;