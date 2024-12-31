export class CalculatorMemory {
  private static memoryValue: string = '0';

  static store(value: string): void {
    this.memoryValue = value;
  }

  static recall(): string {
    return this.memoryValue;
  }

  static clear(): void {
    this.memoryValue = '0';
  }

  static add(value: string): void {
    const current = parseFloat(this.memoryValue);
    const addend = parseFloat(value);
    this.memoryValue = (current + addend).toString();
  }
}