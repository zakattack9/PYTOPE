import React, { useState, useContext, useCallback, useEffect } from "react";
import { SocketContext } from "../context/socket";

export function FileUpload() {
    const socket = useContext(SocketContext);
    const [test, setTest] = useState(0);
    //change to onClick somewhere
    useEffect(() => {
        console.log("upload button active")
        const input = document.querySelector('input[type="file"]');
        if (input == null) {
            return;
        }
        input.addEventListener('change', (e) => {
            console.log("File uploaded")
            var fileToBackend = e.target.files[0]
            console.log(fileToBackend)
            console.log(fileToBackend.name)
            socket.emit("send_backend", fileToBackend.name, fileToBackend)
        });
    }, [socket]);

    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
    };

};

export function FileDownload() {
    const socket = useContext(SocketContext);
    const [test, setTest] = useState(1);
    //change to onClick somewhere
    useEffect(() => {
        console.log("download button loaded")
        const input = document.querySelector('input[type="file"]');
        if (input == null) {
            return;
        }
        input.addEventListener('change', (e) => {
            console.log("File downloading")
            //const fd = new FormData();
            var fileToFrontend = e.target.files[0]
            //fd.append(e.target.name, fileToBackend, fileToBackend.name);
            //console.log(e.target.name)
            console.log(fileToFrontend)
            console.log(fileToFrontend.name)
            socket.emit("download_frontend", fileToFrontend.name)
        });
        socket.on("frontend_download", (data) => {
            console.log("Received from backend:", data)
        });
        return () => {
          // before the component is destroyed
          // unbind all event handlers used in this component
        };
    }, [socket]);
    return <div>{setTest}</div>;
};
