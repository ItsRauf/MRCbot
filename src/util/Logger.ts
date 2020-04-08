import * as chalk from 'chalk';

export class Logger {
  public error: (log: string) => void;
  constructor() {
    this.error = this.err;
  }
  info(log: string): void {
    console.log(chalk.blue(log));
  }
  warn(log: string): void {
    console.log(chalk.yellow(log));
  }
  err(log: string): void {
    console.log(chalk.red(log));
  }
}
