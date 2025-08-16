import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { useForm } from "react-hook-form";
import SendButton from "@/components/shared/button/SendButton";
import { useAddInsuranceMutation } from "@/services/insurance/insuranceApi";
import StepIndicator from "./StepIndicator";
import TitleStep from "./TitleStep";
import TagsStep from "./FeaturesStep";
import { useNavigate } from "react-router-dom";

const StepAddInsurance = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [addInsurance, { isLoading, data, error }] = useAddInsuranceMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});

  const [coverage, setCoverage] = useState([""]);
  const [exclusions, setExclusions] = useState([""]);
  const [refundPolicy, setRefundPolicy] = useState([""]);
  const [activationMethod, setActivationMethod] = useState([""]);
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
  const totalSteps = 2;

  const onSubmit = async (data) => {
    const formData = new FormData();
console.log(data);
    formData.append(
      "global_discount_percent",
      data.global_discount_percent ?? 0
    );
    formData.append("provider", data.provider.id); 

    formData.append("duration_months", data.duration_months ?? 0);
    formData.append("coverage", JSON.stringify(coverage));
    formData.append("exclusions", JSON.stringify(exclusions));
    formData.append("refund_policy", JSON.stringify(refundPolicy));
    formData.append("activation_method", JSON.stringify(activationMethod));
    formData.append("title_fa", data.title);
    addInsurance(formData);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن دسته بندی...", { id: "addInsurance" });
    }

    if (data &&data?.acknowledgement) {
      toast.success(data?.description, { id: "addInsurance" });
      navigate("/insurancies");
    }
    if (data &&!data?.acknowledgement) {
      toast.error(data?.description, { id: "addInsurance" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "addInsurance" });
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
          <TitleStep
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
          />
        );

      case 2:
        return (
          <TagsStep
            coverage={coverage}
            setCoverage={setCoverage}
            exclusions={exclusions}
            setExclusions={setExclusions}
            refundPolicy={refundPolicy}
            setRefundPolicy={setRefundPolicy}
            activationMethod={activationMethod}
            setActivationMethod={setActivationMethod}
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

export default StepAddInsurance;
