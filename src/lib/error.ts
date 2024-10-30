import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export function displayFieldsError<T extends FieldValues>(
  form: UseFormReturn<T>,
  errors: Partial<Record<Path<T>, string | string[]>> | null
) {
  if (errors) {
    for (const key in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        const error = errors[key as Path<T>];
        if (error) {
          const message: string = Array.isArray(error) ? error[0] : error;
          form.setError(key as Path<T>, { message });
        }
      }
    }
  }
}
