from json import JSONDecodeError, load

from jsonschema import validate
from jsonschema.exceptions import ValidationError

from SchemaValidatorUtils import JSONLoadingError, JSONValidationError, PathOrJSON


class SchemaValidator:
	schema_src:		PathOrJSON
	schema_json:	dict

	def __init__(self, schema: PathOrJSON):
		self.schema_src = schema
		self.schema_json = self._load_json(schema)

	def validate(self, instance: PathOrJSON):
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
