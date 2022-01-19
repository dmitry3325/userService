export class Mod11 {
  private static weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

  public static validate(accountNumber: string) {
    if (!/^[0-9]*$/.test(accountNumber)) {
      return false;
    }

    if (accountNumber.length !== 11) {
      return false;
    } else {
      const checkDigit = parseInt(accountNumber.charAt(10), 10);
      const withoutCheckDigit = accountNumber.substring(0, 10);
      return checkDigit === Mod11.getControlSumDigit(withoutCheckDigit);
    }
  }

  public static generateRandomSsn(): string {
    const number = `${Mod11.getRandomValue(1, 25)}${Mod11.getRandomValue(1, 12)}${Mod11.getRandomValue(
      80,
      99,
    )}${Mod11.getRandomValue(1001, 9999)}`;
    return `${number}${Mod11.getControlSumDigit(number)}`;
  }

  private static getRandomValue(min: number, max: number): string {
    const number = Math.floor(Math.random() * (max - min) + min);
    if (number < 10) {
      return `0${number}`;
    }

    return number.toString();
  }

  private static getControlSumDigit(number: string): number {
    let sum = 0;
    for (let index = 0; index < 10; index++) {
      sum += parseInt(number.charAt(index), 10) * Mod11.weights[index];
    }
    const digit = sum % 11;
    return digit === 0 ? 0 : 11 - digit;
  }
}
