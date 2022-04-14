import importlib
import logging
import unittest
from pathlib import Path
from unittest_file_writer import UnittestFileWriter

logger = logging.getLogger()
def main():
    p1 = Path('../schemas')   #test_json
    p2 = Path('../docker')   #dockerfiles
    p3 = Path('../schemas')          #test_files
    test = UnittestFileWriter.parse_and_write_tests(p1, p2, p3)
    for file in test.test_files:
        logging.basicConfig(level=logging.DEBUG)
        importlib.invalidate_caches()
        module = importlib.import_module(file.class_name)
        test_suite = unittest.TestLoader().loadTestsFromModule(module)
        result = unittest.TextTestRunner(verbosity=2).run(test_suite)
        logger.debug(result)

if __name__ == "__main__":
    main()