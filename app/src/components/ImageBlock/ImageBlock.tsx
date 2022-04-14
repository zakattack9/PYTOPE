import React, { Component, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DraggingStyle, NotDraggingStyle, DropResult } from 'react-beautiful-dnd';
import ReactDOM from "react-dom";
import { useRef } from 'react';
import TestBlock from '../TestBlock/TestBlock';
import { designs } from "../../data/testTestDesigner";
import './ImageBlock.scss';
import { DockerImage, DockerImages, TestDesigns, Tests } from '../../utils/test-designer';
import { useAppSelector, useAppDispatch } from '../../hooks/react-redux';


export interface IImageBlockItem {
    docker_Image_id: number;
    docker_Image_description: String;
    tests: testBlockArr;
}
export interface ITestBlockItem {
    test_id: number;
    test_contents: String;
}
export interface IImageBlockSubItems {
    [imageBlockSubItemID: number]: testBlockArr;
}
export type imageBlockArr = IImageBlockItem[];
//xport interface imageBlockArray extends Array<IImageBlockItem>{}

export type testBlockArr = ITestBlockItem[];


const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // padding: 10,
    // margin: `0 50px 15px 50px`,
    // background: isDragging ? "grey" : "grey",
    // color: isDragging ? "white" : "black",
    // border: `1px solid black`,
    // fontSize: `20px`,
    // borderRadius: `25px`,

    // ...draggableStyle
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
})
const grid = 20;
const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 200
});


interface Props {
    dockerImageName: string,
    dockerImage: DockerImage,
    dockerImageIndex: number
}

function ImageBlock(props: Props) {

    const { dockerImageName, dockerImage, dockerImageIndex } = props;

    const tests = dockerImage.tests;
    const testBlocks = tests ? tests.map((testName, index) =>
        <TestBlock
            testName={testName}
            testIndex={index}
            parentImage={dockerImageName}
        />
    ) : null
    return (
        <Droppable droppableId={dockerImageName} type="imageBlockItem">
            {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>  
                    <Draggable key={dockerImage.docker_image_id} draggableId={`draggable_${dockerImageName}`} index={dockerImageIndex}>
                        {(provided, snapshot) => (
                            <div className="ImageBlock">
                                <div ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    // style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                >
                                    {dockerImage.docker_image_description}
                                    {testBlocks}
                                    
                                </div>
                            </div>
                        )}
                    </Draggable>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default ImageBlock;
