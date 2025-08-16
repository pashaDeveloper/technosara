const { translate } = require("google-translate-api-x");

async function generateSlug(title = "") {
  try {
    const res = await translate(title, { to: "en", client: "gtx" });
    const translatedTitle = res.text;
    return translatedTitle
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .replace(/[\s\ـ]+/g, "-")
      .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  } catch (error) {
    console.error("Error in translation:", error);
    return "";
  }
}
async function translateToEnglish(title = "") {
  try {
    const res = await translate(title, { to: "en", client: "gtx" });
    const translatedTitle = res.text;
    return translatedTitle;
  } catch (error) {
    console.error("Error in translateToEnglish:", error);
    return translatedTitle;
  }
}

function generateSeoFields({
  title = "",
  summary = "",
  categoryTitle = "عمومی"
}) {
  let metaTitle = `${title} | ${categoryTitle}`;
  if (metaTitle.length > 60) metaTitle = metaTitle.substring(0, 57) + "...";

  let metaDescription = `${summary} | ${categoryTitle}`;
  if (metaDescription.length > 160)
    metaDescription = metaDescription.substring(0, 157) + "...";

  return { metaTitle, metaDescription };
}

async function generateTranslationFields(fields, lang) {
  const slug = await generateSlug(fields.title || fields.name || "", lang);
  const { metaTitle, metaDescription } = generateSeoFields({
    title: fields.title || fields.name || "",
    summary: fields.summary || fields.description || "",
    categoryTitle: fields.categoryTitle || "عمومی"
  });

  return {
    slug,
    metaTitle,
    metaDescription,
    translateToEnglish,
    ...fields
  };
}

module.exports = {
  generateSlug,
  generateSeoFields,
  translateToEnglish,
  generateTranslationFields
};
