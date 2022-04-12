export interface ValidationConfig {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(
  value: string | number,
  validationConfig: ValidationConfig
) {
  let isValid = true;
  if (validationConfig.required)
    isValid = isValid && value.toString().trim().length !== 0;
  if (validationConfig.minLength && typeof value === "string")
    isValid = isValid && value.trim().length >= validationConfig.minLength;
  if (validationConfig.maxLength && typeof value === "string")
    isValid = isValid && value.trim().length <= validationConfig.maxLength;
  if (validationConfig.min && typeof value === "number")
    isValid = isValid && value >= validationConfig.min;
  if (validationConfig.max && typeof value === "number")
    isValid = isValid && value <= validationConfig.max;
  return isValid;
}
