type IAdjustDayTime = {
  unit: string;
  value: number;
  operator: string;
  date: Date;
};

type IRoundUpDateTime = {
  unit: string;
  date: Date;
};

export const getDateTimeUnit = (element: string): string | undefined => {
  const unitsRegex = /d|M|y|h|m|s|w/g;
  const unitMatches = element.match(unitsRegex);
  return unitMatches !== null ? unitMatches.join("") : undefined;
};

export const adjustDateTime = ({
  unit,
  value,
  operator,
  date,
}: IAdjustDayTime): Date => {
  switch (unit) {
    case "d":
      return new Date(
        date.setUTCDate(date.getUTCDate() + (operator === "+" ? value : -value))
      );
    case "M":
      return new Date(
        date.setUTCMonth(
          date.getUTCMonth() + (operator === "+" ? value : -value)
        )
      );
    case "y":
      return new Date(
        date.setUTCFullYear(
          date.getUTCFullYear() + (operator === "+" ? value : -value)
        )
      );
    case "h":
      return new Date(
        date.setUTCHours(
          date.getUTCHours() + (operator === "+" ? value : -value)
        )
      );
    case "m":
      return new Date(
        date.setUTCMinutes(
          date.getUTCMinutes() + (operator === "+" ? value : -value)
        )
      );
    case "s":
      return new Date(
        date.setUTCSeconds(
          date.getUTCSeconds() + (operator === "+" ? value : -value)
        )
      );
    case "w":
      return new Date(
        date.setUTCDate(
          date.getUTCDate() + (operator === "+" ? value * 7 : -value * 7)
        )
      );
    default:
      return date;
  }
};

export const roundUpDateTime = ({ unit, date }: IRoundUpDateTime): Date => {
  switch (unit) {
    case "d":
      return new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
      );
    case "M":
      return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth()));
    case "y":
      return new Date(Date.UTC(date.getUTCFullYear(), 0));
    case "h":
      return new Date(
        date.setTime(date.getTime() / (1000 * 60 * 60)) * (1000 * 60 * 60)
      );
    case "m":
      return new Date(date.setTime(date.getTime() / (1000 * 60)) * (1000 * 60));
    case "s":
      return new Date(date.setTime(date.getTime() / 1000) * 1000);
    default:
      return date;
  }
};
