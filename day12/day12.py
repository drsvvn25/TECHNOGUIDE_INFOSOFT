# =========================================
# Day 12 - NLP Basics
# =========================================
# • Text processing basics
# • Build spam detector
# • Classify text data
# =========================================

import pandas as pd
import nltk
import string
import numpy as np

from nltk.corpus import stopwords
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# =========================================
# Text Processing Basics
# =========================================

def process_text(text):
    """Process text by lowercasing, removing punctuation, and removing stopwords."""
    text = text.lower()
    text = "".join([char for char in text if char not in string.punctuation])
    words = text.split()
    words = [word for word in words if word not in stopwords.words('english')]
    return " ".join(words)

# Download NLTK stopwords if not already downloaded
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

# =========================================
# Example: Text Processing
# =========================================

print("=" * 50)
print("TEXT PROCESSING BASICS")
print("=" * 50)

sample_text = "Hello! This is a sample text with punctuation and some common words like 'the', 'is', 'and'."
print("\nOriginal Text:")
print(sample_text)
print("\nProcessed Text:")
processed = process_text(sample_text)
print(processed)

# =========================================
# Spam Detector
# =========================================

print("\n" + "=" * 50)
print("SPAM DETECTOR")
print("=" * 50)

# Sample spam dataset
data = {
    'message': [
        'Get free money now!',
        'Hey, how are you doing?',
        'Win a free iPhone today!',
        'Meeting at 3pm tomorrow',
        'Congratulations! You won a lottery',
        'Can we reschedule our meeting?',
        'Urgent: Your account has been compromised',
        'Thanks for your help yesterday',
        'Click here to claim your prize',
        'See you at the party tonight',
        'Limited time offer: 50% off',
        'I will send the documents tomorrow',
        'You have been selected for a cash prize',
        'Let me know if you need anything',
        'Double your income in one week',
        'Hope you have a great weekend',
        'Exclusive deal just for you',
        'Please review the attached file',
        'Make money fast with this simple trick',
        'Looking forward to our discussion'
    ],
    'label': [
        'spam',
        'ham',
        'spam',
        'ham',
        'spam',
        'ham',
        'spam',
        'ham',
        'spam',
        'ham',
        'spam',
        'ham',
        'spam',
        'ham',
        'spam',
        'ham',
        'spam',
        'ham',
        'spam',
        'ham'
    ]
}

df = pd.DataFrame(data)
print("\nDataset:")
print(df.head(10))

# Process text
df['processed_message'] = df['message'].apply(process_text)
print("\nProcessed Messages:")
print(df[['message', 'processed_message']].head(5))

# Convert text to numerical features
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(df['processed_message'])
y = df['label'].map({'ham': 0, 'spam': 1})

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train Naive Bayes classifier
classifier = MultinomialNB()
classifier.fit(X_train, y_train)

# Make predictions
y_pred = classifier.predict(X_test)

# Evaluate
print("\nModel Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=['Ham', 'Spam']))

# =========================================
# Test Spam Detector
# =========================================

print("\n" + "=" * 50)
print("TEST SPAM DETECTOR")
print("=" * 50)

test_messages = [
    "Free money available now!",
    "Let's meet for lunch tomorrow",
    "You have won a prize",
    "Please send me the report"
]

for msg in test_messages:
    processed = process_text(msg)
    vectorized = vectorizer.transform([processed])
    prediction = classifier.predict(vectorized)[0]
    label = "Spam" if prediction == 1 else "Ham"
    print(f"\nMessage: {msg}")
    print(f"Prediction: {label}")

# =========================================
# Text Classification Summary
# =========================================

print("\n" + "=" * 50)
print("TEXT CLASSIFICATION SUMMARY")
print("=" * 50)
print("\nSteps for Text Classification:")
print("1. Text Preprocessing (lowercase, remove punctuation, stopwords)")
print("2. Feature Extraction (Convert text to numerical vectors)")
print("3. Train-Test Split")
print("4. Model Training (Naive Bayes, SVM, etc.)")
print("5. Model Evaluation")
print("6. Prediction on new data")
