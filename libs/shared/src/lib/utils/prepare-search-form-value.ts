export const prepareSearchFormValue = (formValue: Record<string, string | string[] | null>) => {
  return Object.entries(formValue)
    .filter(([_, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return (value && value.length > 2);
    })
    .reduce((summaryFilters, [key, value]) => {
      return {
        ...summaryFilters,
        [key]: value,
      };
    }, {} as Record<string, string | string[] | null>);
}
