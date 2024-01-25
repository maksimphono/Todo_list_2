class DataAdapter{
    constructor(dbStoreName, fields, dbName, version) {
        this.name = dbStoreName
        this.version = version
        this.fields = [...fields]
      	this.db = null
      	this.dbName = dbName
    }
    openDB(onOpen, onErr) {
    		let req = indexedDB.open(this.dbName, this.version)
    		req.onsuccess = async event => {
   		 			this.db = await req.result
       			//console.log(this.db)
       			onOpen()
    		}
    		req.onerror = event => onErr()
    		req.onupgradeneeded = event => {
        		let store = event.currentTarget.result.createObjectStore(this.name, {keyPath : "id"})
          	this.fields.forEach(field => store.createIndex(field.name, field.name, {unique : field.unique}) )
        }
		}
		getObjectStore = (store_name, mode) => {
        let tx = this.db.transaction(store_name, mode)
        return tx.objectStore(store_name)
    }
  
}

async function test() {
  	const dbName = "TodoDatabase"
    const fields = [{name:"id", unique : true}, {name:"Col1", unique : false}, {name:"COl2", unique : false}]
    let da = new DataAdapter("My store", fields, dbName, 1)
    let p = new Promise((res, rej) => da.openDB(res, rej))
    await p
    console.log(da.getObjectStore("My store", "readwrite"))
}
test()
