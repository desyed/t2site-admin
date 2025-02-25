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

export function handleServerErrors<T extends FieldValues>(
  form: UseFormReturn<T>,
  serverErrors: { path: string[]; message: string }[]
) {
  if (serverErrors) {
    const fieldErrors: Record<Path<T>, string> = {} as Record<Path<T>, string>;
    for (const error of serverErrors) {
      if (error.path && error.path.length > 0) {
        const fieldName = error.path[0] as Path<T>;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = error.message;
        }
      }
    }
    for (const [key, message] of Object.entries(fieldErrors)) {
      if (typeof message === 'string') {
        form.setError(key as Path<T>, { message });
      }
    }
  }
}
