import contextlib
import importlib
import io
import logging
import unittest
import json
import re
from pathlib import Path
from unittest_file_writer import UnittestFileWriter

def runner():
    p1 = Path('../schemas')   #test_json
    p2 = Path('../docker')   #dockerfiles
    p3 = Path('../schemas')   #test_files

    logfile = 'debug_test_log'
    logging.basicConfig(filename=logfile, level=logging.DEBUG, datefmt='%H:%M:%S')
    logger = logging.getLogger('test_runner')

    #
    test = UnittestFileWriter.parse_and_write_tests(p1, p2, p3)

    data = {}
    json_tests = {}
    for file in test.test_files:
        importlib.invalidate_caches()
        module = importlib.import_module(file.class_name)
        test_suite = unittest.TestLoader().loadTestsFromModule(module)
        with io.StringIO() as buf:
            with contextlib.redirect_stdout(buf):
                result = unittest.TextTestRunner(verbosity=2, stream=buf).run(test_suite)
            test_data = buf.getvalue().split('\n')
        r = re.compile(".*" + file.class_name)
        cleaned_data = list(filter(r.match, test_data))
        for i in range(len(test.test_files)):
            header = []
            split_test_name = cleaned_data[i].split(' ', 1)
            if 'ok' in split_test_name[1]:
                header.append('ok')
            elif 'FAIL' in split_test_name[1]:
                header.append('FAIL')
            else:
                header.append('Unknown')
            header.append(split_test_name[1])
            json_tests[split_test_name[0]] = header    #add name[]
        data[file.class_name] = json_tests    #build test-block
#'test3_1 (file_manager.file_manager_module.hierarchy.tests.python_unittests.docker_image2.docker_image2) ... ok'
        #test_block:
            #test:
                #header
                #messages
    json_data = json.dumps(data)
    logger.debug(result)
    return json_data

if __name__ == "__main__":
    runner()