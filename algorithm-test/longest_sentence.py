def longest_word ( s: str) -> str :
    words = s.split()
    longest = max(words, key=len)


    return longest, len(longest)


s = "Saya sangat senang menjadi software engineering"
longest, length = longest_word(s)
print( f"{longest}: {length} characters")