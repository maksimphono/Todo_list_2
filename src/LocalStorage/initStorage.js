class LocalStorageWrapper {
    constructor(prefixLength) {
        if (!LocalStorageWrapper.instance) {
            LocalStorageWrapper.instance = this
        }
        this.prefixLength = prefixLength
        this.storagePrefix = this.initStorage()
        return LocalStorageWrapper.instance
    }
    initStorage() {
        let storagePrefix = ""
    
        storagePrefix = "$$"//this.generateApplicationStoragePrefix(8)
        localStorage.setItem("TodoApplicationStoragePrefix", storagePrefix)

        return storagePrefix
    }
    generateApplicationStoragePrefix() {
        const symbols = "!@#$%^&*()?><{}:"
        let generatedPrefix = ""
    
        for (let i = 0; i < this.prefixLength; i++) {
            result += symbols.charAt(Math.floor(Math.random() * symbols.length))
        }
        return generatedPrefix
    }
    getStoragePrefix() {
        if (localStorage.getItem("TodoApplicationStoragePrefix") != null) {
            return localStorage.getItem("TodoApplicationStoragePrefix")
        } else {
            return this.initStorage()
        }
    }
    get(key) {
        return JSON.parse(localStorage.getItem(`${this.storagePrefix}__${key}`)) || []
    }
    set(key, value) {
        return localStorage.setItem(`${this.storagePrefix}__${key}`, JSON.stringify(value))
    }
    remove(key) {
        localStorage.removeItem(`${this.storagePrefix}__${key}`)
    }
    clear() {
        localStorage.removeItem("TodoApplicationStoragePrefix")
    }
}

const localstorageWrapper = new LocalStorageWrapper(8)
export default localstorageWrapper

class DataAdapter {
    constructor (entryPrefix, idsListName) {
        this.entryPrefix = entryPrefix
        this.idsListName = idsListName
    }
    clearData() {
        const ids = localstorageWrapper.get(this.idsListName)

        for (let id of ids) {
            localstorageWrapper.remove(`${this.entryPrefix}__${id}`)
        }
        localstorageWrapper.remove(this.idsListName)
    }
    saveMany(entries) {
        const entriesIds = []
    
        for (let record of entries) {
            localstorageWrapper.set(`${this.entryPrefix}__${record.id}`, record)
            entriesIds.push(record.id)
        }
        localstorageWrapper.set(this.idsListName, entriesIds)
    }
    saveOne(entry) {
        const ids = localstorageWrapper.get(this.idsListName) || []

        console.log("Save")
        console.dir(entry)
        if (!ids.includes(entry.id)) {
            ids.push(entry.id)
        }
        localstorageWrapper.set(`${this.entryPrefix}__${entry.id}`, entry)
        localstorageWrapper.set(this.idsListName, ids)
    }
    loadMany() {
        const entriesIds = localstorageWrapper.get(this.idsListName)
        const entries = []

        for (let todoRecordId of entriesIds) {
            entries.push(localstorageWrapper.get(`${this.entryPrefix}__${todoRecordId}`))
        }

        return entries
    }
    loadOne(id) {
        return localstorageWrapper.get(`${this.entryPrefix}__${id}`)
    }
    removeOne(id) {
        let ids = localstorageWrapper.get(this.idsListName)

        ids = ids.filter(v => v != id)
        localstorageWrapper.set(this.idsListName, ids)
        localstorageWrapper.remove(`${this.entryPrefix}__${id}`)
    }
    removeMany(ids) {
        let idsToStore = localstorageWrapper.get(this.idsListName).filter(id => !ids.includes(id))

        for (let id of ids) {
            localstorageWrapper.remove(`${this.entryPrefix}__${id}`)
        }
        localstorageWrapper.set(this.idsListName, idsToStore)
    }
}

export const todoRecordsDataAdapter = new DataAdapter("todo_record", "todo_records_ids")
export const todoCollectionsDataAdapter = new DataAdapter("todo_collection", "todo_collections_ids")