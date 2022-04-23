import contextlib
import importlib
import io
import logging
import unittest
import json
import re
from pathlib import Path
from unittest_file_writer import UnittestFileWriter

#Button in test designer, send data from redux to unittest in backend, validate that, generate unittests and run
#Use app selector hook from redux hooks, select test designer slice, test designer slice
#logger = logging.getLogger()
def runner():
    p1 = Path('../schemas')   #test_json
    p2 = Path('../docker')   #dockerfiles
    p3 = Path('../schemas')   #test_files

    logfile = 'debug_test_log'
    logging.basicConfig(filename=logfile, level=logging.DEBUG, datefmt='%H:%M:%S')
    logger = logging.getLogger('test_runner')

    test = UnittestFileWriter.parse_and_write_tests(p1, p2, p3)

    data = {}
    test_data = []
    for test_block, file in enumerate(test.test_files):
        importlib.invalidate_caches()
        module = importlib.import_module(file.class_name)
        test_suite = unittest.TestLoader().loadTestsFromModule(module)
        with io.StringIO() as buf:
            with contextlib.redirect_stdout(buf):
                result = unittest.TextTestRunner(verbosity=2, stream=buf).run(test_suite)
            test_data = buf.getvalue().split('\n')
        r = re.compile(".*" + file.class_name)
        cleaned_data = list(filter(r.match, test_data))
        data[test_block] = cleaned_data
        #test_block:
            #test:
                #header
                #messages
    json_data = json.dumps(data)
    logger.debug(result)
    return json_data

if __name__ == "__main__":
    runner()