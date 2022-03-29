import React, { Component, useState } from 'react';
import RunBlock from '../RunBlock/RunBlock';
import { DragDropContext, Droppable, Draggable, DraggingStyle, NotDraggingStyle, DropResult } from 'react-beautiful-dnd';
import './TestBlock.scss';
import { imageBlockArr } from '../ImageBlock/ImageBlock';
import { testBlockArr } from '../ImageBlock/ImageBlock';

const grid = 20;
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    padding: 10,
    margin: `0 50px 15px 50px`,
    background: isDragging ? "grey" : "white",
    color: isDragging ? "white" : "black",
    border: `1px solid black`,
    fontSize: `20px`,
    borderRadius: `5px`,

    ...draggableStyle
})

const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    //padding: grid,
    //width: 1200
  });

export interface Props {
    tests: testBlockArr,
    type: number
    
}

// style={getItemStyle(
//     snapshot.isDragging,
//     provided.draggableProps.style
//   )}
function TestBlock(props: Props) {
    return (
        <Droppable droppableId={props.type.toString()} type={`testBlockItem`}>
            {(provided,snapshot) => (
                <div className="testItem" {...provided.droppableProps} ref={provided.innerRef} style = {getListStyle(snapshot.isDraggingOver)}>
                    {props.tests.map((testBlockItem, index) => {
                        return (
                            <Draggable key={testBlockItem.test_id} draggableId={testBlockItem.test_id.toString()} index={index}>
                                {/* {testBlockItems[index].test_blocks.map({block_type,command,command_output_assertion})} */}
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                    >
                                        {testBlockItem.test_contents}
                                        {/* <span
                                            {...provided.dragHandleProps}
                                            style={{
                                                display: "block",
                                                margin: "0 10px",
                                                border: "1px solid #000"
                                            }}
                                        >
                                            Drag
                                        </span> */}
                                        <RunBlock/>
                                    </div>
                                )}
                            </Draggable>
                        )
                    })}
                </div>
            )}
        </Droppable>

    );
}

export default TestBlock;

