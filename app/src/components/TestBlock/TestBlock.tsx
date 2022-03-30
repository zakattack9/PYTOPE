import React, { Component, useState } from 'react';
import RunBlock from '../RunBlock/RunBlock';
import { DragDropContext, Droppable, Draggable, DraggingStyle, NotDraggingStyle, DropResult } from 'react-beautiful-dnd';
import './TestBlock.scss';
import { imageBlockArr } from '../ImageBlock/ImageBlock';
import { testBlockArr } from '../ImageBlock/ImageBlock';
import { useAppSelector } from '../../hooks/react-redux';

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
    testName: string,
    testIndex: number,
    parentImage: string
}

function TestBlock(props: Props) {

    const {testName, testIndex, parentImage} = props
    const testDesignerState = useAppSelector(state => state.testDesigner);
    const {currBlocks} = testDesignerState;
    const testBlock = currBlocks?.tests[testName];

    const runBlock = testBlock?.test_blocks;
    console.log(testDesignerState);
    const runBlocks = runBlock && testBlock ? runBlock.map((test_block,index) =>
        <RunBlock
            parentTest = {testName}
            runBlockIndex = {index}
            blockType = {test_block.block_type}
            command = {test_block.command}
            commandOutputAssertion = {test_block.command_output_assertion}
            regex = {test_block.regex}
        />
    ): null

    return testBlock ?  (
        <Droppable droppableId={`${parentImage}/${testName}`} type={`testBlockItem`}>
            {(provided, snapshot) => (
                <div className="testItem" {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                    <Draggable key={`${parentImage}/${testName}`} draggableId={`draggable_${testName}`} index={testIndex}>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            >
                                {testName}
                                {runBlocks}
                            </div>
                        )}
                    </Draggable>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>

    ) : null;
}

export default TestBlock;

