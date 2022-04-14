from docker import from_env
from unittest import TestCase

class ExampleTest(TestCase):
	@classmethod
	def setUpClass(cls):
		dockerfile_dir = ...  			# variable ; line not generated
		dockerfile_sub_path = ...  		# variable ; line not generated
		cls.client = from_env()
		cls.image, cls.logs = cls.client.images.build(path=dockerfile_dir, dockerfile=dockerfile_sub_path, rm=True, forcerm=True)

	@classmethod
	def tearDownClass(cls):
		cls.client.images.remove(image=cls.image.id, force=True)

	def setUp(self):
		cls = type(self)
		self.container = cls.client.containers.create(cls.image, detach=True)

	def tearDown(self):
		self.container.remove(force=True)

	def test_dont_verify(self):
		cmd = ...  					# variable ; line not generated
		self.container.exec_run(cmd, stdout=False, stderr=False)

	def test_verify_no_output(self):
		cmd = ...  					# variable ; line not generated
		exit_code, output = self.container.exec_run(cmd, stdout=True, stderr=True)
		self.assertFalse(output)

	def test_verify_with_regex(self):
		cmd = ...  					# variable ; line not generated
		output_regex: str = ...  	# variable ; line not generated
		exit_code, output = self.container.exec_run(cmd, stdout=True, stderr=True)
		self.assertRegex(output, output_regex)
