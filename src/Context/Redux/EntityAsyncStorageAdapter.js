import { createAsyncThunk } from "@reduxjs/toolkit"
import { DataAdapter } from "../../LocalStorage/initStorage"

export default class EntityAsyncStorageAdapter extends DataAdapter {
    constructor (actionNamePrefix, entryPrefix, idsListName) {
        super(entryPrefix, idsListName)

        this.actionNamePrefix = actionNamePrefix
        
        this._thunks = {
            __proto__ : null,
            loadAll : createAsyncThunk(`${this.actionNamePrefix}/loadAll`, async () => {
                console.log("Collections: ")
                return super.loadMany()
            }),
            loadOne : createAsyncThunk(`${this.actionNamePrefix}/loadOne`, async (id) => {
                return super.loadOne(id)
            }),
            saveOne : createAsyncThunk(`${this.actionNamePrefix}/saveOne`, async (entry) => {
                return super.saveOne(entry)
            }),
            saveMany : createAsyncThunk(`${this.actionNamePrefix}/saveMany`, async (entries) => {
                return super.saveMany(entries)
            }),
            removeOne : createAsyncThunk(`${this.actionNamePrefix}/removeOne`, async id => {
                return super.removeOne(id)
            }),
            removeMany : createAsyncThunk(`${this.actionNamePrefix}/removeMany`, async ids => {
                return super.removeMany(ids)
            })
        }
    }
    get thunks() {
        return this._thunks
    }
}
