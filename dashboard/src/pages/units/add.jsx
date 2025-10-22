import React, { useEffect, useState } from "react";
import Button from "@/components/shared/button/Button";
import { useAddUnitMutation } from "@/services/unit/unitApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { useForm } from "react-hook-form";
import AddButton from "../../components/shared/button/AddButton";

const AddUnit = () => {
    const [isOpen, setIsOpen] = useState(false);



  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  const [addUnit, { isLoading: isAdding, data: addData, error: addError }] =
    useAddUnitMutation();

  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال افزودن  برچسب...", { id: "addUnit" });
    }

    if (addData) {
      toast.success(addData?.description, { id: "addUnit" });
setIsOpen(false)    }

    if (addError?.data) {
      toast.error(addError?.data?.description, { id: "addUnit" });
    }
  }, [isAdding, addData, addError]);

  function handleAddUnit(data) {
    const formData = {
      title: data.title,
      symbol: data.symbol,
    };

    addUnit(formData);
  }

  return (
    <>
      <AddButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
            isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50 p-4 rounded-md overflow-y-hidden"
        >
      <form
        className="text-sm w-full h-full flex flex-col gap-y-4 mb-3 p-4 overflow-y-auto"
        onSubmit={handleSubmit(handleAddUnit)}
      >
        <div className="flex gap-4 flex-col">
          <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
            {/* title */}
            <label htmlFor="title" className="w-full flex flex-col gap-y-1">
              <span className="text-sm">عنوان*</span>
              <input
                type="text"
                name="title"
                id="title"
                maxLength="100"
                required
                {...register("title", {
                  required: "عنوان الزامی است",
                  minLength: {
                    value: 3,
                    message: "عنوان باید حداقل ۳ کاراکتر باشد"
                  }
                })}
              />
            </label>
            {/* value */}
            <label htmlFor="symbol" className="w-full flex flex-col gap-y-1">
              <span className="text-sm">نماد*</span>
              <input
                type="text"
                name="symbol"
                id="symbol"
                step="any" // یا step="0.1"
                required
                {...register("symbol", {
                  required: " نماد الزامی است",
                  min: {
                    symbol: 0,
                    message: "نماد نمی‌تواند منفی باشد"
                  },
                })}
              />
            </label>

       
          </div>
          <Button type="submit" className="py-2 mt-4 mb-4 bg-black">
            ایجاد کردن
          </Button>
        </div>
      </form>
    </Modal>
          )}
    </>
  );
};

export default AddUnit;
