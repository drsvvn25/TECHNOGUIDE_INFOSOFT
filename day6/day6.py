# Import Required Libraries
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# -------------------------------
# Step 1: Create Dataset
# -------------------------------

data = {
    "Size": [1000, 1500, 2000, 2500, 3000],
    "Price": [200000, 300000, 400000, 500000, 600000]
}

# Convert data into DataFrame
df = pd.DataFrame(data)

# Display Dataset
print("House Price Dataset")
print(df)

# -------------------------------
# Step 2: Prepare Input and Output
# -------------------------------

# Input Data (House Size)
X = df[["Size"]]

# Output Data (House Price)
y = df["Price"]

# -------------------------------
# Step 3: Create Machine Learning Model
# -------------------------------

model = LinearRegression()

# -------------------------------
# Step 4: Train the Model
# -------------------------------

model.fit(X, y)

print("\nModel Trained Successfully!")

# -------------------------------
# Step 5: Predict House Price
# -------------------------------

# Get user input for house size
house_size = float(input("\nEnter House Size (in sq ft): "))

# Use DataFrame to maintain feature names and avoid the warning
prediction = model.predict(pd.DataFrame({"Size": [house_size]}))

# Convert USD to INR (1 USD = 83 INR approximately)
usd_price = prediction[0]
inr_price = usd_price * 83

print(f"Predicted House Price for {house_size} sq ft:")
print(f"  USD: ${usd_price:,.2f}")
print(f"  INR: ₹{inr_price:,.2f}")

# -------------------------------
# Step 6: Graph Visualization
# -------------------------------

# Scatter Plot
plt.scatter(df["Size"], df["Price"], color='blue', label='Actual Data')

# Plot Regression Line
plt.plot(df["Size"], model.predict(X), color='red', linewidth=2, label='Regression Line')

# Plot Predicted Point
plt.scatter([house_size], [usd_price], color='green', s=100, marker='*', label='Predicted Point')

# Labels
plt.xlabel("House Size (sq ft)")
plt.ylabel("House Price")

# Title
plt.title("House Price Prediction using Machine Learning")

# Add Legend
plt.legend()

# Add Grid
plt.grid(True, alpha=0.3)

# Display Graph
plt.show()