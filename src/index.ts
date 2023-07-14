import { adjustDateTime, getDateTimeUnit, roundUpDateTime } from "./helpers";

type DateString = string;

export const parse = (dateString: DateString): Date => {
  const now = new Date();
  let parsedDate = now;
  let operator = "";
  let roundOperator = "";
  let operatorIndex = 0;

  const operatorsRegex = /(\+|\-|\/)/g;
  const dateStringArray = dateString.split(operatorsRegex);

  for (let i = 1; i < dateStringArray.length; i++) {
    const element = dateStringArray[i];

    if (element === "+" || element === "-") {
      operator = element;
      operatorIndex = i;
    }

    if (element === "/") {
      roundOperator = element;
      operatorIndex = i;
    }

    if (operator && i !== operatorIndex) {
      const value = parseInt(element.slice(0, -1));

      if (isNaN(value)) {
        throw new Error("Adjustment value is not a number");
      }

      const unit = getDateTimeUnit(element);

      if (!unit) {
        throw new Error("Wrong date and time unit");
      }

      parsedDate = adjustDateTime({
        unit,
        value,
        operator,
        date: parsedDate,
      });

      operator = "";
      operatorIndex = 0;
    }

    if (roundOperator && i !== operatorIndex) {
      const unit = getDateTimeUnit(element);

      if (!unit) {
        throw new Error("Wrong date and time unit");
      }

      parsedDate = roundUpDateTime({
        unit,
        date: parsedDate,
      });

      roundOperator = "";
      operatorIndex = 0;
    }
  }

  return parsedDate;
};

export const stringify = (date: Date): DateString => {
  const now = new Date();
  let dateQueryString = "now";

  const diff = Math.abs(now.getTime() - date.getTime());

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  let months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor(diff / (1000 * 60 * 60));
  let minutes = Math.floor(diff / (1000 * 60));
  let seconds = Math.floor(diff / 1000);

  const operator = date.getTime() > now.getTime() ? "+" : "-";

  dateQueryString += years !== 0 ? `${operator}${years}y` : "";
  months -= years * 12;

  dateQueryString += months !== 0 ? `${operator}${months}M` : "";
  days = days - years * 365 - months * 31;

  dateQueryString += days !== 0 ? `${operator}${days}d` : "";
  hours = hours - years * 365 * 24 - months * 31 * 24 - days * 24;

  dateQueryString += hours !== 0 ? `${operator}${hours}h` : "";

  minutes =
    minutes -
    years * 365 * 24 * 60 -
    months * 31 * 24 * 60 -
    days * 24 * 60 -
    hours * 60;

  dateQueryString += minutes !== 0 ? `${operator}${minutes}m` : "";
  seconds =
    seconds -
    years * 365 * 24 * 60 * 60 -
    months * 31 * 24 * 60 * 60 -
    days * 24 * 60 * 60 -
    hours * 60 * 60 -
    minutes * 60;

  dateQueryString += seconds !== 0 ? `${operator}${seconds}s` : "";

  return dateQueryString;
};

export const stringifyTwo = (date: Date): DateString => {
  console.log("stringifyTwo");

  const now = new Date();
  const yearDiff = now.getUTCFullYear() - date.getUTCFullYear();
  const monthDiff = now.getUTCMonth() - date.getUTCMonth();
  const dayDiff = now.getUTCDate() - date.getUTCDate();
  const hourDiff = now.getUTCHours() - date.getUTCHours();
  const minuteDiff = now.getUTCMinutes() - date.getUTCMinutes();
  const secondDiff = now.getUTCSeconds() - date.getUTCSeconds();

  const result = "now";

  const yearDiffString = `${yearDiff !== 0 ? `-${yearDiff}y` : ""}`;
  const monthDiffString = `${monthDiff !== 0 ? `-${monthDiff}M` : ""}`;
  const dayDiffString = `${dayDiff !== 0 ? `-${dayDiff}d` : ""}`;
  const hourDiffString = `${hourDiff !== 0 ? `-${hourDiff}h` : ""}`;
  const minuteDiffString = `${minuteDiff !== 0 ? `-${minuteDiff}m` : ""}`;
  const secondDiffString = `${secondDiff !== 0 ? `-${secondDiff}s` : ""}`;

  return (
    result +
    yearDiffString +
    monthDiffString +
    dayDiffString +
    hourDiffString +
    minuteDiffString +
    secondDiffString
  );
};
