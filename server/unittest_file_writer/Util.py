from typing import Iterable, Sequence


def indent(lines: Iterable[str], prefix='\t'):
	return ((prefix + line) for line in lines)


def it_get(it: Iterable, index: int, length: int):
	if isinstance(it, Sequence):
		return it[index]
	if index >= length:
		raise IndexError(index)
	if index < 0:
		if index < -length:
			raise IndexError(index)
		index += length
	itr = iter(it)
	try:
		for _ in range(index):
			next(itr)
		return next(itr)
	except StopIteration:
		raise IndexError(index)
