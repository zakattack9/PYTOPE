import RunBlock from '../RunBlock/RunBlock';
import { useAppSelector } from '../../hooks/react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { BlockType, CommandOutputAssertionType } from '../../utils/test-designer';
import './TestBlock.scss';

export interface Props {
  testName: string,
  testIndex: number,
  parentImage: string,
  isDefault?: boolean,
}

function TestBlock(props: Props) {
  const { testName, testIndex, parentImage, isDefault } = props;
  const testDesignerState = useAppSelector(state => state.testDesigner);
  const { currBlocks } = testDesignerState;
  const testData = currBlocks?.tests[testName];
  const testBlocks = testData?.test_blocks;

  const RunBlocks = testBlocks?.length ? testBlocks.map((test_block, index) =>
    <RunBlock
      parentTest={testName}
      runBlockIndex={index}
      blockType={test_block.block_type}
      command={test_block.command}
      commandOutputAssertion={test_block.command_output_assertion}
      regex={test_block.regex}
    />
  ) : (
    <RunBlock
      parentTest={testName}
      runBlockIndex={0}
      blockType={BlockType.RUN}
      command={''}
      commandOutputAssertion={CommandOutputAssertionType.NO_VERIFY}
      isDefault
    />
  );

  const TestBlockDraggable = isDefault ? null : (
    <Draggable key={`${parentImage}/${testName}`} draggableId={`draggable_${testName}`} index={testIndex}>
      {({draggableProps, dragHandleProps, innerRef}) => (
        <div className="TestBlock" ref={innerRef} {...draggableProps} {...dragHandleProps}>
          {testName}
          {RunBlocks}
        </div>
      )}
    </Draggable>
  );

  return (
    <Droppable droppableId={`${parentImage}/${testName}`} type={`testBlockItem`}>
      {({droppableProps, innerRef, placeholder}) => (
        <div {...droppableProps} ref={innerRef}>
          {TestBlockDraggable}
          {placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default TestBlock;
