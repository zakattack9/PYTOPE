from docker import from_env
from unittest import TestCase


class docker_image1(TestCase):
	@classmethod
	def setUpClass(cls):
		cls.client = from_env()
		cls.image, cls.logs = cls.client.images.build(path='/Users/zaksakata/Desktop/Stuff/Coding Projects/python-test-environment/server/file_manager/file_manager_module/hierarchy/Dockerfiles', dockerfile='docker_image1', rm=True, forcerm=True)

	@classmethod
	def tearDownClass(cls):
		cls.client.images.remove(image=cls.image.id, force=True)

	def setUp(self):
		cls = type(self)
		self.container = cls.client.containers.run(cls.image, detach=True, tty=True)

	def tearDown(self):
		self.container.remove(force=True)

	def test1_1(self):
		self.container.exec_run("git commit -m 'initial commit' ", stdout=False, stderr=False)

	def test1_2(self):
		self.container.exec_run('git pull origin main ', stdout=False, stderr=False)

	def test2_1(self):
		exit_code, output = self.container.exec_run('git add . ', stdout=True, stderr=True)
		self.assertFalse(output)

	def test2_2(self):
		exit_code, output = self.container.exec_run("git commit -m 'finished styling' ", stdout=True, stderr=True)
		self.assertFalse(output)

	def test2_3(self):
		exit_code, output = self.container.exec_run('git pull ', stdout=True, stderr=True)
		self.assertFalse(output)

