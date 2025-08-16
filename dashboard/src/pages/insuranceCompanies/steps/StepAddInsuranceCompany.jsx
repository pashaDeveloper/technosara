import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { useForm } from "react-hook-form";
import SendButton from "@/components/shared/button/SendButton";
import { useAddInsuranceCompanyMutation } from "@/services/insuranceCompany/insuranceCompanyApi";
import ThumbnailStep from "./ThumbnailStep";
import StepIndicator from "./StepIndicator";
import TitleStep from "./TitleStep";
import ContactStep from "./ContactStep";
import { useNavigate } from "react-router-dom";
import FeaturesStep from "./FeaturesStep";
import AddressStep from "./AddressStep";

const StepAddInsurance = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [addInsurance, { isLoading, data, error }] = useAddInsuranceCompanyMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});

  const {
    register,
    control,
    formState: { errors },
    trigger,
    handleSubmit,
    watch
  } = useForm({
    mode: "onChange"
  });
  const totalSteps = 5;

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    const formData = new FormData();
    formData.append("logo", thumbnail);
    formData.append("name_fa", data.title);
    formData.append("description", data.description);
    formData.append("is_international", data.is_international);
    formData.append("is_trusted", data.is_trusted);
    formData.append("is_official", data.is_official);
    formData.append("is_new", data.is_new);
    formData.append("solvency_level", data.solvency_level);
    formData.append("regulatory_body", data.regulatory_body);
    formData.append("phone", data.phone);
    formData.append("website", data.website);
    formData.append("license_number", data.license_number);
    formData.append(
      "address",
      JSON.stringify({
        province: data.province,
        city: data.city,
        street: data.street,
        plateNumber: data.plateNumber,
        floor: data.floor,
        unit: data.unit,
        postalCode: data.postalCode
      })
    );

    addInsurance(formData);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن بیمه...", { id: "addInsurance" });
    }

    if (data &&data?.acknowledgement) {
      toast.success(data?.description, { id: "addInsurance" });
      navigate("/insuranceCompanies");
    }
    if (data&&!data?.acknowledgement) {
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
          toast.error("لطفاً عنوان بیمه را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("description");
        if (!valid) {
          toast.error("لطفاً توضیحات بیمه را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
      case 3:
        valid = await trigger("features");
        if (!valid) {
          toast.error("لطفاً ویژگی های بیمه را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
      case 4:
        valid = await trigger("contact");

        if (!valid) {
          toast.error("لطفاً اطلاعات تماس بیمه را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
      case 5:
        valid = await trigger("address");

        if (!valid) {
          toast.error("لطفاً ادرس  بیمه را وارد کنید");
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
          <FeaturesStep
            control={control}
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <ContactStep
            register={register}
            errors={errors}
            control={control}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 5:
        return (
          <AddressStep register={register} errors={errors} control={control} />
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
