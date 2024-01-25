class DataAdapter{
    constructor(dbStoreName, fields, dbName, version) {
        this.name = dbStoreName
        this.version = version
        this.fields = fields
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
            console.table(this.fields)
          	this.fields.forEach(field => store.createIndex(field.name, field.name, {unique : field.unique}) )
        }
		}
		getObjectStore = (store_name, mode) => {
        let tx = this.db.transaction(store_name, mode)
        return tx.objectStore(store_name)
    }
    async saveOne(entry) {
        let obj = new Object()
        this.fields.forEach(field => obj[field.name] = entry[field.name])
        const store = this.getObjectStore(this.name, "readwrite")
        let req = null
        console.dir(obj)
        try {
            req = store.add(obj)
        } catch(error) {
            console.error(error)
            throw error
        }
        req.onsuccess = () => console.log("Added")
        req.onerror = () => console.log("Error adding")
    }
  
}

async function test() {
  	const dbName = "TodoDatabase"
    const fields = [{name:"id", unique : true}, {name:"Col1", unique : false}, {name:"COl2", unique : false}]
    let da = new DataAdapter("My store", fields, dbName, 2)
    let p = new Promise((res, rej) => da.openDB(res, rej))
    await p
    console.log(da.getObjectStore("My store", "readwrite"))
  	da.saveOne({"id" : "1", "Col1" : "Qwertyu", "COl2" : "zxcvbn"})
}
test()
