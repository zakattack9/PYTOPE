import React, { Component, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DraggingStyle, NotDraggingStyle, DropResult } from 'react-beautiful-dnd';
import './RunBlock.scss';

const runBlocklistItems = [
    {
        id: "1",
        name: "git submodule set-branch --quiet --branch a_br"
        // assetOutput: "Assert output is Null"
    },
    {
        id: "2",
        name: "Run git add ."
    },
    {
        id: "3",
        name: "git commit -m \"test commit\""
    },
    {
        id: "4",
        name: "git add index.html"
    }
]

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

function RunBlock() {
    const [runBlockItems, setRunBlockItems] = useState(runBlocklistItems);
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result
        if (!destination) return

        const items = Array.from(runBlockItems)
        const [newOrder] = items.splice(source.index, 1)
        items.splice(destination.index, 0, newOrder)

        setRunBlockItems(items)
    }
    return (
        <div className='RunBlock'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="runItem">
                    {(provided) => (
                        <div className="runItem" {...provided.droppableProps} ref={provided.innerRef}>
                            {runBlockItems.map(({ id, name }, index) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                            >
                                                {name}
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default RunBlock;
