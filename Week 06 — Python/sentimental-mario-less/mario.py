from cs50 import get_int

while True:
    try:
        height = get_int("Height: ")
        if 1 <= height <= 8:
            break
    except ValueError:
        pass

for i in range(1, height + 1):
    print(" " * (height - i) + "#" * i)
