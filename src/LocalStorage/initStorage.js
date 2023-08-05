class LocalStorageWrapper {
    constructor(prefixLength) {
        if (!LocalStorageWrapper.instance) {
            LocalStorageWrapper.instance = this
        }
        this.storageInitialState = {
            "todo_records_ids" : [],
            "todo_collections_ids" : []
        }
        this.prefixLength = prefixLength
        this.storagePrefix = this.initStorage()
        return LocalStorageWrapper.instance
    }
    initStorage() {
        let storagePrefix = ""
    
        storagePrefix = "$$"//this.generateApplicationStoragePrefix(8)
        localStorage.setItem("TodoApplicationStoragePrefix", storagePrefix)
    
        for (let field in this.storageInitialState) {
            localStorage.setItem(`${storagePrefix}__${field}`, JSON.stringify(this.storageInitialState[field]))
        }
    
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
    clear() {
        const todoRecordsIds = this.get(this.storagePrefix, "todo_records_ids")
        const todoCollectionsIds = this.get(this.storagePrefix, "todo_collections_ids")
        localStorage.removeItem("TodoApplicationStoragePrefix")
    
        for (let field in this.storageInitialState) {
            localStorage.removeItem(`${this.storagePrefix}__${field}`)
        }
        for (let id of todoRecordsIds) {
            localStorage.removeItem(`${this.storagePrefix}__todo_record__${id}`)
        }
        for (let id of todoCollectionsIds) {
            localStorage.removeItem(`${this.storagePrefix}__collection_record__${id}`)
        }
        localStorage.removeItem("todo_records_ids")
        localStorage.removeItem("todo_collections_ids")
    }
}

const localstorageWrapper = new LocalStorageWrapper(8)
export default localstorageWrapper

class TodoRecordsDataAdapter {
    constructor (entryPrefix, idsListName) {
        if (!TodoRecordsDataAdapter.instance) {
            TodoRecordsDataAdapter.instance = this
        }
        this.entryPrefix = entryPrefix
        this.idsListName = idsListName
        return TodoRecordsDataAdapter.instance
    }
    saveTodoRecords(todoRecords) {
        const todoRecordsIds = []
    
        for (let record of todoRecords) {
            localstorageWrapper.set(`${this.entryPrefix}__${record.id}`, record)
            todoRecordsIds.push(record.id)
        }
        localstorageWrapper.set(this.idsListName, todoRecordsIds)
    }
    loadTodoRecords() {
        const todoRecordsIds = localstorageWrapper.get(this.idsListName)
        console.dir(todoRecordsIds)
        const todoRecords = []

        for (let todoRecordId of todoRecordsIds) {
            todoRecords.push(localstorageWrapper.get(`${this.entryPrefix}__${todoRecordId}`))
        }

        return todoRecords
    }
}

export const todoRecordsDataAdapter = new TodoRecordsDataAdapter("todo_record", "todo_records_ids")


export function saveTodoCollections(todoCollections) {
    const todoCollectionsIds = []
    let prefix = getStoragePrefix()

    for (let record of todoCollections) {
        localStorageSet(prefix + "__collection_record", record.id, record)
        todoCollectionsIds.push(record.id)
    }
    localStorageSet(prefix, "todo_collections_ids", todoCollectionsIds)
}

export function loadTodoCollections() {
    let prefix = getStoragePrefix();

    if (localStorage.getItem("TodoApplicationStoragePrefix") == null) {
        prefix = initStorage()
        return
    } else {
        prefix = localStorage.getItem("TodoApplicationStoragePrefix")
    }

    const todoCollectionsIds = localStorageGet(prefix, "todo_collections_ids") || []
    const todoCollections = []
 
    for (let todoCollectionId of todoCollectionsIds) {
        todoCollections.push(localStorageGet(prefix + "__collection_record", todoCollectionId))
    }

    return todoCollections
}