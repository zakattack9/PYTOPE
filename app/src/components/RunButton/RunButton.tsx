import { FormEvent } from 'react';
import './RunButton.scss';
import { SocketContext } from "../../context/socket";
import { useContext } from "react";

interface Props {
  text?: string,
  className?: string,
  onClick: (socket:any, e: FormEvent<HTMLDivElement>) => void
}

function RunButton(props: Props) {
  const RunButtonText = props.text || 'run'
  const socket = useContext(SocketContext);

  return (
    <div className={`RunButton ${props.className || ''}`} onClick={e => props.onClick(socket, e)}>
      {RunButtonText}
    </div>
  );
}

export default RunButton;
