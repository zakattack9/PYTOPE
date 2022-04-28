import { Droppable, Draggable } from "react-beautiful-dnd";
import { CommandOutputAssertionType } from "../../utils/test-designer";
import "./RunBlock.scss";

export interface Props {
  parentTest: string,
  runBlockIndex: number,
  blockType: string,
  command: string,
  commandOutputAssertion: string,
  regex?: string,
  isDefault?: boolean,
}

function RunBlock(props: Props) {
  const { 
    parentTest, 
    runBlockIndex, 
    command, 
    commandOutputAssertion, 
    regex, 
    isDefault,
  } = props;

  const IS_REGEX = commandOutputAssertion === CommandOutputAssertionType.VERIFY_REGEX;
  const IS_NO_VERIFY = commandOutputAssertion !== CommandOutputAssertionType.NO_VERIFY;
  const RunBlockData = IS_NO_VERIFY ? (
    <>
      <div className="RunBlock__run">
        Run
        <div className="RunBlock__command">{command}</div>
      </div>
      <div className="RunBlock__assert">
        Assert output is
        <div className="RunBlock__outputAssertion">
          {IS_REGEX ? regex : 'Empty'}
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="RunBlock__run--noAssertion">
        Run
        <div className="RunBlock__command">{command}</div>
      </div>
    </>
  );
  
  const RunBlockDraggable = isDefault ? null : (
    <Draggable key={`${parentTest}/${runBlockIndex}`} draggableId={`draggable_${parentTest}/${runBlockIndex}`} index={runBlockIndex}>
      {({draggableProps, dragHandleProps, innerRef}) => (
        <div className="RunBlock" ref={innerRef} {...draggableProps} {...dragHandleProps}>
          {RunBlockData}
        </div>
      )}
    </Draggable>
  );

  return (
    <Droppable droppableId={`${parentTest}/${runBlockIndex}`} type={`runBlockItem`}>
      {({droppableProps, innerRef, placeholder}) => (
        <div {...droppableProps} ref={innerRef}>
          {RunBlockDraggable}
          {placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default RunBlock;
