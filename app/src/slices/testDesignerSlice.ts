import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DH_UNABLE_TO_CHECK_GENERATOR } from "constants";
import { TestDesigns } from "../utils/test-designer";


export interface TestDesignerState {
    currBlocks: TestDesigns | null
}

const initialState: TestDesignerState = {
    currBlocks: null
}

export interface ReorderFormat {
    list: Array<TestDesigns>
    startIndex: number,
    endIndex: number
}

export const testDesignerSlice = createSlice({
    name: 'testDesigner',
    initialState,
    reducers: {
        addBlocks: (state, action) => {
            const newBlock = {

            }
        },
        reorderBlocks: (state, action: PayloadAction<ReorderFormat>) => {
            const blockObject = action.payload;
            const items = Array.from(blockObject.list);
            const [newOrder] = items.splice(blockObject.startIndex, 1);
            items.splice(blockObject.endIndex,0,newOrder);
            //state.currBlocks = items;
        }
    }
})