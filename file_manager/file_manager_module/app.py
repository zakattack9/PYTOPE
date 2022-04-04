import os
import shutil
import sys




def zip_folder():
    shutil.make_archive("output", 'zip', source + "/hierarchy")

def sort_hierarchy():
    main_file="app.py"
    #directories
    source = os.getcwd()
    #Configs
    file_path_config = os.getcwd() + "/hierarchy/configs/file_path_config" 
    package_mapping_config = os.getcwd() + "/hierarchy/configs/package_mapping_config" 
    test_designs_config = os.getcwd() + "/hierarchy/configs/test_designs_config" 

    #Tests
    python_unittests = os.getcwd() + "/hierarchy/tests/python_unittests" 
    test_resuls = os.getcwd() + "/hierarchy/tests/test_results" 

    #Dockerfiles
    Dockerfiles = os.getcwd() + "/hierarchy/Dockerfiles" 

    files = os.listdir(source)


    if main_file in files:
        get_file_index = files.index(main_file)
        del files[get_file_index]

    for file in files:
        if file[len(file) - 2:len(file)] == "py":
            shutil.move(file,python_unittests)
        elif file == "Dockerfile":
            shutil.move(file,Dockerfiles)
        elif file[0:2] == "fp" and file[len(file) - 3:len(file)] == "cfg":
            shutil.move(file,file_path_config)
        elif file[len(file) - 9:len(file)] == "py_output":
            shutil.move(file,test_resuls)
        elif file[0:2] == "pm" and file[len(file) - 3:len(file)] == "cfg":
            shutil.move(file,package_mapping_config)
        elif file[0:2] == "td" and file[len(file) - 3:len(file)] == "cfg":
            shutil.move(file,test_designs_config)


