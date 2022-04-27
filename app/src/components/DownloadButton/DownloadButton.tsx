import './DownloadButton.scss';
import '../../websocket/websocket.js';
import { SocketContext } from "../../context/socket";
import React, { useState, useContext, useCallback, useEffect, ChangeEvent } from "react";

interface Props {
  className?: string,

}
//var websocket = require("../../websocket/websocket.js")
const FileSelectedHandler = (socket:any, e:ChangeEvent<HTMLInputElement>) => {
  console.log(e)
  if (e.target.files == null) {
    return;
  }
  console.log("File to download", e.target.files[0].name)
  var selectedFile = e.target.files[0]
  socket.emit("download_frontend", selectedFile.name)

  socket.once("frontend_download", (data:any) => { //socket.on() will emit more than once
      console.log("Received from backend:", String.fromCharCode.apply(null, Array.from(new Uint8Array(data))))
  });
  socket.once('file_dne', (filename:any) => {
      console.log("File", filename, "does not exist")
  });
};

function DownloadButton(props: Props) {
  const socket = useContext(SocketContext);
  return (
    <div className={`DownloadButton ${props.className || ''}`}>
      <input type="file" name = "file" onChange={e => FileSelectedHandler(socket, e)} id={props.className} className="DownloadButton__input" hidden/>
      <label htmlFor={props.className} className="DownloadButton__label">Download</label>
    </div>
  );
}
export default DownloadButton;