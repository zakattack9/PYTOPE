from docker import from_env
from unittest import TestCase


class docker_image1(TestCase):
	@classmethod
	def setUpClass(cls):
		cls.client = from_env()
		cls.image, cls.logs = cls.client.images.build(path='C:\\Users\\Poppycop\\gitprojects\\python-test-environment\\server\\file_manager\\file_manager_module\\hierarchy\\Dockerfiles', dockerfile='docker_image1', rm=True, forcerm=True)

	@classmethod
	def tearDownClass(cls):
		cls.client.images.remove(image=cls.image.id, force=True)

	def setUp(self):
		cls = type(self)
		self.container = cls.client.containers.run(cls.image, detach=True, tty=True)

	def tearDown(self):
		self.container.remove(force=True)

