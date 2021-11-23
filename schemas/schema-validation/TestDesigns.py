import json
import jsonschema
import os.path
from jsonschema import validate

class testDesigns:
    def __init__(self, testJSONLocation):
        with open(os.path.dirname(__file__) + testJSONLocation) as file:
            self.testJSON = json.load(file)

    def initiateSchema(self):
        with open(os.path.dirname(__file__) + '/../TestDesigns.schema.json', 'r') as file:
            schema = json.load(file)
        return schema

    def validate(self):
        schema = self.initiateSchema()
        try:
            validate(instance=self.testJSON, schema=schema)
        except jsonschema.exceptions.ValidationError as err:
            print(err)
            #err = "Given JSON data is InValid"
            #print(err)
            return False, 
        return True, "Given JSON data is Valid"

    def export(self):
        #declare unittestfilewriter
        #for each test
            # add dockerfile
            # add test
        #unittestfilewriter.write_all()
        return

# code for testing validation working
# test = testDesigns("/../TestDesignsExample.json")
# test.validate()