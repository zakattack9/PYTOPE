import React, { Component, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
  DropResult,
} from "react-beautiful-dnd";
import { useAppSelector } from "../../hooks/react-redux";
import "./RunBlock.scss";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `0 50px 15px 50px`,
  background: isDragging ? "grey" : "white",
  color: isDragging ? "white" : "black",
  border: `1px solid black`,
  fontSize: `20px`,
  borderRadius: `5px`,

  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  //padding: grid,
  //width: 1200
});

export interface Props {
  parentTest: string;
  runBlockIndex: number;
  blockType: string;
  command: string;
  commandOutputAssertion: string;
  regex?: string;
}
// style={getListStyle(snapshot.isDraggingOver)}
function RunBlock(props: Props) {
  const {
    parentTest,
    runBlockIndex,
    blockType,
    command,
    commandOutputAssertion,
    regex,
  } = props;
  const testDesignerState = useAppSelector((state) => state.testDesigner);
  const { currBlocks } = testDesignerState;
  const runBlock = currBlocks?.tests[parentTest].test_blocks[runBlockIndex];
  console.log(parentTest, runBlockIndex, command, testDesignerState);
  return (
    <Droppable
      droppableId={`${parentTest}/${runBlockIndex}`}
      type={`runBlockItem`}
    >
      {(provided, snapshot) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <Draggable
            key={`${parentTest}/${runBlockIndex}`}
            draggableId={`draggable_${parentTest}/${runBlockIndex}`}
            index={runBlockIndex}
          >
            {(provided, snapshot) => (
              <div
                className="RunBlock"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                // style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
              >
                {blockType}
                {command}
                {commandOutputAssertion}
                {regex}
              </div>
            )}
          </Draggable>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default RunBlock;
