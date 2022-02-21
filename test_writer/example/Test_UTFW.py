#!/bin/python

from json import load
from pathlib import Path

from test_writer.UnittestFileWriter import UnittestFileWriter

BASE			= Path.home() / 'UTFW'
EXAMPLE_JSON	= BASE / 'Tests' / 'Test designs' / 'TestDesigns.example.json'

# place a Test Design JSON file at EXAMPLE_JSON


def setup(base=BASE):
	test_files_dir = base / 'Tests' / 'Python Unittests'
	test_files_dir.mkdir(parents=True, exist_ok=True)
	dockerfiles_dir = base / 'DockerFiles'
	dockerfiles_dir.mkdir(parents=True, exist_ok=True)
	return UnittestFileWriter(test_files_dir=test_files_dir, dockerfiles_dir=dockerfiles_dir)


def load_json(json_file_path=EXAMPLE_JSON):
	with json_file_path.open('rt') as f:
		return load(f)


def test(utfw: UnittestFileWriter, test_designs_json: dict):
	utfw.add_all(test_designs_json)
	utfw.write_all()
	for tf in utfw.test_files:
		print(f'{tf.dockerfile_path} : {len(tf)} lines')


def main():
	test(setup(), load_json())


if __name__ == '__main__':
	main()
