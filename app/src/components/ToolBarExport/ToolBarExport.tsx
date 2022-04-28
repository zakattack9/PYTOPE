import { useState, useEffect, useContext } from 'react';
import ToolBarItem from '../ToolBar/ToolBarItem';
import THEMES, { HSL } from '../../data/themes';
import { setCookie, getCookie } from '../../utils/cookie';
import { SocketContext } from "../../context/socket";
// const cors = require('cors');


// app.use(cors());

interface Props {
  className?: string,
}

// uses cookies to maintain/persist the current theme
function ToolBarTheme(props: Props) {
    const socket = useContext(SocketContext);
    let export_options = ['Test Environment Config', 'Tests to Python unittests']
    const handleClick = (option: string) => {
        if(option === 'Tests to Python unittests') {
            //socket.emit("export_unit_tests")
            let request = new XMLHttpRequest();
            request.open("GET", "http://127.0.0.1:5000/get-export/unittests" );
            request.send();
        
        }

        socket.once("export_tests_finished", (data:any) => { //socket.on() will emit more than once
            console.log("Received from backend:", String.fromCharCode.apply(null, Array.from(new Uint8Array(data))))
            console.log(data)
        });

  }

  return (
    <ToolBarItem name="Theme" options={export_options} onClick={handleClick} />
  );
}

export default ToolBarTheme;
