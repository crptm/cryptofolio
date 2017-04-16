declare type LocalForage = {
  config(): void,
  getItem<T>(key: string): Promise<T>,
  setItem(key: string, value: any): void
};

declare module "localforage" {
  declare var exports: LocalForage;
}
