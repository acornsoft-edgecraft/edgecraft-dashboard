import * as coreValidators from '@vuelidate/validators'

/**
 * Vuelidate's Validators
 */
export * from '@vuelidate/validators'

/**
 * Custom Validators
 */
export const CIDR = coreValidators.helpers.regex(/^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/);
export const PasswordRequirement = coreValidators.helpers.withMessage(
    () => `The password requires an uppercase, lowercase, number and special character`,
    (value: string) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)
)