from enum import Enum
from typing import Iterable, List, Optional, Union

from .Method import Method

_RUN				= 'self.container.exec_run('
_IGNORE_OUTPUT		= ', stdout=False, stderr=False)'
_GET_OUTPUT			= ', stdout=True, stderr=True)'


class OutputType(Enum):
	NO_VERIFY		= 0
	VERIFY_EMPTY	= 1
	VERIFY_REGEX	= 2


class OutputTestMethod(Method):
	cmd:			Union[str, List[str]]
	output_type:	OutputType
	output_regex:	Optional[str]
	test_index:		int

	def __init__(self, name: str, cmd: Union[str, List[str]], output_type: OutputType, output_regex: Optional[str] = None, test_index=0):
		super().__init__(name=name, parameters='self')
		self.cmd = cmd
		self.output_type = output_type
		self.output_regex = output_regex
		self.test_index = test_index

	def count_body_lines(self) -> int:
		return 1 if self.output_type is OutputType.NO_VERIFY else 2

	def get_body_lines(self) -> Iterable[str]:
		if self.output_type is OutputType.NO_VERIFY:
			return _RUN + repr(self.cmd) + _IGNORE_OUTPUT,
		elif self.output_type is OutputType.VERIFY_EMPTY:
			return self._set_vars() + _RUN + repr(self.cmd) + _GET_OUTPUT, self._assert_no_output()
		elif self.output_type is OutputType.VERIFY_REGEX:
			return self._set_vars() + _RUN + repr(self.cmd) + _GET_OUTPUT, self._assert_regex() + repr(self.output_regex) + ')'

	def _set_vars(self):
		return f'exit_code_{self.test_index}, output_{self.test_index} = '

	def _assert_no_output(self):
		return f'self.assertFalse(output_{self.test_index})'

	def _assert_regex(self):
		return f'self.assertRegex(output_{self.test_index}.decode(), '
