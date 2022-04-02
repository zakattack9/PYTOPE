from json import JSONDecodeError
from pathlib import Path


class JSONDecodeErrorWrapper(Exception):
	err: JSONDecodeError
	file_path: Path

	def __init__(self, err: JSONDecodeError, file_path: Path):
		self.err = err
		self.file_path = file_path

	def __str__(self):
		return f"ERROR:  Could not load JSON file {repr(str(self.file_path))}.  Message: {self.err.msg}"
