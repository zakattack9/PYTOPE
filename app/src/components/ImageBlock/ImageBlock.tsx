import React, { Component, MouseEvent, useState } from 'react';
import TestBlock from '../TestBlock/TestBlock';
import './ImageBlock.scss';


function ImageBlock() {

    const [content, setContent] = useState<string>("Drop Here");

    // Drag Handler
    const dragStartHandler = (
        e: React.DragEvent<HTMLDivElement>,
        data: string
    ) => {
        e.dataTransfer.setData("text", data);
    };

    // Drop Handler
    const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        setContent(data);
    };

    // Makes a container droppable
    const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className='ImageBlock'>
            Docker Image Block
            <div className='TestBlock' onDragStart={(e) => dragStartHandler(e, "test1") } 
                onDragOver={allowDrop} onDrop={dropHandler} draggable={true} >
                <TestBlock />
                <h2>{content}</h2>
            </div>
            <div className='TestBlock2' onDragStart={(e) => dragStartHandler(e, "test2")}
                onDragOver={allowDrop} onDrop={dropHandler} draggable={true}>
                <TestBlock />
                <h2>{content}</h2>
            </div>
            <div className='TestBlock' onDragOver={allowDrop} onDrop={dropHandler}>
                <h2>{content}</h2>
            </div>
        </div>

    );
}

export default ImageBlock;