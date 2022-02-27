import importlib
import unittest
import inspect
import logging
import os
import sys

def RunTests(folderName):
    #need to add to system path for importer to find
    sys.path.append(os.getcwd() + "\\" + folderName)
    for filename in os.listdir(folderName):
        print(filename)
        if os.path.isfile(os.getcwd() + "\\" + folderName + "\\" + filename):
            #removes *.py
            moduleName = filename.split('.', 1)[0]
            module = importlib.__import__(moduleName)
            suite = unittest.TestLoader().loadTestsFromModule(module)
            unittest.TextTestRunner(verbosity=2).run(suite)
            #print(sys.modules.keys())

if __name__ == '__main__':
    RunTests("sample_tests")