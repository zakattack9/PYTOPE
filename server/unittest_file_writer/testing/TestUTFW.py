#!/bin/python

from server.unittest_file_writer.testing.CLI import Files
from server.unittest_file_writer.UnittestFileWriter import parse_and_write_tests

# place the Test JSON Schema in	~/UTFW/schemas/TestDesigns.schema.json
# place the Test JSON file in	~/UTFW/test_json


def test(files: Files = Files()):
	files.dockerfiles_dir.mkdir(parents=True, exist_ok=True)
	files.test_files_dir.mkdir(parents=True, exist_ok=True)
	test_writer = parse_and_write_tests(files.test_schema, files.test_json_dir, files.dockerfiles_dir, files.test_files_dir)
	for tf in test_writer.test_files:
		print(f'{repr(str(tf.test_file_path))} : {len(tf)} lines')


if __name__ == '__main__':
	test()
