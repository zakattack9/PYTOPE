from json import JSONDecodeError, load
from pathlib import PurePath
from typing import Union

from jsonschema import validate
from jsonschema.exceptions import ValidationError


""" A union of types, representing JSON data or a Path to a JSON file. """
PathOrJSON = Union[dict, PurePath, str]


class SchemaValidator:
	"""
	The Schema Validator is constructed with a schema.
	Then, JSON files (or data) are passed to the validate method to (load and) validate them.
	"""
	schema_src:		PathOrJSON
	schema_json:	dict

	def __init__(self, schema: PathOrJSON):
		self.schema_src = schema
		self.schema_json = self._load_json(schema)

	def validate(self, instance: PathOrJSON) -> dict:
		"""
		Loads the JSON data (if necessary), then validates it with the schema.
		:param instance: The path (Path | str) to the JSON file, or the JSON data itself.
		:return: The validated JSON data.
		:raises JSONLoadingError:		If the JSON could not be loaded.
		:raises JSONValidationError:	If the JSON validation failed.
		"""
		try:
			instance_json = self._load_json(instance)
		except JSONDecodeError as err:
			raise JSONLoadingError(err, instance)
		try:
			validate(instance=instance_json, schema=self.schema_json)
		except ValidationError as err:
			raise JSONValidationError(err, instance, instance_json, self.schema_src, self.schema_json)
		return instance_json

	def _load_json(self, to_load: PathOrJSON) -> dict:
		if not isinstance(to_load, dict):
			with open(to_load, 'r') as f:
				to_load = load(f)
		return to_load


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
		return f"Validation Error on JSON {repr(self.inst_json)}\n\tfrom source {repr(str(self.inst_src))}"
