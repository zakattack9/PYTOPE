import './UploadButton.scss';
import '../../websocket/websocket.js';
import { SocketContext } from "../../context/socket";
import React, { useState, useContext, useCallback, useEffect, ChangeEvent } from "react";

interface Props {
  className?: string,

}
//var websocket = require("../../websocket/websocket.js")
const FileSelectedHandler = function (socket:any, e:ChangeEvent<HTMLInputElement>) {
    if (e.target.files == null) {
    return;
    }
    console.log("File uploaded", e.target.files[0].name)
    console.log("File data", e.target.files[0]);
    var selectedFile = e.target.files[0]
    socket.emit("send_backend", selectedFile.name, selectedFile)
};

function UploadButton(props: Props) {
  const socket = useContext(SocketContext);
  return (
    <div className={`UploadButton ${props.className || ''}`}>
      <input type="file" name = "file" onChange={e => FileSelectedHandler(socket, e)} id={props.className} className="UploadButton__input" hidden/>
      <label htmlFor={props.className} className="UploadButton__label">Upload</label>
    </div>
  );
}
export default UploadButton;