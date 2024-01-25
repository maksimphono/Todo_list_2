import { createAsyncThunk } from "@reduxjs/toolkit"
import DataAdapter from "../../LocalStorage/DataAdapter"

export default class EntityAsyncStorageAdapter extends DataAdapter {
    constructor (actionNamePrefix, entryPrefix, idsListName) {
        super(entryPrefix, idsListName)

        this.actionNamePrefix = actionNamePrefix
        
        this._thunks = {
            __proto__ : null,
            loadAll : createAsyncThunk(`${this.actionNamePrefix}/loadAll`, async () => {
                const result = await super.loadAll()
                return result
            }),
            loadOne : createAsyncThunk(`${this.actionNamePrefix}/loadOne`, async (id) => {
                const result = await super.loadOne(id)
                return result
            }),
            loadMany : createAsyncThunk(`${this.actionNamePrefix}/loadMany`, async (ids) => {
                const result = super.loadMany(ids)
                return result
            }), 
            saveOne : createAsyncThunk(`${this.actionNamePrefix}/saveOne`, async (entry) => {
                const result = super.saveOne(entry)
                return result
            }),
            saveMany : createAsyncThunk(`${this.actionNamePrefix}/saveMany`, async (entries) => {
                const result = super.saveMany(entries)
                return result
            }),
            removeOne : createAsyncThunk(`${this.actionNamePrefix}/removeOne`, async id => {
                const result = super.removeOne(id)
                return result
            }),
            removeMany : createAsyncThunk(`${this.actionNamePrefix}/removeMany`, async ids => {
                const result = super.removeMany(ids)
                return result
            })
        }
    }
    get thunks() {
        return this._thunks
    }
}
