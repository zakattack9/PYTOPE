import contextlib
import importlib
import io
import logging
import unittest
from pathlib import Path
from unittest_file_writer import UnittestFileWriter

#logger = logging.getLogger()
def main():
    p1 = Path('../schemas')   #test_json
    p2 = Path('../docker')   #dockerfiles
    p3 = Path('../schemas')          #test_files

    logfile = 'debug_test_log'
    logging.basicConfig(filename=logfile, level=logging.DEBUG, datefmt='%H:%M:%S')
    logger = logging.getLogger('test_runner')

    test = UnittestFileWriter.parse_and_write_tests(p1, p2, p3)
    for file in test.test_files:
        importlib.invalidate_caches()
        module = importlib.import_module(file.class_name)
        test_suite = unittest.TestLoader().loadTestsFromModule(module)
        with io.StringIO() as buf:
            with contextlib.redirect_stdout(buf):
                result = unittest.TextTestRunner(verbosity=2, stream=buf).run(test_suite)
            print(buf.getvalue())   # emit to front-end or send to file manager
    logger.debug(result)

if __name__ == "__main__":
    main()