interface ObjectConstructor {
  groupBy<T>(array: T[], callback: (item: T) => string): { [key: string]: T[] }
}
