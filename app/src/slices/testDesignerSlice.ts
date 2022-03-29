import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DockerImages, TestDesigns } from "../utils/test-designer";


export interface TestDesignerState {
    currBlocks: TestDesigns | null
}

const initialState: TestDesignerState = {
    currBlocks: null
}

export interface ReorderImageFormat {
    dockerImageName:String,
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
        reorderImageBlocks: (state, action: PayloadAction<ReorderImageFormat>) => {
            const blockObject = action.payload;
            
            // const items = Array.from(state);
            // const [newOrder] = items.splice(blockObject.startIndex, 1);
            // items.splice(blockObject.endIndex,0,newOrder);
            // console.log(items);
            //state.currBlocks.docker_images = items;
            //state.currBlocks?.tests = items;
            //state.currBlocks = items;
            //state.currBlocks?.tests.test_blocks.test_blocks[1].block_type
        },
        removeBlocks: (state, action: PayloadAction<string>) => {
            
        },
        loadDesigns: (state, action: PayloadAction<TestDesigns>) => {
            const testDesignsClone = JSON.parse(JSON.stringify(action.payload));
            state.currBlocks = testDesignsClone;
        }
    }
});

export const{
    addBlocks,
    reorderImageBlocks,
    removeBlocks,
    loadDesigns
}  = testDesignerSlice.actions;

export default testDesignerSlice.reducer;