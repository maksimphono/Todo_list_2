import localstorageWrapper from "./LocalStorageWrapper"

export default class DataAdapter {
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