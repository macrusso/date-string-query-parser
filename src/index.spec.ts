import { parse, stringify } from ".";

describe("parse", () => {
  const mockedDate = new Date("2020-05-01T10:23:18.246Z");
  jest.setSystemTime(mockedDate);

  it.each([
    ["now-1y", "2019-05-01T10:23:18.246Z"],
    ["now-1M", "2020-04-01T10:23:18.246Z"],
    ["now-1d", "2020-04-30T10:23:18.246Z"],
    ["now-1h", "2020-05-01T09:23:18.246Z"],
    ["now+1m", "2020-05-01T10:24:18.246Z"],
    ["now+1s", "2020-05-01T10:23:19.246Z"],
  ])("should take %s string then adjust a date", (query, expected) => {
    expect(parse(query).toISOString()).toBe(expected);
  });

  it.each([
    ["now/y", "2020-01-01T00:00:00.000Z"],
    ["now/M", "2020-05-01T00:00:00.000Z"],
    ["now/d", "2020-05-01T00:00:00.000Z"],
    ["now/h", "2020-05-01T10:00:00.000Z"],
    ["now/m", "2020-05-01T10:23:00.000Z"],
    ["now/s", "2020-05-01T10:23:18.000Z"],
  ])("should take %s string then round up a date", (query, expected) => {
    expect(parse(query).toISOString()).toBe(expected);
  });

  it("should take now-1y/y then adjust and round up date", () => {
    expect(parse("now-1y/y").toISOString()).toBe("2019-01-01T00:00:00.000Z");
  });
});

describe("stringify", () => {
  const mockedDate = new Date("2020-05-01T10:23:18.246Z");
  jest.setSystemTime(mockedDate);

  it.each([
    ["2019-05-01T10:23:18.246Z", "now-1y"],
    ["2020-04-01T10:23:18.246Z", "now-1M"],
    ["2020-04-30T10:23:18.246Z", "now-1d"],
    ["2020-05-01T09:23:18.246Z", "now-1h"],
    ["2020-05-01T10:24:18.246Z", "now+1m"],
    ["2020-05-01T10:23:19.246Z", "now+1s"],
  ])(
    "should take %s date then return a date query",
    (dateISOString, expected) => {
      console.log("date", new Date(dateISOString));
      console.log("utc date", new Date(Date.UTC(2019, 4, 1, 10, 23, 18, 246)));
      expect(stringify(new Date(dateISOString))).toBe(expected);
    }
  );
});
