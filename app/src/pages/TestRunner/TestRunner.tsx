import "./TestRunner.scss";
import { FormEvent } from "react";
import TestGroup, { TestInfo } from "../../components/TestGroup/TestGroup";
import { useAppSelector, useAppDispatch } from "../../hooks/react-redux";

import RunButton from "../../components/RunButton/RunButton";
import DownloadButton from "../../components/DownloadButton/DownloadButton";

import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  ChangeEvent,
} from "react";

function TestRunner() {
  const dispatch = useAppDispatch();
  const testDesignerState = useAppSelector((state) => state.testDesigner);
  const { currBlocks } = testDesignerState;
  const [turnStatusGreen, setTurnStatusGreen] = useState("pending");
  const [turnOutPutGood, setTurnOutPutGood] = useState("Pending Run");

  //Reset variables on redux store change

  var blockArray: TestInfo[][] = [];
  var nameArray: string[] = [];

  const imageBlocks = currBlocks?.docker_images;
  const testDesigns = currBlocks?.test_designs;

  const testDesignConversion =
    imageBlocks && testDesigns
      ? testDesigns.map((imageName, index) => {
          nameArray.push(imageName);
          var testArray: TestInfo[] = [];
          imageBlocks[imageName].tests.forEach((testName) => {
            var tempTestInfo = new TestInfo(
              testName,
              turnStatusGreen,
              turnOutPutGood,
              ""
            );
            testArray.push(tempTestInfo);
          });
          blockArray.push(testArray);
        })
      : null;

  // var temp = new TestInfo(
  //   "Test git submodule",
  //   "error",
  //   "Standard Error (stderr)",
  //   "> ERROR"
  // );
  // var temp2 = new TestInfo(
  //   "Test git submodule2",
  //   "running",
  //   "Currently Running",
  //   "> RUNNING"
  // );

  // var exampleArray: TestInfo[] = [temp, temp2];
  // var exampleArray2: TestInfo[] = [temp2, temp];
  // var blockArray: TestInfo[][] = [exampleArray, exampleArray2];
  // var nameArray: string[] = ["testGroup1", "testGroup2"];

  console.log(JSON.stringify(currBlocks));

  var received_data = "";
  const handleClick = function (socket: any, e: FormEvent<HTMLDivElement>) {
    console.log("attempting to run tests");
    socket.emit("run_tests");
    socket.on("no_tests_found", () => {
      console.log("no tests found");
    });
    socket.once("test_finished", (data: any) => {
      console.log(
        "Test result from backend:",
        String.fromCharCode.apply(null, Array.from(new Uint8Array(data)))
      );
      received_data = data;
      console.log(received_data);
    });
  };

  return (
    <div className="TestRunner">
      <div className="TestRunner__bar">
        <RunButton
          className="TestRunner__runBtn"
          text="Run"
          onClick={() => {
            setTurnStatusGreen("success");
            setTurnOutPutGood("SUCCESS");
          }}
        />
      </div>
      {blockArray.map((arrElement, arrIndex) => {
        return (
          <TestGroup testGroupName={nameArray[arrIndex]} tests={arrElement} />
        );
      })}{" "}
    </div>
  );
}

export default TestRunner;
