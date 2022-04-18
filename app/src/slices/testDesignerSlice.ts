import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlockType, CommandOutputAssertionType, TestBlock } from "../utils/test-designer";
import { DockerImages, TestDesigns } from "../utils/test-designer";

export interface TestDesignerState {
  currBlocks: TestDesigns | null,
}

const initialState: TestDesignerState = {
  currBlocks: null,
}

interface NewImagePayload {
  imageName: string,
  description: string,
}

interface NewTestPayload {
  imageName: string,
  testName: string,
}

interface NewRunPayload {
  testName: string,
  command: string,
  assertion: CommandOutputAssertionType,
  regex: string,
}

interface ReorderImageFormat {
  oldIndex: number,
  newIndex: number
}

interface ReorderTestFormat {
  oldDockerImageName: string,
  newDockerImageName: string,
  oldIndex: number,
  newIndex: number
}

interface ReorderRunFormat {
  oldTestName: string,
  newTestName: string,
  oldIndex: number,
  newIndex: number
}

export const testDesignerSlice = createSlice({
  name: 'testDesigner',
  initialState,
  reducers: {
    addImageBlock: (state, action: PayloadAction<NewImagePayload>) => {
      if (!state.currBlocks) return;
      const { imageName, description } = action.payload;
      state.currBlocks.test_designs.push(imageName);
      state.currBlocks.docker_images[imageName] = {
        docker_image_id: Math.floor(Date.now() * Math.random()),
        docker_image_description: description,
        tests: []
      };
    },
    addTestBlock: (state, action: PayloadAction<NewTestPayload>) => {
      if (!state.currBlocks) return;
      const { imageName, testName } = action.payload;
      state.currBlocks.docker_images[imageName].tests.push(testName);
      state.currBlocks.tests[testName] = {
        test_id: Math.floor(Date.now() * Math.random()),
        test_blocks: []
      };
    },
    addRunBlock: (state, action: PayloadAction<NewRunPayload>) => {
      if (!state.currBlocks) return;
      const { testName, command, assertion, regex } = action.payload;
      const runBlock: TestBlock = {
        block_type: BlockType.RUN,
        command: command,
        command_output_assertion: assertion,
      };
      if (assertion === CommandOutputAssertionType.VERIFY_REGEX) runBlock.regex = regex;
      state.currBlocks.tests[testName].test_blocks.push(runBlock);
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
  addImageBlock,
  addTestBlock,
  addRunBlock,
  reorderImageBlocks,
  reorderTestBlocks,
  reorderRunBlocks,
  loadDesigns
} = testDesignerSlice.actions;

export default testDesignerSlice.reducer;
