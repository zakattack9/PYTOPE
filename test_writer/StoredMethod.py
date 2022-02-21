from typing import Iterable, Sequence

from test_writer.Method import Method


class StoredMethod(Method):
	body_lines: Sequence[str]

	def __init__(self, name: str, parameters='', decoration_lines: Sequence[str] = (), body_lines: Sequence[str] = ()):
		super().__init__(name, parameters, decoration_lines)
		self.body_lines = body_lines

	def get_body_lines(self) -> Iterable[str]:
		return self.body_lines

	def count_body_lines(self) -> int:
		return len(self.body_lines)
