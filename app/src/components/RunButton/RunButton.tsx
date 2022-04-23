import { FormEvent } from 'react';
import { MouseEvent } from 'react';
import './RunButton.scss';
import { SocketContext } from "../../context/socket";
import React, { useState, useContext, useCallback, useEffect, ChangeEvent } from "react";

interface Props {
  text?: string,
  className?: string,
}

const handleClick = function (socket:any, e: FormEvent<HTMLDivElement>) {
    console.log('running tests')
    socket.emit("run")
    socket.once("test_finished", (data:any) => {
        console.log("Received from backend:", String.fromCharCode.apply(null, Array.from(new Uint8Array(data))))
    });
}

function RunButton(props: Props) {
  const RunButtonText = props.text || 'run'
  const socket = useContext(SocketContext);

  return (
    <div className={`RunButton ${props.className || ''}`} onClick={e => handleClick(socket, e)}>
      {RunButtonText}
    </div>
  );
}

export default RunButton;
