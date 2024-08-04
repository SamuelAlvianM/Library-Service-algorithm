def reverse_alphabets(s: str) -> str :

    letter = [char for char in s if char.isalpha()]
    number = [char for char in s if char.isdigit()]

    reverse_alphabets = ''.join(letter[::-1])
    return reverse_alphabets + ''.join(number)



test = "NEGIE1"
result = reverse_alphabets(test)
print(result)