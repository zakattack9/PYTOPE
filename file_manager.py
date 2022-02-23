# in what way is the data inputed 
# export all files into a single zip





#Files with star represent folders

from logging import root


hierarchy = [["*package_mapping_config", "*file_path_config", "*test_designs_config"], [ "*test_results", "*python_unittests"], [] ]


def new_package_mapping_config(name):
    for count, value in enumerate(hierarchy[0]):
        if value == "*package_mapping_config":
            break
    hierarchy[0].insert(count+1, name)

def new_file_path_config(name):
    for count, value in enumerate(hierarchy[0]):
        if value == "*file_path_config":
            break
    hierarchy[0].insert(count+1, name)


def new_test_designs_config(name):
    
    for count, value in enumerate(hierarchy[0]):
        if value == "*test_designs_config":
            break
    hierarchy[0].insert(count+1, name)


def new_test_results(name):
    for count, value in enumerate(hierarchy[1]):
        if value == "*test_results":
            break
    hierarchy[1].insert(count+1, name)

def new_python_unittests(name):
    for count, value in enumerate(hierarchy[1]):
        if value == "*python_unittests":
            break
    hierarchy[1].insert(count+1, name)

def new_dockerFile(name):
    hierarchy[2].append(name)

def list_directories():
    print("*root_directory")
    for index, root_directories in enumerate(hierarchy[0:2]):
        if index == 0:
            print(" *Configs")
        elif index == 1:
            print(" *Tests")
        for directory in root_directories:
            if directory[0] == "*":
                print("  *" + directory[1:])
            else:
                print("   " + directory)

        
    print(" *Dockerfiles")    
    
    for items in hierarchy[2]:
        print("  " + items)
    
# naming convensions files

# unit tests - .py extention
# dockerfile - Dockerfile
# file path config - fp___.cfg
# test results - .txt extention
# package mapping config- pm____.cfg
# test designs config - td___.cfg

#adding files to heirarchy for testing purposes   
files = ["unittest1.py", "unittest2.py", "Dockerfile", "fp_config1.cfg", "fp_config2.cfg", "test_result1.txt", "test_result2.txt", "pm_config1.cfg", "pm_config2.cfg", "td_config1.cfg", "td_config2.cfg" ] 



for file in files:
    if file[len(file) - 2:len(file)] == "py":
        new_python_unittests(file)
    elif file == "Dockerfile":
        new_dockerFile(file)
    elif file[0:2] == "fp" and file[len(file) - 3:len(file)] == "cfg":
        new_file_path_config(file)
    elif file[len(file) - 3:len(file)] == "txt":
        new_test_results(file)
    elif file[0:2] == "pm" and file[len(file) - 3:len(file)] == "cfg":
        new_package_mapping_config(file)
    elif file[0:2] == "td" and file[len(file) - 3:len(file)] == "cfg":
        new_test_designs_config(file)    

list_directories()


