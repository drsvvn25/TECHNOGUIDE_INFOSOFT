# 1. Variables in Python
# Variables are used to store data values in Python. Python automatically assigns the data type based on the value.
name = "Divy"
age = 20
print(name)
print(age)
# 2. Loops in Python
# Loops are used to execute a block of code repeatedly.
for i in range(1, 6):
    print(i)
# 3. Conditional Statements
# Conditional statements are used to make decisions in programs.
num = 10
if num > 0:
    print("Positive Number")
else:
    print("Negative Number")
# 4. Calculator Application
# A simple calculator application was created using Python to perform basic arithmetic operations like addition, subtraction, multiplication, and division.
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

print("1. Addition")
print("2. Subtraction")
print("3. Multiplication")
print("4. Division")

choice = int(input("Enter choice: "))

if choice == 1:
    print("Result:", num1 + num2)
elif choice == 2:
    print("Result:", num1 - num2)
elif choice == 3:
    print("Result:", num1 * num2)
elif choice == 4:
    print("Result:", num1 / num2)
else:
    print("Invalid Choice")
# 5. Age Calculator Mini Project
# An age calculator mini project was created to calculate the user's age based on the birth year.
from datetime import date

birth_year = int(input("Enter your birth year: "))

current_year = date.today().year

age = current_year - birth_year

print("Your age is:", age)

day = int(input("Enter a day number (1-7): "))
# match day:
#     case 1:
#         print("Monday")
#     case 2:
#         print("Tuesday")
#     case 3:
#         print("Wednesday")
#     case _:
#         print("Invalid Day")