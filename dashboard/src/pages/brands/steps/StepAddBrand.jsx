import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { useForm } from "react-hook-form";
import SendButton from "@/components/shared/button/SendButton";
import { useAddBrandMutation } from "@/services/brand/brandApi";
import ThumbnailStep from "./ThumbnailStep";
import StepIndicator from "./StepIndicator";
import TitleStep from "./TitleStep";
import TagsStep from "./TagsStep";
import { useNavigate } from "react-router-dom";

const StepAddBrand = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [addBrand, { isLoading, data, error }] = useAddBrandMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});
  const [tags, setTags] = useState([""]);
  const [keynotes, setKeynotes] = useState([""]);

  const {
    register,
    setValue,
    reset,
    control,
    formState: { errors },
    trigger,
    handleSubmit,
    watch
  } = useForm({
    mode: "onChange"
  });
  const totalSteps = 3;

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const selectedTags = data.tags.map((tag) => tag.id);

    const formData = new FormData();
    formData.append("logo", thumbnail);
    formData.append("tags", JSON.stringify(selectedTags));
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("is_international", data.isInternational);
    formData.append("is_premium", data.is_premium);
    formData.append("is_miscellaneous", data.is_miscellaneous);
    formData.append("is_name_similar:", data.is_name_similar);

    addBrand(formData);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن دسته بندی...", { id: "addBrand" });
    }

    if (data?.acknowledgement) {
      toast.success(data?.description, { id: "addBrand" });
      navigate("/brands");
    }
    if (data?.acknowledgement) {
      toast.error(data?.description, { id: "addBrand" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "addBrand" });
    }
  }, [isLoading, data, error]);

  const nextStep = async () => {
    let valid = false;
    switch (currentStep) {
      case 1:
        valid = await trigger("thumbnail");
        if (!valid) {
          toast.error("لطفاً تصویر بند انگشتی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 2:
        valid = await trigger("title");
        if (!valid) {
          toast.error("لطفاً عنوان دسته بندی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("description");
        if (!valid) {
          toast.error("لطفاً توضیحات دسته بندی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;

      default:
        break;
    }

    if (valid) {
      setCompletedSteps((prev) => ({ ...prev, [currentStep]: true }));
      setInvalidSteps((prev) => ({ ...prev, [currentStep]: false }));
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };
  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <ThumbnailStep
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            nextStep={nextStep}
            register={register}
            watch={watch}
            errors={errors.thumbnail}
          />
        );
      case 2:
        return (
          <TitleStep
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );

      case 3:
        return (
          <TagsStep
            tags={tags}
            setTags={setTags}
            register={register}
            errors={errors}
            control={control}
          />
        );

      default:
        return null;
    }
  };
  const handleStepClick = async (step) => {
    if (step < currentStep) {
      setCurrentStep(step);
    } else if (step > currentStep) {
      let canProceed = true;
      for (let i = 1; i < step; i++) {
        if (!completedSteps[i]) {
          canProceed = false;
          toast.error(`لطفاً ابتدا مرحله ${i} را تکمیل کنید.`);
          setCurrentStep(i);
          break;
        }
      }
      if (canProceed) {
        setCurrentStep(step);
      }
    }
  };

  return (
    <form
      action=""
      className="w-full max-w-xl  flex flex-col gap-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        onStepClick={handleStepClick}
        completedSteps={completedSteps}
        invalidSteps={invalidSteps}
      />

      {renderStepContent(currentStep)}

      {currentStep === totalSteps && (
        <div className="flex justify-between mt-12">
          <SendButton />
          <NavigationButton direction="prev" onClick={prevStep} />
        </div>
      )}
    </form>
  );
};

export default StepAddBrand;
