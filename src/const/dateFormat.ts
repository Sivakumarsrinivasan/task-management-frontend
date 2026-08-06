//  Convert normal format in to ust format before send to api

export const convertUsFormat = (date:any) =>{
    return new Date(date)
  .toISOString()
  .slice(0, 19)
  .replace("T", " ")
}

//  cONVERT ust in to normal format when we get data from api
 export const convertDateTime = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });

//  Here we change the structure because we need to set that in input field
  export  const formatForDateTimeInput = (utcDate: string) => {
  const date = new Date(utcDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};