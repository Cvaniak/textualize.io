/**
 * This is a very simple and naive in-memory cache.
 * Could be replaced by Redis (♥) at some point, so let's only store JSON-able data there.
 */

type CacheKey = string

const cacheStore = new Map<CacheKey, any>()

const debugMode = { miss: false, hit: false, set: false }

export function enableDebugMode(debug: { miss: boolean; hit: boolean; set: boolean }): void {
    Object.assign(debugMode, debug)
}

export async function has(key: CacheKey): Promise<boolean> {
    return cacheStore.has(key)
}

export async function get<T = any>(key: CacheKey, defaultValue: T | null = null): Promise<T | null> {
    const value = cacheStore.get(key)
    if (value === undefined) {
        debugMode.miss && console.debug(`Cache: MISS for key "${key}"`)
        return defaultValue
    }
    debugMode.hit && console.debug(`Cache: HIT for key "${key}"`)
    return value
}

export async function set<T = any>(key: CacheKey, value: T): Promise<void> {
    debugMode.set && console.debug(`Cache: saving data for key "${key}"`)
    cacheStore.set(key, value)
}

export async function del<T = any>(key: CacheKey): Promise<void> {
    cacheStore.delete(key)
}
