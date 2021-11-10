import React, { useState, useContext, useCallback, useEffect } from "react";
import { SocketContext } from "../context/socket";

const SocketTest = ({ userId }) => {
  const socket = useContext(SocketContext);

  const [test, setTest] = useState("fail");
  const [helloWorld, setHelloWorld] = useState("");

  useEffect(() => {
    // as soon as the component is mounted, do the following tasks:

    // emit USER_ONLINE event
    socket.emit("USER_ONLINE", userId);

    socket.on("test", (arg) => {
      setTest(arg);
      console.log(arg);
    });

    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
    };
  }, [socket, userId]);

  //listen for "hello"
  socket.on("hello", (arg) => {
    setHelloWorld(arg);
    console.log(arg);
  });

  return (
    <>
      <div>{test}</div> <br /> <div>{helloWorld}</div>
    </>
  );
};

export default SocketTest;
