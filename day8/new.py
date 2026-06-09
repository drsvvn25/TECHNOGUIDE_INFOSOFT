import speech_recognition as sr


def listen_and_transcribe():
    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        print("Adjusting for ambient noise... Please wait.")
        recognizer.adjust_for_ambient_noise(source, duration=1)
        print("Listening... Speak now!")
        audio_data = recognizer.listen(source)

    try:
        text = recognizer.recognize_google(audio_data)
        print(f"You said: {text}")
    except sr.UnknownValueError:
        print("Sorry, I could not understand the audio.")
    except sr.RequestError as e:
        print(f"Could not request results from the Google service: {e}")


def main():
    print("Speech-to-text demo using your microphone.")
    print("Press Ctrl+C to exit anytime.\n")

    try:
        listen_and_transcribe()
    except OSError as e:
        print(f"Microphone error: {e}")
        print("Make sure your microphone is connected and available.")
    except KeyboardInterrupt:
        print("\nCancelled by user.")


if __name__ == "__main__":
    main()
