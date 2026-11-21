
export const validateColor = (value) => {
  const hexPattern = /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  if (!value || !hexPattern.test(value.trim())) {
    return "Please enter a valid HEX color (e.g. #BC4717).";
  }

  return true;
};
