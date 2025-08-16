import React from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";

const Features = ({
  prevStep,
  nextStep,
  features,
  setFeatures,
  register,
  errors
}) => {
  function handleAddFeature() {
    setFeatures([...features, { icon: "", title: "", content: [""] }]);
  }

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  };

  const handleTitleChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index].title = value;
    setFeatures(updatedFeatures);
  };

  const handleAddContent = (featureIndex) => {
    const updatedFeatures = [...features];
    updatedFeatures[featureIndex].content.push("");
    setFeatures(updatedFeatures);
  };

  const handleRemoveContent = (featureIndex, contentIndex) => {
    const updatedFeatures = [...features];
    updatedFeatures[featureIndex].content.splice(contentIndex, 1);
    setFeatures(updatedFeatures);
  };

  const handleContentChange = (featureIndex, contentIndex, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[featureIndex].content[contentIndex] = value;
    setFeatures(updatedFeatures);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-y-4 p-4 border rounded overflow-y-auto max-h-96">
        {features.map((feature, index) => (
          <label
            key={index}
            htmlFor="features"
            className="flex flex-col gap-y-1"
          >
            <span className="text-sm flex flex-row justify-between items-center">
              ویژگی های محصول را وارد کنید*
              <span className="flex flex-row gap-x-1">
                {index > 0 && (
                  <span
                    className="cursor-pointer p-0.5 border rounded-secondary bg-red-500 w-6 h-6 text-white flex justify-center items-center dark:border-gray-700"
                    onClick={() => handleRemoveFeature(index)}
                  >
                    <Minus />
                  </span>
                )}
                {index === features.length - 1 && (
                  <span
                    className="cursor-pointer w-6 h-6 flex justify-center items-center p-0.5 border rounded-secondary bg-green-500 text-white  dark:border-gray-700"
                    onClick={handleAddFeature}
                  >
                    <Plus />
                  </span>
                )}
              </span>
            </span>
            <div className="flex flex-col gap-y-2.5">
              <div className="flex gap-x-2">
                <input
                  type="text"
                  name={`features[${index}].icon`}
                  placeholder="🙂"
                  maxLength="2"
                  value={feature.icon}
                  onChange={(e) => {
                    const updatedFeatures = [...features];
                    updatedFeatures[index].icon = e.target.value;
                    setFeatures(updatedFeatures);
                  }}
                  className="w-12 text-center border rounded p-2"
                />

                <input
                  type="text"
                  name={`features[${index}].title`}
                  placeholder="عنوان ویژگی را وارد کنید"
                  maxLength="100"
                  defaultValue={feature.title}
                  {...register(`features[${index}].title`, {
                    required: "عنوان ویژگی الزامی است",
                    minLength: {
                      value: 3,
                      message: "عنوان باید حداقل ۳ کاراکتر باشد"
                    },
                    maxLength: {
                      value: 100,
                      message: "عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد"
                    }
                  })}
                  className="flex-1 p-2 rounded border"
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                />
              </div>

              {errors?.features?.[index]?.title && (
                <span className="text-red-500 text-sm">
                  {errors.features[index].title.message}
                </span>
              )}

              {feature.content.map((content, contentIndex) => (
                <div
                  key={contentIndex}
                  className="flex flex-row gap-x-2 items-center"
                >
                  <input
                    type="text"
                    name={`features[${index}].content[${contentIndex}]`}
                    placeholder="محتوای ویژگی را وارد کنید"
                    maxLength="200"
                    defaultValue={content} 
                    {...register(
                      `features[${index}].content[${contentIndex}]`,
                      {
                        required: "محتوای ویژگی الزامی است",
                        minLength: {
                          value: 3, 
                          message: "محتوا باید حداقل ۳ کاراکتر باشد"
                        },
                        maxLength: {
                          value: 200, 
                          message: "محتوا نباید بیشتر از ۲۰۰ کاراکتر باشد"
                        }
                      }
                    )}
                    className="flex-1 p-2 rounded border"
                    onChange={
                      (e) =>
                        handleContentChange(index, contentIndex, e.target.value) // تغییرات به روزرسانی در محتوا
                    }
                  />
                  {contentIndex > 0 && (
                    <span
                      className="cursor-pointer p-0.5 border rounded-secondary bg-red-500 w-6 h-6 text-white flex justify-center items-center dark:border-gray-700"
                      onClick={() => handleRemoveContent(index, contentIndex)}
                    >
                      <Minus />
                    </span>
                  )}
                  <span
                    className="cursor-pointer w-6 h-6 flex justify-center items-center p-0.5 border rounded-secondary bg-green-500 text-white  dark:border-gray-700"
                    onClick={() => handleAddContent(index)}
                  >
                    <Plus />
                  </span>
                </div>
              ))}
            </div>
          </label>
        ))}
      </div>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Features;
