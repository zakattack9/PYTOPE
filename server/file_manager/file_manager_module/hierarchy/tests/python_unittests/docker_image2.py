from docker import from_env
from unittest import TestCase


class docker_image2(TestCase):
	@classmethod
	def setUpClass(cls):
		cls.client = from_env()
		cls.image, cls.logs = cls.client.images.build(path='/Users/zaksakata/Desktop/Stuff/Coding Projects/python-test-environment/server/file_manager/file_manager_module/hierarchy/Dockerfiles', dockerfile='docker_image2', rm=True, forcerm=True)

	@classmethod
	def tearDownClass(cls):
		cls.client.images.remove(image=cls.image.id, force=True)

	def setUp(self):
		cls = type(self)
		self.container = cls.client.containers.run(cls.image, detach=True, tty=True)

	def tearDown(self):
		self.container.remove(force=True)

	def test3(self):
		self.container.exec_run("git commit -am 'new commit' ", stdout=False, stderr=False)
		exit_code_1, output_1 = self.container.exec_run('git push ', stdout=True, stderr=True)
		self.assertRegex(output_1.decode(), '/some_regex/g')

