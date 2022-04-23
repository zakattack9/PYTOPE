import unittest


class Testing(unittest.TestCase):
    def test_string(self):
        a = 'some'
        b = 'somes'
        self.assertEqual(a, b)

    def test_boolean(self):
        a = True
        b = False
        self.assertEqual(a, b)

if __name__ == '__main__':
    unittest.main()