from docker import from_env
from unittest import TestCase
import time

class docker_image2(TestCase):
	@classmethod
	def setUpClass(cls):
		cls.client = from_env()
		cls.image, cls.logs = cls.client.images.build(path='..\\docker', dockerfile='docker_image2', rm=True, forcerm=True)

	@classmethod
	def tearDownClass(cls):
		cls.client.images.remove(image=cls.image.id, force=True)

	def setUp(self):
		cls = type(self)
		self.container = cls.client.containers.run(cls.image, detach=True, tty=True)

	def tearDown(self):
		self.container.remove(force=True)

	def test3_1(self):
		self.container.exec_run("git commit -am 'new commit'", stdout=False, stderr=False)

	def test3_2(self):
		exit_code, output = self.container.exec_run('git push', stdout=True, stderr=True)
		self.assertRegex(output.decode(), '/haydenlhannappel/')

