class LocalStorageWrapper {
    constructor(prefixLength) {
        if (!LocalStorageWrapper.instance) {
            LocalStorageWrapper.instance = this
        }
        this._prefixLength = prefixLength
        this._storagePrefix = this.initStorage()
        return LocalStorageWrapper.instance
    }
    initStorage() {
        let storagePrefix = "$$"//LocalStorageWrapper.generateApplicationStoragePrefix(8)

        localStorage.setItem("TodoApplicationStoragePrefix", storagePrefix)

        return storagePrefix
    }
    static generateApplicationStoragePrefix(prefixLength) {
        const symbols = "!@#$%^&*()?><{}:"
        let generatedPrefix = ""
    
        for (let i = 0; i < prefixLength; i++) {
            result += symbols.charAt(Math.floor(Math.random() * symbols.length))
        }
        return generatedPrefix
    }
    get storagePrefix() {
        if (localStorage.getItem("TodoApplicationStoragePrefix") != null) {
            return localStorage.getItem("TodoApplicationStoragePrefix")
        } else {
            return this.initStorage()
        }
    }
    get(key) {
        return JSON.parse(localStorage.getItem(`${this._storagePrefix}__${key}`)) || []
    }
    set(key, value) {
        return localStorage.setItem(`${this._storagePrefix}__${key}`, JSON.stringify(value))
    }
    remove(key) {
        localStorage.removeItem(`${this._storagePrefix}__${key}`)
    }
    clear() {
        localStorage.removeItem("TodoApplicationStoragePrefix")
    }
}

const localstorageWrapper = new LocalStorageWrapper(8)
export default localstorageWrapper