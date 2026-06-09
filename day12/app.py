import os
import string
import pandas as pd
import numpy as np
import nltk
from flask import Flask, render_template, jsonify, request
from nltk.corpus import stopwords
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

# Download NLTK stopwords
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

app = Flask(__name__)

# Initial training dataset
initial_data = [
    {"id": 0, "message": "Get free money now!", "label": "spam"},
    {"id": 1, "message": "Hey, how are you doing?", "label": "ham"},
    {"id": 2, "message": "Win a free iPhone today!", "label": "spam"},
    {"id": 3, "message": "Meeting at 3pm tomorrow", "label": "ham"},
    {"id": 4, "message": "Congratulations! You won a lottery", "label": "spam"},
    {"id": 5, "message": "Can we reschedule our meeting?", "label": "ham"},
    {"id": 6, "message": "Urgent: Your account has been compromised", "label": "spam"},
    {"id": 7, "message": "Thanks for your help yesterday", "label": "ham"},
    {"id": 8, "message": "Click here to claim your prize", "label": "spam"},
    {"id": 9, "message": "See you at the party tonight", "label": "ham"},
    {"id": 10, "message": "Limited time offer: 50% off", "label": "spam"},
    {"id": 11, "message": "I will send the documents tomorrow", "label": "ham"},
    {"id": 12, "message": "You have been selected for a cash prize", "label": "spam"},
    {"id": 13, "message": "Let me know if you need anything", "label": "ham"},
    {"id": 14, "message": "Double your income in one week", "label": "spam"},
    {"id": 15, "message": "Hope you have a great weekend", "label": "ham"},
    {"id": 16, "message": "Exclusive deal just for you", "label": "spam"},
    {"id": 17, "message": "Please review the attached file", "label": "ham"},
    {"id": 18, "message": "Make money fast with this simple trick", "label": "spam"},
    {"id": 19, "message": "Looking forward to our discussion", "label": "ham"}
]

# Global state
dataset = list(initial_data)
next_id = 20
vectorizer = None
classifier = None
model_stats = {}

def process_text_steps(text):
    """Processes text and returns step-by-step intermediate results."""
    steps = {
        "original": text,
        "lowercase": text.lower(),
        "no_punctuation": "",
        "tokens": [],
        "no_stopwords": []
    }
    
    # Remove punctuation
    steps["no_punctuation"] = "".join([char for char in steps["lowercase"] if char not in string.punctuation])
    
    # Split into words (tokens)
    steps["tokens"] = steps["no_punctuation"].split()
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    steps["no_stopwords"] = [word for word in steps["tokens"] if word not in stop_words]
    
    # Final processed output
    steps["processed"] = " ".join(steps["no_stopwords"])
    
    return steps

def process_text(text):
    """Simple text preprocessing (lowercasing, punctuation, stopwords)."""
    return process_text_steps(text)["processed"]

def train_model():
    """Trains the vectorizer and Naive Bayes classifier on the current dataset."""
    global vectorizer, classifier, model_stats
    
    if len(dataset) < 4:
        model_stats = {"error": "Dataset is too small to train (minimum 4 samples required)."}
        return False
        
    df = pd.DataFrame(dataset)
    df['processed_message'] = df['message'].apply(process_text)
    
    # Clean out empty messages after preprocessing to avoid count vectorizer errors
    df = df[df['processed_message'].str.strip() != ""]
    
    # Count unique classes
    classes = df['label'].unique()
    if len(classes) < 2:
        model_stats = {"error": "Dataset must contain both 'ham' and 'spam' classes to train."}
        return False
        
    vectorizer = CountVectorizer()
    X = vectorizer.fit_transform(df['processed_message'])
    y = df['label'].map({'ham': 0, 'spam': 1})
    
    # Split if there are enough samples, else train on everything
    if len(df) >= 8:
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.3, random_state=42, stratify=y
        )
        classifier = MultinomialNB()
        classifier.fit(X_train, y_train)
        
        y_pred = classifier.predict(X_test)
        acc = accuracy_score(y_test, y_pred)
        
        # Calculate precision, recall, f1
        precision, recall, f1, _ = precision_recall_fscore_support(
            y_test, y_pred, average='binary', zero_division=0
        )
        
        # Also train a full model on all data for production predictions
        full_classifier = MultinomialNB()
        full_classifier.fit(X, y)
        active_classifier = full_classifier
    else:
        classifier = MultinomialNB()
        classifier.fit(X, y)
        active_classifier = classifier
        acc = 1.0  # Perfect fit on small dataset
        precision, recall, f1 = 1.0, 1.0, 1.0
        
    # Re-assign main classifier as the trained model (or active_classifier)
    classifier = active_classifier
    
    # Get top terms in vocabulary for UI visualization
    feature_names = vectorizer.get_feature_names_out()
    
    # Sum word occurrences
    spam_docs = df[df['label'] == 'spam']['processed_message']
    ham_docs = df[df['label'] == 'ham']['processed_message']
    
    spam_words = {}
    ham_words = {}
    
    for doc in spam_docs:
        for word in doc.split():
            spam_words[word] = spam_words.get(word, 0) + 1
            
    for doc in ham_docs:
        for word in doc.split():
            ham_words[word] = ham_words.get(word, 0) + 1
            
    top_spam = sorted(spam_words.items(), key=lambda x: x[1], reverse=True)[:10]
    top_ham = sorted(ham_words.items(), key=lambda x: x[1], reverse=True)[:10]
    
    # Calculate stats
    model_stats = {
        "accuracy": float(acc),
        "precision": float(precision),
        "recall": float(recall),
        "f1_score": float(f1),
        "total_samples": len(df),
        "spam_samples": int((df['label'] == 'spam').sum()),
        "ham_samples": int((df['label'] == 'ham').sum()),
        "top_spam_words": [{"word": w, "count": c} for w, c in top_spam],
        "top_ham_words": [{"word": w, "count": c} for w, c in top_ham],
        "error": None
    }
    return True

