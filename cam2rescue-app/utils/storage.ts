// utils/storage.ts
export const SafeStorage = {
  set(key, value) {
    if (process.client) localStorage.setItem(key, JSON.stringify(value))
  },
  get(key) {
    if (!process.client) return null
    const value = localStorage.getItem(key)
    try {
      return value && value !== 'undefined' ? JSON.parse(value) : null
    } catch {
      return null
    }
  },
  remove(key) {
    if (process.client) localStorage.removeItem(key)
  }
}
