import { createAsyncThunk } from "@reduxjs/toolkit"

export default class EntityAsyncStorageAdapter {
    constructor (actionNamePrefix, dataAdapter) {
        this.actionNamePrefix = actionNamePrefix
        this.dataAdapter = dataAdapter
        
        this._thunks = {
            __proto__ : null,
            loadAll : createAsyncThunk(`${this.actionNamePrefix}/loadAll`, async () => {
                console.log("Collections: ")
                return this.dataAdapter.loadMany()
            }),
            loadOne : createAsyncThunk(`${this.actionNamePrefix}/loadOne`, async (id) => {
                return this.dataAdapter.loadOne(id)
            }),
            saveOne : createAsyncThunk(`${this.actionNamePrefix}/saveOne`, async (entry) => {
                return this.dataAdapter.saveOne(entry)
            }),
            removeOne : createAsyncThunk(`${this.actionNamePrefix}/removeOne`, async id => {
                return this.dataAdapter.removeOne(id)
            }),
            removeMany : createAsyncThunk(`${this.actionNamePrefix}/removeMany`, async ids => {
                return this.dataAdapter.removeMany(ids)
            })
        }
    }
    get thunks() {
        return this._thunks
    }
}
