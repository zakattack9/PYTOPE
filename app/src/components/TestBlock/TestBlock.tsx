import React, { Component, useState } from 'react';
import RunBlock from '../RunBlock/RunBlock';
import { DragDropContext, Droppable, Draggable, DraggingStyle, NotDraggingStyle, DropResult } from 'react-beautiful-dnd';
import './TestBlock.scss';
import { imageBlockArr } from '../ImageBlock/ImageBlock';
import { testBlockArr } from '../ImageBlock/ImageBlock';

// export interface runBlockContents {
//     id: string;
//     contents: HTMLElement
// }

// const testBlockListItems = [
//     {
//         test_id: "1",
//         test_block:"Test Block 1"
//         // test_blocks: [
//         //     {
//         //         block_type: "RUN",
//         //         command: "git commit -m 'initial commit'",
//         //         command_output_assertion: "NO_VERIFY"
//         //     }
//         // ]
//     },
//     {
//         test_id: "2",
//         test_block:"Test Block 2"
//         // test_blocks: [
//         //     {
//         //         block_type: "RUN",
//         //         command: "git add .",
//         //         command_output_assertion: "VERIFY_EMPTY"
//         //     }
//         // ]
//     },
//     {
//         test_id: "3",
//         test_block:"Test Block 3"
//         // test_blocks: [
//         //     {
//         //         block_type: "RUN",
//         //         command: "git commit -am 'new commit'",
//         //         command_output_assertion: "NO_VERIFY"
//         //     }
//             // {
//             //     block_type: "RUN",
//             //     command: "git push",
//             //     command_output_assertion: "VERIFY_REGEX",
//             //     regex: "/some_regex/g"
//             // }
//         // ]
//     }
//     // {
//     //     id: "4",
//     //     name: "Run Block 4"
//     // }
// ]


// const getItemStyle = (isDragging: any, draggableStyle: any) => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: "none",
//     // padding: grid * 2,
//     // margin: `0 10px 10px 0`,

//     background: isDragging ? "lightgreen" : "grey",
//     display: "inline-flex",
//   padding: "10px",
//   margin: "0 10px 10px 0",
//   border: "1px solid grey",
//     width: "120px",
//     ...draggableStyle
//   });

// const getListStyle = (isDraggingOver: boolean) => ({
//     background: isDraggingOver ? "lightblue" : "lightgrey",
//     padding: grid,
//     margin: "10px 0"
//   });
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

