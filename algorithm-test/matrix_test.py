from typing import List


def math_matrix(matrix: List[List[int]]) -> int:

    n = len(matrix)
    first_diagonal_sum = sum(matrix[i][i] for i in range(n))
    print(f"First sum:{first_diagonal_sum}")
    second_diagonal_sum = sum(matrix[i][n-i-1] for i in range(n))
    print(f"second diagonal sum:{second_diagonal_sum}")
    return abs(first_diagonal_sum + second_diagonal_sum)


matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
]

test = math_matrix(matrix)
print(f"Last result:{test}")