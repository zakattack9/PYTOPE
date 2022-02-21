# Needed
from docker import from_env
from unittest import TestCase

# Not Needed  (Example Only)
from typing import Iterable
from docker import DockerClient
from docker.models.containers import Container
from docker.models.images import Image
from pathlib import Path


class ExplainedExampleTest(TestCase):
	"""
	This class is an example of a generated test class.
	This serves as a demonstration of the template.
	This class is not actually used.

	The type hints are not necessary, and do not need to be included in the generated test files;
	they are simply here to help explain this example.
	"""
	# Class Attributes
	client:	DockerClient
	image:	Image
	logs:	Iterable

	# Instance Attributes
	container: Container

	@classmethod
	def setUpClass(cls):
		dockerfile = Path()									# variable
		dockerfile_dir = repr(str(dockerfile.parent))  		# inferred variable
		dockerfile_sub_path = repr(dockerfile.name)  		# inferred variable
		cls.client = from_env()								# Generated Line
		cls.image, cls.logs = cls.client.images.build(path=dockerfile_dir, dockerfile=dockerfile_sub_path, rm=True, forcerm=True)  # Generated Line

	@classmethod
	def tearDownClass(cls):
		cls.client.images.remove(image=cls.image.id, force=True)  # Generated Line

	def setUp(self):
		cls = type(self)  # could also have a class_name variable (instead of this line)  ;  Generated Line
		self.container = cls.client.containers.create(cls.image, detach=True)  # Generated Line
		# use the line below instead of the line above if a mount point
		# self.container = cls.client.containers.create(cls.image, detach=True, volumes={'<path_in_main_container>': {'bind': '<path_inside_container>', 'mode': 'rw'}})
		# self.container.put_archive()  # insert files into the container

	def tearDown(self):
		# self.container.get_archive(...)	# extract a specific folder from the container
		# self.container.export(...)		# extract all files from the container
		self.container.remove(force=True)  	# Kill and Remove the container  ;  Generated Line

	def test_dont_verify(self):
		cmd = ...  					# variable ; line not generated
		self.container.exec_run(cmd, stdout=False, stderr=False)  # Generated Line

	def test_verify_no_output(self):
		cmd = ...  					# variable ; line not generated
		exit_code, output = self.container.exec_run(cmd, stdout=True, stderr=True)  # Generated Line
		self.assertFalse(output)  	# allows none or empty string (assertIsNone only allows none)  ;  Generated Line

	def test_verify_with_regex(self):
		cmd = ...  					# variable ; line not generated
		output_regex: str = ...  	# variable ; line not generated
		exit_code, output = self.container.exec_run(cmd, stdout=True, stderr=True)  # Generated Line
		self.assertRegex(output, output_regex)  # Generated Line