# Run initial training
train_model()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/dataset', methods=['GET'])
def get_dataset():
    return jsonify(dataset)

@app.route('/api/dataset', methods=['POST'])
def add_message():
    global next_id
    data = request.json
    if not data or 'message' not in data or 'label' not in data:
        return jsonify({"success": False, "error": "Invalid request parameters."}), 400
        
    message = data['message'].strip()
    label = data['label'].strip().lower()
    
    if not message:
        return jsonify({"success": False, "error": "Message content cannot be empty."}), 400
    if label not in ['spam', 'ham']:
        return jsonify({"success": False, "error": "Label must be either 'spam' or 'ham'."}), 400
        
    new_item = {
        "id": next_id,
        "message": message,
        "label": label
    }
    dataset.append(new_item)
    next_id += 1
    
    success = train_model()
    return jsonify({
        "success": success,
        "item": new_item,
        "stats": model_stats,
        "error": model_stats.get("error")
    })

@app.route('/api/dataset/<int:item_id>', methods=['DELETE'])
def delete_message(item_id):
    global dataset
    
    # Find item
    item_index = -1
    for i, item in enumerate(dataset):
        if item['id'] == item_id:
            item_index = i
            break
            
    if item_index == -1:
        return jsonify({"success": False, "error": "Item not found."}), 404
        
    # Prevent deleting if class counts fall too low
    temp_dataset = list(dataset)
    temp_dataset.pop(item_index)
    
    spams = sum(1 for x in temp_dataset if x['label'] == 'spam')
    hams = sum(1 for x in temp_dataset if x['label'] == 'ham')
    
    if spams < 2 or hams < 2:
        return jsonify({
            "success": False, 
            "error": "Cannot delete. The dataset must maintain at least 2 spam and 2 ham messages to retrain the model."
        }), 400
        
    deleted_item = dataset.pop(item_index)
    success = train_model()
    
    return jsonify({
        "success": success,
        "deleted_id": item_id,
        "stats": model_stats,
        "error": model_stats.get("error")
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    if not data or 'message' not in data:
        return jsonify({"success": False, "error": "No message provided."}), 400
        
    msg = data['message']
    
    # Step-by-step processing
    steps = process_text_steps(msg)
    processed = steps["processed"]
    
    if not processed.strip():
        return jsonify({
            "success": True,
            "prediction": "ham", # Default fallback
            "confidence": 0.5,
            "probabilities": {"ham": 0.5, "spam": 0.5},
            "steps": steps,
            "warning": "The text was completely filtered out by preprocessing (only stopwords/punctuation). Defaulting to Ham."
        })
        
    if not classifier or not vectorizer:
        return jsonify({"success": False, "error": "Model is not trained. Check dataset size and class balance."}), 500
        
    try:
        vectorized = vectorizer.transform([processed])
        prediction = classifier.predict(vectorized)[0]
        prob = classifier.predict_proba(vectorized)[0]
        
        # map back
        label = "spam" if prediction == 1 else "ham"
        confidence = float(prob[prediction])
        
        return jsonify({
            "success": True,
            "prediction": label,
            "confidence": confidence,
            "probabilities": {
                "ham": float(prob[0]),
                "spam": float(prob[1])
            },
            "steps": steps
        })
    except Exception as e:
        return jsonify({"success": False, "error": f"Prediction error: {str(e)}"}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    return jsonify(model_stats)

@app.route('/api/reset', methods=['POST'])
def reset_dataset():
    global dataset, next_id
    dataset = list(initial_data)
    next_id = 20
    success = train_model()
    return jsonify({
        "success": success,
        "stats": model_stats
    })

if __name__ == '__main__':
    # Running on local development server
    app.run(debug=True, host='0.0.0.0', port=5000)
