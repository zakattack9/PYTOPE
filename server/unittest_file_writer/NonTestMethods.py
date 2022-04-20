from pathlib import Path
from typing import Iterable

from server.unittest_file_writer.Method import Method
from server.unittest_file_writer.StoredMethod import StoredMethod


_CLASS_METHOD_DECORATION_LINES = ('@classmethod',)


class SetUpClassMethod(Method):
	_GET_CLIENT = 'cls.client = from_env()'

	dockerfile:  Path

	def __init__(self, dockerfile: Path, name='setUpClass', parameters='cls'):
		super().__init__(name=name, parameters=parameters, decoration_lines=_CLASS_METHOD_DECORATION_LINES)
		self.dockerfile = dockerfile

	def get_body_lines(self) -> Iterable[str]:
		return SetUpClassMethod._GET_CLIENT, f"cls.image, cls.logs = cls.client.images.build(path={repr(str(self.dockerfile.parent))}, dockerfile={repr(self.dockerfile.name)}, rm=True, forcerm=True)"

	def count_body_lines(self) -> int:
		return 2


class TearDownClassMethod(StoredMethod):
	BODY_LINES = ('cls.client.images.remove(image=cls.image.id, force=True)',)

	def __init__(self, name='tearDownClass', parameters='cls'):
		super().__init__(name=name, parameters=parameters, decoration_lines=_CLASS_METHOD_DECORATION_LINES, body_lines=TearDownClassMethod.BODY_LINES)


class SetUpMethod(StoredMethod):
	BODY_LINES = ('cls = type(self)', 'self.container = cls.client.containers.run(cls.image, detach=True, tty=True)')

	def __init__(self, name='setUp', parameters='self'):
		super().__init__(name=name, parameters=parameters, body_lines=SetUpMethod.BODY_LINES)


class TearDownMethod(StoredMethod):
	BODY_LINES = ('self.container.remove(force=True)',)

	def __init__(self, name='tearDown', parameters='self'):
		super().__init__(name=name, parameters=parameters, body_lines=TearDownMethod.BODY_LINES)
