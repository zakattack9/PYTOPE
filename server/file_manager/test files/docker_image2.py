from docker import from_env
from unittest import TestCase


class docker_image1(TestCase):
	@classmethod
	def setUpClass(cls):
		cls.client = from_env()
		cls.image, cls.logs = cls.client.images.build(path='/home/john/UTFW/DockerFiles', dockerfile='docker_image1', rm=True, forcerm=True)
	
	@classmethod
	def tearDownClass(cls):
		cls.client.images.remove(image=cls.image.id, force=True)
	
	def setUp(self):
		cls = type(self)
		self.container = cls.client.containers.create(cls.image, detach=True)
	
	def tearDown(self):
		self.container.remove(force=True)
	
	def test1_1(self):
		self.container.exec_run("git commit -m 'initial commit'", stdout=False, stderr=False)
	
	def test2_1(self):
		exit_code, output = self.container.exec_run('git add .', stdout=True, stderr=True)
		self.assertFalse(output)
	
