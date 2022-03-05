import importlib
import unittest
import inspect
import logging
import os
import sys

def RunTests(inputFolder, outputFolder):
    #need to add to system path for importer to find
    sys.path.append(os.getcwd() + "\\" + inputFolder)
    for filename in os.listdir(inputFolder):
        fileLocation = os.getcwd() + "\\" + inputFolder + "\\" + filename
        outputLocation = os.getcwd() + "\\" + outputFolder + "\\" + filename + "_output"
        if os.path.isfile(fileLocation) and filename.split(".", 1)[1] == "py":
            #this file open needs to be changed during file manager implementation
            with open(outputLocation, "w") as outputFile:
                #removes *.py
                moduleName = filename.split('.', 1)[0]
                module = importlib.__import__(moduleName)
                suite = unittest.TestLoader().loadTestsFromModule(module)
                #file is written during test run
                unittest.TextTestRunner(outputFile, verbosity=2).run(suite)
                print(filename)

if __name__ == '__main__':
    #this is where we would access the file manager to open a folder
    #can easily be broken down into accessing individual files depending on implementation of file manager
    RunTests("sample_tests", "sample_output")