import React, { useState, useContext, useCallback, useEffect } from "react";
import { SocketContext } from "../context/socket";

const SocketTest = ({ file_frontend }) => {
  const socket = useContext(SocketContext);

  const [test, setTest] = useState("");

  useEffect(() => {
    // as soon as the component is mounted, do the following tasks:

    //Creates a new plaintext file and sends it to the backend
    socket.on("backend_request_file", () => {
        var data = ["member_0", "member_1", "member_2"]
        var file = new File(data, "test.txt", {
        type: "text/plain",
        });
        socket.emit("backend_receive_file", file)
    });

    //Confirm the data was sent to the frontend from the backend
    socket.on("frontend_receive_file", (file) => {
        file_frontend = file;
        socket.emit("frontend_received_file", file_frontend)
    });

    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
    };
  }, [socket, file_frontend]);

  return <div>{test}</div>;
};

export default SocketTest;
