const today = new Date();
export const day = today.getDate();
export const month = today.getMonth();
export const year = today.getFullYear();

export const addMinutes = (min: number): Date => {
  const date = new Date();
  const newDate = date.setMinutes(date.getMinutes() + min);
  return new Date(newDate);
};
