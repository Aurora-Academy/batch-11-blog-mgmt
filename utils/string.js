const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");

const generateSlug = (text) => {
  const data = String(text);
  const result = slugify(data, {
    lower: true,
  });
  return result.concat("-", uuidv4());
};

module.exports = { generateSlug };
