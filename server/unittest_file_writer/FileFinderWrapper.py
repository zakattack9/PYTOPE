from abc import ABC, abstractmethod
from pathlib import Path, PurePath
from typing import Callable, Union


"""
FileFinderWrapper wraps a FileFinder (something that finds files).

FileFinderWrapper allows other modules to specify to the UnittestFileWriter how/where to find/create files,
by simply providing either:
	- A path to the directory that contains (or will contain) the files  (types: Path | PurePath | str).
	or
	- A callable (function) that takes the name of the file as the parameter and returns the path to the file  (types: Callable).

The compatible/allowed types are combined in a union as FileFinder.

A FileFinderWrapper does not need to be explicitly created by other modules;
instead, the input is automatically wrapped (based on its type) in an object of the corresponding wrapper class.
"""


"""
Something that finds files.
"""
FileFinder = Union['FileFinderWrapper', PurePath, str, Callable[[str], Union[PurePath, str]]]


class FileFinderWrapper(ABC):
	@abstractmethod
	def get_wrapped(self) -> FileFinder:
		pass

	@abstractmethod
	def find_file(self, file_name: str) -> Path:
		pass


class DirectoryFileFinderWrapper(FileFinderWrapper):
	_wrapped: Path

	def __init__(self, path: Path):
		if not path.is_dir():
			raise ValueError(f"{repr(str(path))} is not a directory.")
		self._wrapped = path

	def get_wrapped(self) -> Path:
		return self._wrapped

	def find_file(self, file_name: str) -> Path:
		return self._wrapped / file_name


class CallableFileFinderWrapper(FileFinderWrapper):
	_wrapped: Callable

	def __init__(self, callable_: Callable):
		self._wrapped = callable_

	def get_wrapped(self) -> Callable:
		return self._wrapped

	def find_file(self, file_name: str) -> Path:
		file = self._wrapped(file_name)
		return file if isinstance(file, Path) else Path(file)


def new_file_finder_wrapper(file_finder: FileFinder) -> FileFinderWrapper:
	if isinstance(file_finder, FileFinderWrapper):
		return file_finder
	elif isinstance(file_finder, Path):
		return DirectoryFileFinderWrapper(file_finder)
	elif isinstance(file_finder, (PurePath, str)):
		return DirectoryFileFinderWrapper(Path(file_finder))
	elif callable(file_finder):
		return CallableFileFinderWrapper(file_finder)
	else:
		raise TypeError(f"Type {repr(type(file_finder))} is not a FileFinder.")
