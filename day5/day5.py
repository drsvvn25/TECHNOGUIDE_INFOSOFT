import pandas as pd
import statistics
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Load Student Data from CSV
df_students = pd.read_csv("../day4/students.csv")
print("Student Data:")
print(df_students)
print()

# Calculate statistics for each subject
for subject in ["Maths", "Science", "English"]:
    marks = df_students[subject].tolist()
    mean = sum(marks) / len(marks)
    median = statistics.median(marks)
    print(f"{subject} - Mean: {mean:.1f}, Median: {median:.1f}")

print()

# Pie Chart Visualization
plt.figure(figsize=(8, 8))
avg_marks = [df_students["Maths"].mean(), df_students["Science"].mean(), df_students["English"].mean()]
plt.pie(avg_marks, labels=["Maths", "Science", "English"], autopct='%1.1f%%', startangle=90)
plt.title("Average Marks Distribution by Subject")
plt.show()

# Histogram Visualization
plt.figure(figsize=(12, 4))
for i, subject in enumerate(["Maths", "Science", "English"], 1):
    plt.subplot(1, 3, i)
    plt.hist(df_students[subject], bins=5, edgecolor='black', alpha=0.7)
    plt.title(f"{subject} Marks Distribution")
    plt.xlabel("Marks")
    plt.ylabel("Frequency")
plt.tight_layout()
plt.show()

print()

# Dataset for Linear Regression (Maths marks as target)
data = {
    "Hours": [1, 2, 3, 4, 5],
    "Marks": [20, 40, 60, 80, 100]
}

df = pd.DataFrame(data)

# Input and Output
X = df[["Hours"]]
y = df["Marks"]

# Create and Train Model
model = LinearRegression()
model.fit(X, y)

# Prediction with proper DataFrame format
prediction_df = pd.DataFrame({"Hours": [6]})
prediction = model.predict(prediction_df)

print("Predicted Marks:", prediction)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      