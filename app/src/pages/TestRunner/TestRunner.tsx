import "./TestRunner.scss";
import { FormEvent } from 'react';
import TestGroup, { TestInfo } from "../../components/TestGroup/TestGroup";
import { useAppSelector, useAppDispatch } from "../../hooks/react-redux";

import RunButton from "../../components/RunButton/RunButton";
import DownloadButton from "../../components/DownloadButton/DownloadButton";

import React, { useState, useContext, useCallback, useEffect, ChangeEvent } from "react";

function TestRunner() {
  const dispatch = useAppDispatch();
  const testDesignerState = useAppSelector((state) => state.testDesigner);
  const { currBlocks } = testDesignerState;

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
              "pending",
              "Pending Run",
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


  var received_data = ''
  const handleClick = function (socket:any, e: FormEvent<HTMLDivElement>) {
        console.log('running tests')
        socket.emit("run")
        socket.once("test_finished", (data:any) => {
            console.log("Received from backend:", String.fromCharCode.apply(null, Array.from(new Uint8Array(data))))
            received_data = data
            console.log(received_data)
        });
  }

  return (
    <div className="TestRunner">
        <div className="TestRunner__bar">
            <RunButton className="TestRunner__runBtn" text="Run" onClick={handleClick} />
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
