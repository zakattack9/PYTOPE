from json import JSONDecodeError, load
from pathlib import Path

from jsonschema import validate
from jsonschema.exceptions import ValidationError

from TestDeisgnsUtil import JSONLoadingError, JSONValidationError, PathOrJSON


class TestDesigns:
	SCHEMA_PATH = Path(__file__).parent.parent / 'TestDesigns.schema.json'

	schema_src:		PathOrJSON
	schema_json:	dict

	def __init__(self, schema: PathOrJSON = SCHEMA_PATH):
		self.schema_src = schema
		self.schema_json = self._load_json(schema)

	def validate(self, test: PathOrJSON):
		"""
		Loads the JSON data (if necessary), then validates it with the schema.
		:param test: The path (Path | str) to the JSON file, or the JSON data itself.
		:return: The validated JSON data.
		:raises JSONLoadingError:		If the JSON could not be loaded.
		:raises JSONValidationError:	If the JSON validation failed.
		"""
		try:
			test_json = self._load_json(test)
		except JSONDecodeError as err:
			raise JSONLoadingError(err, test)
		try:
			validate(instance=test_json, schema=self.schema_json)
		except ValidationError as err:
			raise JSONValidationError(err, test, test_json, self.schema_src, self.schema_json)
		return test_json

	def _load_json(self, to_load: PathOrJSON) -> dict:
		if not isinstance(to_load, dict):
			with open(to_load, 'r') as f:
				to_load = load(f)
		return to_load
