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
    socket.emit("run")
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
