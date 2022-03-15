class LocalStorageWrapper {
  constructor(key, jsonParse = false) {
    this.storageKey = key
    this.jsonParse = jsonParse
  }

  get() {
    const value = localStorage.getItem(this.storageKey)
    return this.jsonParse ? JSON.parse(value) : value
  }

  set(value) {
    localStorage.setItem(
      this.storageKey,
      this.jsonParse ? JSON.stringify(value) : value
    )
  }

  clear() {
    localStorage.removeItem(this.storageKey)
  }
}

export default LocalStorageWrapper
