class DataAdapter{
    constructor(dbName, version) {
        this.name = dbName
        this.version = version
        this.db = null
    }
    openDB(onOpen, onErr) {
        let req = indexedDB.open(this.name, this.version)
        req.onsuccess = async event => {
        	this.db = await req.result
          //console.log(this.db)
            onOpen()
        }
      	req.onerror = event => onErr()
    		
    }
	getObjectStore = (store_name, mode) => {
        let db = this.db
			//console.log(db)
        let tx = db.transaction(store_name, mode)
        return tx.objectStore(store_name)
    }
  
}

async function test() {
    let da = new DataAdapter("Qwerty", 3)
    let p = new Promise((res, rej) => da.openDB(res, rej))
    await p
    console.log(da.db)
}
test()
