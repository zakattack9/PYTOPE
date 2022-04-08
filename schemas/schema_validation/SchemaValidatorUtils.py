from json import JSONDecodeError
from pathlib import PurePath
from typing import Union

from jsonschema.exceptions import ValidationError


""" A union of types, representing JSON data or a Path to a JSON file. """
PathOrJSON = Union[dict, PurePath, str]


class JSONErrorWrapper(Exception):
	err: Exception
	inst_src: PathOrJSON

	def __init__(self, err: Exception, inst_src: PathOrJSON):
		self.err = err
		self.inst_src = inst_src


class JSONLoadingError(JSONErrorWrapper):
	err: JSONDecodeError

	def __init__(self, err: JSONDecodeError, inst_src: PathOrJSON):
		super().__init__(err, inst_src)

	def __str__(self):
		return f"Could not load JSON from {repr(str(self.inst_src))}"


class JSONValidationError(JSONErrorWrapper):
	err:			ValidationError
	inst_json:		dict
	schema_src:		PathOrJSON
	schema_json:	dict

	def __init__(self, err: ValidationError, inst_src: PathOrJSON, inst_json: dict, schema_src: PathOrJSON, schema_json: dict):
		super().__init__(err, inst_src)
		self.inst_json = inst_json
		self.schema_src = schema_src
		self.schema_json = schema_json

	def __str__(self):
		return f"Validation Error on JSON {repr(self.inst_json)} from source {repr(str(self.inst_src))}"
