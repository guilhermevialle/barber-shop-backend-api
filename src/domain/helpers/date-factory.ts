export class DateFactory {
  private _year?: number;
  private _month?: number;
  private _day?: number;
  private _hour?: number;
  private _minute?: number;
  private _second?: number;
  private _millisecond?: number;

  private constructor() {}

  // Entry points
  static year(year: number): DateFactory {
    return new DateFactory().year(year);
  }

  static month(month: number): DateFactory {
    return new DateFactory().month(month);
  }

  static day(day: number): DateFactory {
    return new DateFactory().day(day);
  }

  static hour(hour: number): DateFactory {
    return new DateFactory().hour(hour);
  }

  static minute(minute: number): DateFactory {
    return new DateFactory().minute(minute);
  }

  static second(second: number): DateFactory {
    return new DateFactory().second(second);
  }

  static millisecond(ms: number): DateFactory {
    return new DateFactory().millisecond(ms);
  }

  // Instance methods (type-safe chaining)
  public year(value: number): this {
    this._year = value;
    return this;
  }

  public month(value: number): this {
    if (value < 1 || value > 12) {
      throw new RangeError("Month must be between 1 and 12");
    }
    this._month = value - 1;
    return this;
  }

  public day(value: number): this {
    if (value < 1 || value > 31) {
      throw new RangeError("Day must be between 1 and 31");
    }
    this._day = value;
    return this;
  }

  public hour(value: number): this {
    if (value < 0 || value > 23) {
      throw new RangeError("Hour must be between 0 and 23");
    }
    this._hour = value;
    return this;
  }

  public minute(value: number): this {
    if (value < 0 || value > 59) {
      throw new RangeError("Minute must be between 0 and 59");
    }
    this._minute = value;
    return this;
  }

  public second(value: number): this {
    if (value < 0 || value > 59) {
      throw new RangeError("Second must be between 0 and 59");
    }
    this._second = value;
    return this;
  }

  public millisecond(value: number): this {
    if (value < 0 || value > 999) {
      throw new RangeError("Millisecond must be between 0 and 999");
    }
    this._millisecond = value;
    return this;
  }

  public build(): Date {
    const now = new Date();

    return new Date(
      this._year ?? now.getFullYear(),
      this._month ?? now.getMonth(),
      this._day ?? now.getDate(),
      this._hour ?? now.getHours(),
      this._minute ?? now.getMinutes(),
      this._second ?? now.getSeconds(),
      this._millisecond ?? now.getMilliseconds()
    );
  }
}
