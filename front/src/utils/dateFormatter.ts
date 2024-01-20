export default (dateTime: Date) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateTime?.toLocaleDateString("en-US", options);
  return formattedDate;
};
