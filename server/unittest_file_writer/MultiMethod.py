from itertools import chain
from typing import Iterable, MutableSequence, Sequence

from .Method import Method


class MultiMethod(Method):
	"""
	MultiMethod is a method that combines the bodies of multiple methods.
	Only the bodies of the methods given are used;
	all their other attributes are ignored (overridden by those of MultiMethod).
	"""
	methods: MutableSequence[Method]

	def __init__(self, name: str, parameters='', decoration_lines: Sequence[str] = (), deco_header_sep=(), header_body_sep=(), methods: Iterable[Method] = ()):
		super().__init__(name, parameters, decoration_lines, deco_header_sep, header_body_sep)
		self.methods = []
		self.methods.extend(methods)

	def count_body_lines(self) -> int:
		return sum(method.count_body_lines() for method in self.methods)

	def get_body_lines(self) -> Iterable[str]:
		return chain.from_iterable(method.get_body_lines() for method in self.methods)
