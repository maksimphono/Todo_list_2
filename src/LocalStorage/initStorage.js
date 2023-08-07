class LocalStorageWrapper {
    constructor(prefixLength) {
        if (!LocalStorageWrapper.instance) {
            LocalStorageWrapper.instance = this
        }
        this.prefixLength = prefixLength
        this._storagePrefix = this.initStorage()
        return LocalStorageWrapper.instance
    }
    initStorage() {
        let storagePrefix = "$$"//LocalStorageWrapper.generateApplicationStoragePrefix(8)

        localStorage.setItem("TodoApplicationStoragePrefix", storagePrefix)

        return storagePrefix
    }
    static generateApplicationStoragePrefix() {
        const symbols = "!@#$%^&*()?><{}:"
        let generatedPrefix = ""
    
        for (let i = 0; i < this.prefixLength; i++) {
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

export class DataAdapter {
    constructor (entryPrefix, idsListName) {
        this._entryPrefix = entryPrefix
        this._idsListName = idsListName
    }
    get(id) {
        return localstorageWrapper.get(`${this._entryPrefix}__${id}`)
    }
    get idsList() {
        return localstorageWrapper.get(this._idsListName) || []
    }
    set idsList(newIdsList) {
        return localstorageWrapper.set(this._idsListName, newIdsList)
    }
    set(entry) {
        return localstorageWrapper.set(`${this._entryPrefix}__${entry.id}`, entry)
    }
    remove(id) {
        return localstorageWrapper.remove(`${this._entryPrefix}__${id}`)
    }
    clearData() {
        const ids = this.idsList

        for (let id of ids) {
            this.remove(id)
        }
        localstorageWrapper.remove(this._idsListName)
    }
    saveMany(entries) {
        const entriesIds = []
    
        for (let record of entries) {
            this.set(record)
            entriesIds.push(record.id)
        }
        this.idsList = entriesIds
    }
    saveOne(entry) {
        const ids = this.idsList

        if (!ids.includes(entry.id)) {
            ids.push(entry.id)
        }
        this.set(entry)
        this.idsList = ids
    }
    loadAll() {
        const ids = this.idsList
        const entries = []

        for (let id of ids) {
            entries.push(this.get(id))
        }

        return entries
    }
    loadMany(ids) {
        const idsList = this.idsList
        const entries = []

        ids.forEach(id => {
            if (idsList.includes(id))
                entries.push(this.get(id))
        })

        return entries
        
    }
    loadOne(id) {
        return this.get(id)
    }
    removeOne(id) {
        let ids = this.idsList

        ids = ids.filter(v => v != id)
        this.idsList = ids
        this.remove(id)
    }
    removeMany(ids) {
        this.idsList = this.idsList.filter(id => !ids.includes(id))

        for (let id of ids) {
            this.remove(id)
        }
    }
}