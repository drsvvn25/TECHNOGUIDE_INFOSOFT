# 2. Reading CSV Files
# CSV stands for Comma Separated Values. It stores data in table format.
import pandas as pd

data = pd.read_csv("students.csv")

print(data)
# The read_csv() function reads CSV file data and converts it into a DataFrame.
# 3. Student Marks Dataset
import pandas as pd

df = pd.read_csv("students.csv")

print(df)
# A DataFrame is a table structure in Pandas containing rows and columns.
# 4. Calculating Average Marks
df["Average"] = (   
    df["Maths"] +
    df["Science"] +
    df["English"]
) / 3

print(df)
# This code creates a new Average column and calculates average marks.
# 5. Finding Topper Student
topper = df[df["Average"] == df["Average"].max()]

print(topper)
# The max() function finds the highest average marks and filters topper student data.
# 6. Generating Charts
import matplotlib.pyplot as plt

plt.bar(df["Name"], df["Average"])

plt.title("Average Marks")

plt.xlabel("Students")

plt.ylabel("Average")

plt.show()
# Matplotlib is used to generate charts and visualize student performance.
# 7. Complete Student Marks Analyzer Project
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("students.csv")

df["Average"] = (
    df["Maths"] +
    df["Science"] +
    df["English"]
) / 3

print(df)

topper = df[df["Average"] == df["Average"].max()]

print("\nTopper Student:")
print(topper)

plt.bar(df["Name"], df["Average"])

plt.title("Average Marks")

plt.xlabel("Students")

plt.ylabel("Average")

plt.show()
