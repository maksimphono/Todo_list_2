function generateApplicationStoragePrefix(prefixLength) {
    const symbols = "!@#$%^&*()?><{}:"
    let generatedPrefix = ""

    for (let i = 0; i < prefixLength; i++) {
        result += symbols.charAt(Math.floor(Math.random() * symbols.length))
    }
    return generatedPrefix
}

function getStoragePrefix() {
    if (localStorage.getItem("TodoApplicationStoragePrefix") != null) {
        return localStorage.getItem("TodoApplicationStoragePrefix")
    } else {
        return initStorage()
    }
}

const storageInitialState = {
    "todo_records_ids" : [],
    "todo_collections_ids" : []
}

function localStorageGet(storagePrefix, key) {
    return JSON.parse(localStorage.getItem(`${storagePrefix}__${key}`))
}

function localStorageSet(storagePrefix, key, value) {
    return localStorage.setItem(`${storagePrefix}__${key}`, JSON.stringify(value))
}


export function initStorage() {
    let storagePrefix = ""

    storagePrefix = "$$"//generateApplicationStoragePrefix(8)
    localStorage.setItem("TodoApplicationStoragePrefix", storagePrefix)

    for (let field in storageInitialState) {
        localStorage.setItem(`${storagePrefix}__${field}`, JSON.stringify(storageInitialState[field]))
    }

    return storagePrefix
}

export function clearStorage() {
    const storagePrefix = getStoragePrefix()
    const todoRecordsIds = localStorageGet(storagePrefix, "todo_records_ids")
    const todoCollectionsIds = localStorageGet(storagePrefix, "todo_collections_ids")
    localStorage.removeItem("TodoApplicationStoragePrefix")

    for (let field in storageInitialState) {
        localStorage.removeItem(`${storagePrefix}__${field}`)
    }
    for (let id of todoRecordsIds) {
        localStorage.removeItem(`${storagePrefix}__todo_record__${id}`)
    }
    for (let id of todoCollectionsIds) {
        localStorage.removeItem(`${storagePrefix}__collection_record__${id}`)
    }
    localStorage.removeItem("todo_records_ids")
    localStorage.removeItem("todo_collections_ids")
}

export function saveTodoRecords(todoRecords) {
    const todoRecordsIds = []
    let storagePrefix = getStoragePrefix();

    for (let record of todoRecords) {
        localStorageSet(storagePrefix + "__todo_record", record.id, record)
        todoRecordsIds.push(record.id)
    }
    localStorageSet(storagePrefix, "todo_records_ids", todoRecordsIds)
}

export function loadTodoRecords() {
    let storagePrefix = getStoragePrefix() + "__todo_record"

    const todoRecordsIds = localStorageGet(storagePrefix, "todo_records_ids")
    const todoRecords = []
    //const todoCollectionsIds = JSON.parse(localStorage.getItem("todo_collections_ids"))

    for (let todoRecordId of todoRecordsIds) {
        todoRecords.push(localStorageGet(storagePrefix, todoRecordId))
    }

    return todoRecords
}

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
    let prefix = getStoragePrefix() + "__collection_record";

    if (localStorage.getItem("TodoApplicationStoragePrefix") == null) {
        prefix = initStorage()
        return
    } else {
        prefix = localStorage.getItem("TodoApplicationStoragePrefix")
    }

    const todoCollectionsIds = localStorageGet(prefix, "todo_collections_ids")
    const todoCollections = []
 
    for (let todoCollectionId of todoCollectionsIds) {
        todoCollections.push(localStorageGet(prefix, todoCollectionId))
    }

    return todoRecords
}