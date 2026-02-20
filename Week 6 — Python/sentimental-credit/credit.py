from cs50 import get_string
import re

def main():
    while True:
        try:
            number = get_string("Number: ")
            if number is None:
                return  # Handle EOF
            if re.match(r"^\d+$", number):
                break
        except EOFError:
            return

    if check_luhn(number):
        print_card_type(number)
    else:
        print("INVALID")

def check_luhn(number):
    sum = 0
    digits = [int(d) for d in number]
    
    # Iterate from right to left
    for i, digit in enumerate(reversed(digits)):
        if i % 2 == 1:
            product = digit * 2
            sum += (product // 10) + (product % 10)
        else:
            sum += digit
            
    return sum % 10 == 0

def print_card_type(number):
    length = len(number)
    
    if length == 15 and re.match(r"^3[47]", number):
        print("AMEX")
    elif length == 16 and re.match(r"^5[1-5]", number):
        print("MASTERCARD")
    elif (length == 13 or length == 16) and re.match(r"^4", number):
        print("VISA")
    else:
        print("INVALID")

if __name__ == "__main__":
    main()
