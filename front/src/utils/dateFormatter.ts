export default (dateTime: string) => {
  const dateObject = new Date(dateTime);
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return formattedDate;
};
