import * as coreValidators from "@vuelidate/validators";

/**
 * Vuelidate's Validators
 */
export * from "@vuelidate/validators";

/**
 * Custom Validators
 */
export const CIDR = coreValidators.helpers.withMessage(
  () => "This field type is mismatched. (e.g. 10.244.0.0/16)",
  (value: string) => /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/.test(value)
);
export const PasswordRequirement = coreValidators.helpers.withMessage(
  () => `The password requires an uppercase, lowercase, number and special character`,
  (value: string) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)
);
