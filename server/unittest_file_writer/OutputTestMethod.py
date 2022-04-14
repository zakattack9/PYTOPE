from enum import Enum
from typing import Iterable, List, Optional, Union

from .Method import Method

_SET_VARS			= 'exit_code, output = '
_RUN				= 'self.container.exec_run('
_IGNORE_OUTPUT		= ', stdout=False, stderr=False)'
_GET_OUTPUT			= ', stdout=True, stderr=True)'

_ASSERT_NO_OUTPUT	= 'self.assertFalse(output)'
_ASSERT_REGEX		= 'self.assertRegex(output, '


class OutputType(Enum):
	NO_VERIFY		= 0
	VERIFY_EMPTY	= 1
	VERIFY_REGEX	= 2


class OutputTestMethod(Method):
	cmd:			Union[str, List[str]]
	output_type:	OutputType
	output_regex:	Optional[str]

	def __init__(self, name: str, cmd: Union[str, List[str]], output_type: OutputType, output_regex: Optional[str] = None):
		super().__init__(name=name, parameters='self')
		self.cmd = cmd
		self.output_type = output_type
		self.output_regex = output_regex

	def count_body_lines(self) -> int:
		return 1 if self.output_type is OutputType.NO_VERIFY else 2

	def get_body_lines(self) -> Iterable[str]:
		if self.output_type is OutputType.NO_VERIFY:
			return _RUN + repr(self.cmd) + _IGNORE_OUTPUT,
		elif self.output_type is OutputType.VERIFY_EMPTY:
			return _SET_VARS + _RUN + repr(self.cmd) + _GET_OUTPUT, _ASSERT_NO_OUTPUT
		elif self.output_type is OutputType.VERIFY_REGEX:
			return _SET_VARS + _RUN + repr(self.cmd) + _GET_OUTPUT, _ASSERT_REGEX + repr(self.output_regex) + ')'
