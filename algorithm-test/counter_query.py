from typing import List

def count(input: List[str], queries: List[str]) -> List[int]:
    return [input.count(query) for query in queries]


INPUT = ['xc', 'dz', 'bbb', 'dz']
QUERY = ['bbb', 'ac', 'dz']
OUTPUT = count(INPUT, QUERY)
print(OUTPUT)