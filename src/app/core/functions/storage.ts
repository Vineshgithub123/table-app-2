export class StorageService {

  private storage!: Storage;
  
  isPersistent(value: boolean): Storage {
    return (this.storage = value ? localStorage : sessionStorage);
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  getItem(key: string) {
    return this.storage.getItem(key);
  }
}
