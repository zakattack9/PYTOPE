# in what way is the data inputed 
# export all files into a single zip





#Files with star represent folders

import sys
import array


hierarchy = array.storage



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

def addFile(file):
    if file[len(file) - 2:len(file)] == "py":
        new_python_unittests(file)
        list_directories()
    elif file == "Dockerfile":
        new_dockerFile(file)
        list_directories()
    elif file[0:2] == "fp" and file[len(file) - 3:len(file)] == "cfg":
        new_file_path_config(file)
        list_directories()
    elif file[len(file) - 3:len(file)] == "txt":
        new_test_results(file)
        list_directories()
    elif file[0:2] == "pm" and file[len(file) - 3:len(file)] == "cfg":
        new_package_mapping_config(file)
        list_directories()
    elif file[0:2] == "td" and file[len(file) - 3:len(file)] == "cfg":
        new_test_designs_config(file)
        list_directories()
    else:
        print("Invalid Naming Convention. Please refer to these rules:")
        print("unit tests - <name>.py")
        print("dockerfile - Dockerfile")
        print("file path config - fp_<name>.cfg")
        print("test results - <name>.txt")
        print("package mapping config- pm_<name>.cfg")
        print("test designs config - td_<name>.cfg")


addFile(sys.argv[1])
with open("array.py", "a") as f:
    f.write("\nstorage = " + str(hierarchy))





