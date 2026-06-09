import cv2
import os
import time

emotions = ["Angry", "Happy", "Sad", "Surprised", "Neutral", "Fear", "Disgust"]
images_per_emotion = 30

cap = cv2.VideoCapture(0)

for emotion in emotions:
    emotion_dir = f"images/{emotion}"
    
    # Make sure directory exists
    if not os.path.exists(emotion_dir):
        os.makedirs(emotion_dir)
    
    print(f"\n{'='*50}")
    print(f"Capturing {emotion} - Make the {emotion.lower()} expression!")
    print(f"{'='*50}")
    print(f"Make sure your face is clearly visible in the frame.")
    print(f"Press SPACE to start capturing 30 images")
    print(f"Press ESC to skip to next emotion")
    
    # Wait for user signal to start
    start_capture = False
    while not start_capture:
        ret, frame = cap.read()
        if ret:
            cv2.imshow(f"Get ready for {emotion} - Press SPACE to start", frame)
            key = cv2.waitKey(1) & 0xFF
            if key == 32:  # SPACE
                start_capture = True
            elif key == 27:  # ESC
                break
    
    if not start_capture:
        continue
    
    # Capture images
    count = 0
    start_time = time.time()
    while count < images_per_emotion:
        ret, frame = cap.read()
        if ret:
            # Save image
            filename = f"{emotion_dir}/image_{count:03d}.jpg"
            cv2.imwrite(filename, frame)
            count += 1
            
            # Display progress
            cv2.putText(frame, f"{emotion} - {count}/{images_per_emotion}", 
                       (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            cv2.imshow(f"Capturing {emotion}", frame)
            
            # Small delay to avoid capturing same frame
            cv2.waitKey(100)
            
            print(f"  Captured {count}/{images_per_emotion}", end='\r')
    
    print(f"\n✓ Completed {emotion}")
    time.sleep(1)

cap.release()
cv2.destroyAllWindows()
print("\n" + "="*50)
print("Image capture complete!")
print("="*50)
