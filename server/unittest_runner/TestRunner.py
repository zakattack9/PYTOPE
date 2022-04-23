import contextlib
import importlib
import io
import json
import logging
import re
import unittest
from pathlib import Path


def run_tests(test_files_dir: Path, test_files_package: str, output_dir: Path, log_file: Path):
	logging.basicConfig(filename=log_file, level=logging.DEBUG, datefmt='%H:%M:%S')
	logger = logging.getLogger('TestRunner')
	data = {}
	test_data = []
	for test_block, file in enumerate(test_files_dir.iterdir(), start=1):
		if file.name != '.gitkeep':
			importlib.invalidate_caches()
			# module = importlib.import_module(file.stem)
			module = importlib.import_module('.' + file.stem, test_files_package)
			test_suite = unittest.TestLoader().loadTestsFromModule(module)
			output_file = output_dir / file.with_suffix('.py_output').name
			with io.StringIO() as buf:
				with contextlib.redirect_stdout(buf):
					result = unittest.TextTestRunner(verbosity=2, stream=buf).run(test_suite)
				output_file.write_text(buf.getvalue())
				test_data = buf.getvalue().split('\n')
			r = re.compile(".*" + file.stem)
			cleaned_data = list(filter(r.match, test_data))
			data[test_block] = cleaned_data
	# for i in test_data:
	#    if re.match(file.class_name, i):
	#        data[test_block] = i
	json_data = json.dumps(data)
	logger.debug(result)
	return json_data
