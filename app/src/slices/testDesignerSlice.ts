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
  oldDockerImageName: string,
  newDockerImageName: string,
  oldIndex: number,
  newIndex: number
}

export interface ReorderRunFormat {
  oldTestName: string,
  newTestName: string,
  oldIndex: number,
  newIndex: number
}

export const testDesignerSlice = createSlice({
  name: 'testDesigner',
  initialState,
  reducers: {
    addBlocks: (state, action) => {

    },
    removeBlocks: (state, action: PayloadAction<string>) => {

    },
    reorderImageBlocks: (state, action: PayloadAction<ReorderImageFormat>) => {
      if (!state.currBlocks) return;
      const { oldIndex, newIndex } = action.payload;
      const [dockerImageName] = state.currBlocks.test_designs.splice(oldIndex, 1);
      state.currBlocks.test_designs.splice(newIndex, 0, dockerImageName);
    },
    reorderTestBlocks: (state, action: PayloadAction<ReorderTestFormat>) => {
      if (!state.currBlocks) return;
      const { oldDockerImageName, newDockerImageName, oldIndex, newIndex } = action.payload;
      const sourceDockerImageName = oldDockerImageName === newDockerImageName ? newDockerImageName : oldDockerImageName;

      const [testName] = state.currBlocks.docker_images[sourceDockerImageName].tests.splice(oldIndex, 1);
      state.currBlocks.docker_images[newDockerImageName].tests.splice(newIndex, 0, testName);
    },
    reorderRunBlocks: (state, action: PayloadAction<ReorderRunFormat>) => {
      if (!state.currBlocks) return;
      const { oldTestName, newTestName, oldIndex, newIndex } = action.payload;
      const sourceTestName = oldTestName === newTestName ? newTestName : oldTestName;

      const [runBlockIndex] = state.currBlocks.tests[sourceTestName].test_blocks.splice(oldIndex, 1);
      state.currBlocks.tests[newTestName].test_blocks.splice(newIndex, 0, runBlockIndex);
      console.log(oldTestName, newTestName);
    },
    loadDesigns: (state, action: PayloadAction<TestDesigns>) => {
      const testDesignsClone = JSON.parse(JSON.stringify(action.payload));
      state.currBlocks = testDesignsClone;
    }
  }
});

export const {
  addBlocks,
  removeBlocks,
  reorderImageBlocks,
  reorderTestBlocks,
  reorderRunBlocks,
  loadDesigns
} = testDesignerSlice.actions;

export default testDesignerSlice.reducer;
