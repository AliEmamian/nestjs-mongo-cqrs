export const queryString = (
  objectParams: Record<string, any> = {},
  prefix = '?',
): string => {
  if (!Object.keys(objectParams)?.length) return '';
  else {
    return (
      prefix +
      Object.keys(objectParams)
        .map((key: string) => `${key}=${objectParams[key]}`)
        .join('&')
    );
  }
};
