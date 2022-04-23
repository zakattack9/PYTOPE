import contextlib
import importlib
import io
import logging
import unittest
import json
import re
from pathlib import Path
from unittest_file_writer import UnittestFileWriter


def run_tests():
	p1 = Path('../schemas')  # test_json
	p2 = Path('../docker')  # dockerfiles
	p3 = Path('../schemas')  # test_files

	logfile = 'debug_test_log'
	logging.basicConfig(filename=logfile, level=logging.DEBUG, datefmt='%H:%M:%S')
	logger = logging.getLogger('test_runner')

	test = UnittestFileWriter.parse_and_write_tests(p1, p2, p3)

	data = {}
	test_data = []
	for test_block, file in enumerate(test.test_files, start=1):
		importlib.invalidate_caches()
		module = importlib.import_module(file.class_name)
		test_suite = unittest.TestLoader().loadTestsFromModule(module)
		with io.StringIO() as buf:
			with contextlib.redirect_stdout(buf):
				result = unittest.TextTestRunner(verbosity=2, stream=buf).run(test_suite)
			# print(buf.getvalue())   # emit to front-end or send to file manager
			test_data = buf.getvalue().split('\n')
		r = re.compile(".*" + file.class_name)
		cleaned_data = list(filter(r.match, test_data))
		data[test_block] = cleaned_data
	# for i in test_data:
	#    if re.match(file.class_name, i):
	#        data[test_block] = i
	json_data = json.dumps(data)
	logger.debug(result)
	return json_data
