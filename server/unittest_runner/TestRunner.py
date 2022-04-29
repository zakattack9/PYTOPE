import contextlib
import importlib
import io
import json
import logging
import re
import unittest
from pathlib import Path


def run_tests(test_files_dir: Path, test_files_package: str, output_dir: Path, log_file: Path):
	print("TestRunner.py: Executing run_tests()")
	importlib.invalidate_caches()  # Redundant?
	logging.basicConfig(filename=log_file, level=logging.DEBUG, datefmt='%H:%M:%S')
	logger = logging.getLogger('TestRunner')
	test_data = []
	data = {}
	fileignore = ['.gitkeep', '__pycache__', '.DS_Store']
	for file in test_files_dir.iterdir():
		json_tests = {}
		if file.name not in fileignore:
			print("TestRunner.py: Found a unittest file:", file.stem, " in", test_files_dir.name)
			# module = importlib.import_module(file.stem)
			module = importlib.import_module('.' + file.stem, test_files_package)
			importlib.reload(module)
			test_suite = unittest.TestLoader().loadTestsFromModule(module)
			output_file = output_dir / file.with_suffix('.py_output').name
			with io.StringIO() as buf:
				with contextlib.redirect_stdout(buf):
					result = unittest.TextTestRunner(verbosity=2, stream=buf).run(test_suite)
				output_file.write_text(buf.getvalue())
				test_data = buf.getvalue().split('\n')
			r = re.compile(".*" + file.stem + "\) ...")
			cleaned_data = list(filter(r.match, test_data))
			for i in range(len(cleaned_data)):
				header = ""
				split_test_name = cleaned_data[i].split(' ', 1)
				if 'ok' in split_test_name[1]:
					header = "ok"
				elif 'FAIL' in split_test_name[1]:
					header = "FAIL"
				else:
					header = "Unknown"
				#header.append(split_test_name[1])
				json_tests[split_test_name[0]] = header
			data[file.stem] = json_tests
	        #test_block:
				#test:
					#header
					#messages
	importlib.invalidate_caches()
	json_data = json.dumps(data)
	logger.debug(json_data)
	return json_data
