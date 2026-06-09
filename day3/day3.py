# 1. Lists in Python
# Lists are used to store multiple values in a single variable.
students = ["Divy", "Rahul", "Aman"]

print(students)
print(students[0])
# 2. Tuples in Python
# Tuples are ordered collections that cannot be modified.
colors = ("Red", "Blue", "Green")

print(colors)
print(colors[1])
# 3. Dictionaries in Python
# Dictionaries store data in key-value pairs.
student = {
    "name": "Divy",
    "age": 20,
    "course": "IT"
}

print(student["name"])
print(student["course"])
# 4. Student Management System
# A Student Management System was developed to add, display, and search student records.
students = {}

while True:
    print("\n--- Student Management System ---")
    print("1. Add Student")
    print("2. Display Students")
    print("3. Search Student")
    print("4. Exit")

    choice = int(input("Enter choice: "))

    if choice == 1:
        roll = input("Enter Roll Number: ")
        name = input("Enter Name: ")
        course = input("Enter Course: ")

        students[roll] = {
            "name": name,
            "course": course
        }

        print("Student Added Successfully!")

    elif choice == 2:
        print("\nStudent Records:")

        for roll, details in students.items():
            print("Roll No:", roll)
            print("Name:", details["name"])
            print("Course:", details["course"])
            print("-------------------")

    elif choice == 3:
        roll = input("Enter Roll Number to Search: ")

        if roll in students:
            print("Student Found!")
            print("Name:", students[roll]["name"])
            print("Course:", students[roll]["course"])
        else:
            print("Student Not Found")

    elif choice == 4:
        print("Program Ended")
        break

    else:
        print("Invalid Choice")