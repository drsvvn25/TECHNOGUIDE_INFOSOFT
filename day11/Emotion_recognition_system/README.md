# Emotion Recognition System

A real-time facial emotion recognition system using TensorFlow and OpenCV.

## Features

- Detects and classifies facial emotions in real-time
- Supports PC webcam and Android mobile camera
- Uses transfer learning with pre-trained TensorFlow models
- Recognizes emotions: Happy, Sad, Angry, Fear, Neutral, Disgust, Surprised

## Requirements

- Python 3.6+
- TensorFlow
- OpenCV
- NumPy

### Installation

```bash
pip install tensorflow opencv-python numpy
```

## Quick Start (With Pre-trained Model)

The project includes a pre-trained model (`retrained_graph.pb` and `retrained_labels.txt`), so you can run emotion recognition immediately without training.

### Option 1: PC Webcam

```bash
cd Emotion_recognition_system
python recognition_webcam.py
```

- Press **ESC** to exit

### Option 2: Android Mobile Camera

1. Install **IPWebcam** app on your Android phone
2. Start the server in the app
3. Edit `android_recognition.py` line 14:
   - Replace `http://192.168.0.101:8080/shot.jpg` with your phone's IP address
4. Run:
```bash
python android_recognition.py
```

## Training Your Own Model (Optional)

If you want to train with your own dataset:

### Step 1: Prepare Dataset

1. Create an `images` folder in the project directory
2. Create subfolders for each emotion: `Happy`, `Sad`, `Angry`, `Fear`, `Neutral`, `Disgust`, `Surprised`
3. Download ~300 images per emotion (use batch downloader or record video and extract frames)
4. Place images in corresponding subfolders

### Step 2: Preprocess Images

1. Copy `Face_crop.py` and `haarcascade_frontalface_alt.xml` into each emotion folder
2. Run `Face_crop.py` in each folder:
   - Detects faces from images
   - Converts to grayscale
   - Saves cropped face images

### Step 3: Train the Model

1. Copy the training command from `training code.txt`
2. Open CMD in the project folder
3. Paste the command and run
4. Training takes 20-25 minutes
5. Creates `retrained_graph.pb` and `retrained_labels.txt`

### Step 4: Run Recognition

```bash
python recognition_webcam.py
```

## Project Structure

```
Emotion_recognition_system/
├── recognition_webcam.py       # PC webcam recognition
├── android_recognition.py      # Mobile camera recognition
├── label_image.py              # Image classification
├── Face_crop.py                # Face detection and cropping
├── capture_training_images.py # Capture training images
├── retrain.py                  # TensorFlow training script
├── retrained_graph.pb          # Trained model (17MB)
├── retrained_labels.txt        # Emotion labels
├── haarcascade_frontalface_alt.xml     # Face detection classifier
├── haarcascade_frontalface_default.xml  # Alternative face detector
├── images/                     # Training images folder
│   ├── Happy/
│   ├── Sad/
│   ├── Angry/
│   ├── Fear/
│   ├── Neutral/
│   ├── Disgust/
│   └── Surprised/
└── Sample/                     # Sample files
```

## How It Works

1. **Face Detection**: Uses Haar Cascade classifiers (XML files) to detect faces in video frames
2. **Face Cropping**: Extracts detected face regions
3. **Emotion Classification**: Uses TensorFlow model to classify emotions from face images
4. **Real-time Display**: Shows emotion labels with colored bounding boxes

## XML Files Explained

- `haarcascade_frontalface_alt.xml` - More accurate face detection (recommended)
- `haarcascade_frontalface_default.xml` - More sensitive, detects more faces (including false positives)

These files contain pre-trained Haar Cascade classifiers for face detection using OpenCV.

## Notes

- Requires high processing power (8GB RAM + 2GB GPU recommended)
- Accuracy depends on training data quality
- Noisy or low-quality images reduce accuracy
- Not as accurate as human emotion recognition
- Training requires ~300 images per emotion for best results

## Troubleshooting

- **Module not found errors**: Run `pip install tensorflow opencv-python numpy`
- **Face not detected**: Ensure good lighting and face is clearly visible
- **Low accuracy**: Use more training images with better quality
- **Slow performance**: Reduce image size or use a GPU

## License

See LICENSE file for details. 
