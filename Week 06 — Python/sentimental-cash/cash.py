from cs50 import get_float

while True:
    try:
        dollars = get_float("Change owed: ")
        if dollars >= 0:
            break
    except ValueError:
        pass

cents = round(dollars * 100)

coins = 0

# Quarters (25¢)
coins += cents // 25
cents %= 25

# Dimes (10¢)
coins += cents // 10
cents %= 10

# Nickels (5¢)
coins += cents // 5
cents %= 5

# Pennies (1¢)
coins += cents

print(coins)
