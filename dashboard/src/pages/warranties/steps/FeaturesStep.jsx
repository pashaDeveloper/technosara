import ArrayInput from "@/components/shared/tools/ArrayInput";

const FeaturesStep = ({
  control,
  errors,
  register,
  coverage,
  setCoverage,
  exclusions,
  setExclusions,
  refundPolicy,
  setRefundPolicy,
  activationMethod,
  setActivationMethod,
  conditions, // اضافه کردن prop جدید
  setConditions
}) => {
  return (
    <div className="flex flex-col gap-y-4 h-full p-2 max-h-[500px] overflow-y-auto">
      <ArrayInput
        title="چه چیزهایی را شامل می شود؟"
        values={coverage}
        setValues={setCoverage}
        namePrefix="coverage"
        register={register}
        errors={errors}
      />

      <ArrayInput
        title="چه چیزهایی را شامل نمی‌شود؟"
        values={exclusions}
        setValues={setExclusions}
        namePrefix="exclusions"
        register={register}
        errors={errors}
      />
      <ArrayInput
        title="شرایط"
        values={conditions}
        setValues={setConditions}
        namePrefix="conditions"
        register={register}
        errors={errors}
      />
      <ArrayInput
        title="شرایط بازپرداخت "
        values={refundPolicy}
        setValues={setRefundPolicy}
        namePrefix="refund_policy"
        register={register}
        errors={errors}
      />

      <ArrayInput
        title="روش فعال‌سازی "
        values={activationMethod}
        setValues={setActivationMethod}
        namePrefix="activation_method"
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default FeaturesStep;
