from abc import ABC, abstractmethod
from typing import Iterable, Iterator, Sequence

from server.unittest_file_writer.Util import it_get


class LineSequence(Sequence, ABC):
	@abstractmethod
	def get_lines(self) -> Iterable[str]:
		pass

	def write_lines(self, target) -> None:
		for line in self.get_lines():
			target.write(line.rstrip() + '\n')

	def __iter__(self) -> Iterator[str]:
		return iter(self.get_lines())

	def __getitem__(self, index: int) -> str:
		return it_get(it=self.get_lines(), index=index, length=len(self))
