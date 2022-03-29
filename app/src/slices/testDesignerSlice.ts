import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DockerImages, TestDesigns } from "../utils/test-designer";


export interface TestDesignerState {
    currBlocks: TestDesigns | null
}

const initialState: TestDesignerState = {
    currBlocks: null
}

export interface ReorderImageFormat {
    oldIndex: number,
    newIndex: number
}

export interface ReorderTestFormat {
    // oldDockerImageName: string,
    // newDockerImageName: string,
    dockerImageName: string,
    oldIndex: number,
    newIndex: number
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
            const {oldIndex,newIndex} = action.payload;
            if (!state.currBlocks) return;
            const [dockerImageName] = state.currBlocks.test_designs.splice(oldIndex,1);
            state.currBlocks.test_designs.splice(newIndex,0,dockerImageName);
        },
        reorderTestBlocks: (state, action: PayloadAction<ReorderTestFormat>) => {
            const {dockerImageName,oldIndex,newIndex} = action.payload;
            if (!state.currBlocks) return;
            const [testName] = state.currBlocks.docker_images[dockerImageName].tests.splice(oldIndex,1);
            state.currBlocks.docker_images[dockerImageName].tests.splice(newIndex,0,testName);
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