import React, { Component, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DraggingStyle, NotDraggingStyle, DropResult } from 'react-beautiful-dnd';
import ReactDOM from "react-dom";
import { useRef } from 'react';
import TestBlock from '../TestBlock/TestBlock';
import { designs } from "../../data/testTestDesigner";
import './ImageBlock.scss';
import { DockerImages, TestDesigns, Tests } from '../../utils/test-designer';
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

const imageBlockListItems: imageBlockArr = [
    {
        docker_Image_id: 1,
        docker_Image_description: "Git Docker Image",
        tests: [
            {
                test_id: 10,
                test_contents: "Test git submodule"
            },
            {
                test_id: 11,
                test_contents: "Test git push"
            }
        ]
    },
    {
        docker_Image_id: 2,
        docker_Image_description: "Git Docker Image with repository",
        tests: [
            {
                test_id: 20,
                test_contents: "Test git init fail"
            },
            {
                test_id: 21,
                test_contents: "Test git commit"
            }
        ]
    }

]

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    padding: 10,
    margin: `0 50px 15px 50px`,
    background: isDragging ? "grey" : "grey",
    color: isDragging ? "white" : "black",
    border: `1px solid black`,
    fontSize: `20px`,
    borderRadius: `25px`,

    ...draggableStyle
})
const grid = 8;
const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 500
  });


interface Props{
    dockerImage: DockerImages,
    Tests:Tests
}

function ImageBlock(props: Props) {
    const [imageBlockItems, setImageBlockItems] = useState(imageBlockListItems);
    var initialValue = 0;
    const dispatch = useAppDispatch();
    const onDragEnd = (result: DropResult) => {
        console.log(result);
        // const { source, destination } = result;
        //loop city test
        if (!result.destination) return;
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination?.index;

        if (result.type === "imageBlockItem") {
            const items = Array.from(imageBlockItems);
            const [newOrder] = items.splice(sourceIndex, 1)
            items.splice(destinationIndex, 0, newOrder)
            var newlyOrderedItems = items
            setImageBlockItems(newlyOrderedItems);
            //dispatch(reorderedSubItems);
            
        }

        else if (result.type === "testBlockItem") {
            //const itemSubItemMap = imageBlockItems.reduce((acc, item) => acc[item.docker_Image_id] = item.tests, 0);
            const imageSubItems: IImageBlockSubItems = {};
            const itemSubItemMap = imageBlockItems.reduce(function (acc, item) {
                acc[item.docker_Image_id] = item.tests;
                return acc;
            }, imageSubItems);
            console.log(itemSubItemMap);

            const sourceParentId = parseInt(result.source.droppableId);
            const destParentId = parseInt(result.destination?.droppableId!);
            console.log(sourceParentId);
            console.log(destParentId);
            const sourceSubItems = itemSubItemMap[sourceParentId];
            const destSubItems = itemSubItemMap[destParentId];
            console.log(sourceSubItems);
            console.log(destSubItems);
            let newItems = [...imageBlockItems];

            if (sourceParentId === destParentId) {
                const items = Array.from(sourceSubItems);
                const [newOrder] = items.splice(sourceIndex, 1)
                items.splice(destinationIndex!, 0, newOrder)
                var reorderedSubItems = items;
                newItems = newItems.map(item => {
                    if (item.docker_Image_id === sourceParentId) {
                        item.tests = reorderedSubItems;
                    }
                    return item;
                });
                setImageBlockItems(newItems);
                // dispatch for changing the store
            }
            else {
                let newSourceSubItems = [...sourceSubItems];
                //let newSourceSubItemsArr = Array.from(newSourceSubItems);
                const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

                let newDestSubItems = [...destSubItems];
                //let newDestSubItemsArr = Array.from(newDestSubItems);
                newDestSubItems.splice(destinationIndex!, 0, draggedItem);

                newItems = newItems.map(item => {
                    if (item.docker_Image_id === sourceParentId) {
                        item.tests = newSourceSubItems;
                    }
                    else if (item.docker_Image_id === destParentId) {
                        item.tests = newDestSubItems;
                    }
                    return item;
                });
                setImageBlockItems(newItems);
            }
        }

    }
    //style = {getListStyle(snapshot.isDraggingOver)}
	
	// style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="imageBlock" type="imageBlockItem">
                {(provided, snapshot) => (
                    <div className="testBlock" {...provided.droppableProps} ref={provided.innerRef}>
                        {imageBlockItems.map((imageBlockItem, index) => {
                            return (
                                <Draggable key={imageBlockItem.docker_Image_id} draggableId={imageBlockItem.docker_Image_id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
											style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                            >
                                            {imageBlockItem.docker_Image_description}
                                            <TestBlock tests={imageBlockItem.tests}
                                                type= {imageBlockItem.docker_Image_id}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            )
                        })} {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default ImageBlock;
