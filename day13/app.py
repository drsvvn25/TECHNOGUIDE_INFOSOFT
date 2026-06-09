import streamlit as st
import speech_recognition as sr
from gtts import gTTS
import datetime
import webbrowser
import os
import random
import time
import re

# Set page config
st.set_page_config(
    page_title="VoiceAI Assistant - Day 13 Lab",
    page_icon="🎙️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling (Glassmorphism & Sleek Dark theme)
st.markdown("""
<style>
    /* Import outfit font */
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    
    /* Global styles */
    .reportview-container {
        background: #0a0d16;
    }
    
    h1, h2, h3, h4, h5, h6 {
        font-family: 'Outfit', sans-serif !important;
        font-weight: 700 !important;
    }
    
    .stApp {
        background: radial-gradient(circle at 90% 10%, rgba(99, 102, 241, 0.08) 0%, rgba(10, 13, 22, 1) 70%);
        color: #f3f4f6;
    }
    
    /* Card design */
    .glass-card {
        background: rgba(22, 30, 46, 0.6);
        border: 1px solid rgba(34, 46, 71, 0.7);
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 20px;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .glass-card:hover {
        border-color: rgba(99, 102, 241, 0.4);
        box-shadow: 0 12px 40px 0 rgba(99, 102, 241, 0.1);
    }
    
    /* Pulse button styling */
    .pulse-btn-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
    }
    
    /* Custom wave animation */
    .wave-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        height: 60px;
        margin: 15px 0;
    }
    
    .wave-bar {
        width: 4px;
        height: 10px;
        background-color: #6366f1;
        border-radius: 2px;
        animation: wave-anim 1.2s ease-in-out infinite;
    }
    
    .wave-bar:nth-child(2) { animation-delay: 0.1s; height: 20px; background-color: #8b5cf6; }
    .wave-bar:nth-child(3) { animation-delay: 0.2s; height: 35px; background-color: #a78bfa; }
    .wave-bar:nth-child(4) { animation-delay: 0.3s; height: 45px; background-color: #a78bfa; }
    .wave-bar:nth-child(5) { animation-delay: 0.4s; height: 30px; background-color: #8b5cf6; }
    .wave-bar:nth-child(6) { animation-delay: 0.5s; height: 15px; background-color: #6366f1; }
    
    @keyframes wave-anim {
        0%, 100% { transform: scaleY(0.3); }
        50% { transform: scaleY(1.2); }
    }
    
    /* Command badge */
    .cmd-badge {
        font-family: 'JetBrains Mono', monospace;
        font-size: 13px;
        background-color: rgba(99, 102, 241, 0.15);
        color: #a5b4fc;
        padding: 4px 10px;
        border-radius: 6px;
        border: 1px solid rgba(99, 102, 241, 0.3);
        margin-right: 8px;
        margin-bottom: 8px;
        display: inline-block;
    }
    
    /* Notes list styling */
    .note-item {
        border-left: 3px solid #8b5cf6;
        padding-left: 12px;
        margin-bottom: 12px;
        font-size: 14px;
        background-color: rgba(255, 255, 255, 0.02);
        padding-top: 8px;
        padding-bottom: 8px;
        border-radius: 0 8px 8px 0;
    }
    .note-date {
        font-size: 11px;
        color: #9ca3af;
        margin-bottom: 2px;
    }
    
    /* Custom status text */
    .status-listening {
        color: #f43f5e;
        font-weight: 600;
        animation: blink 1.5s infinite;
    }
    
    @keyframes blink {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
    }
</style>
""", unsafe_allow_html=True)

# ----------------------------------------------------
# HELPER FUNCTIONS
# ----------------------------------------------------

def generate_voice_audio(text):
    """Generates audio using gTTS and returns filename."""
    try:
        tts = gTTS(text=text, lang='en')
        filename = "temp_response.mp3"
        tts.save(filename)
        return filename
    except Exception as e:
        st.error(f"TTS Generation Error: {e}")
        return None

def read_notes():
    """Reads saved notes from notes.txt."""
    if os.path.exists("notes.txt"):
        try:
            with open("notes.txt", "r") as f:
                return [line.strip() for line in f.readlines() if line.strip()]
        except Exception:
            return []
    return []

def save_note(note_text):
    """Saves a note to notes.txt with a timestamp."""
    try:
        with open("notes.txt", "a") as f:
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
            f.write(f"[{timestamp}] {note_text}\n")
        return True
    except Exception:
        return False

def clear_notes_file():
    """Clears all notes from notes.txt."""
    try:
        if os.path.exists("notes.txt"):
            os.remove("notes.txt")
        return True
    except Exception:
        return False

# Initialize session states
if 'chat_history' not in st.session_state:
    st.session_state.chat_history = []

if 'audio_file' not in st.session_state:
    st.session_state.audio_file = None

if 'last_transcription' not in st.session_state:
    st.session_state.last_transcription = ""

if 'last_response' not in st.session_state:
    st.session_state.last_response = ""

if 'last_action' not in st.session_state:
    st.session_state.last_action = None

# ----------------------------------------------------
# COMMAND EXECUTOR
# ----------------------------------------------------
def execute_command(command):
    """Executes a command and returns the response string + any action metadata."""
    cmd = command.lower().strip()
    response = ""
    action_meta = {}

    if not cmd:
        return "I didn't catch anything. Please try speaking again.", {}

    # 1. Date & Time
    if "time" in cmd:
        now = datetime.datetime.now()
        current_time = now.strftime("%I:%M %p")
        response = f"The current time is {current_time}."
        action_meta = {"type": "clock", "value": current_time}
        
    elif "date" in cmd or "day" in cmd:
        now = datetime.datetime.now()
        current_date = now.strftime("%A, %B %d, %Y")
        response = f"Today is {current_date}."
        action_meta = {"type": "calendar", "value": current_date}

    # 2. Web browser launchers
    elif "open youtube" in cmd:
        response = "Opening YouTube for you."
        webbrowser.open("https://www.youtube.com")
        action_meta = {"type": "link", "url": "https://www.youtube.com", "label": "YouTube"}
        
    elif "open google" in cmd:
        response = "Opening Google."
        webbrowser.open("https://www.google.com")
        action_meta = {"type": "link", "url": "https://www.google.com", "label": "Google"}
        
    elif "open github" in cmd:
        response = "Opening GitHub."
        webbrowser.open("https://www.github.com")
        action_meta = {"type": "link", "url": "https://www.github.com", "label": "GitHub"}

    elif "search for" in cmd:
        query = cmd.split("search for")[-1].strip()
        if query:
            response = f"Searching Google for '{query}'."
            webbrowser.open(f"https://www.google.com/search?q={query}")
            action_meta = {"type": "search", "query": query, "url": f"https://www.google.com/search?q={query}"}
        else:
            response = "What would you like me to search for?"

    # 3. Note Taking
    elif "write a note" in cmd or "take a note" in cmd:
        note_content = cmd.replace("write a note", "").replace("take a note", "").strip()
        if note_content:
            success = save_note(note_content)
            if success:
                response = f"I've saved your note: '{note_content}'"
                action_meta = {"type": "note_saved", "text": note_content}
            else:
                response = "Sorry, I had an error writing the note."
        else:
            response = "I heard you wanted to write a note. Please tell me what to write."
            action_meta = {"type": "note_pending"}

    elif "read notes" in cmd or "read my notes" in cmd:
        notes = read_notes()
        if notes:
            response = f"I found {len(notes)} notes. The last one is: '{notes[-1].split(']')[-1].strip()}'"
            action_meta = {"type": "read_notes", "list": notes}
        else:
            response = "You don't have any notes saved yet. Tell me 'write a note' to add one."

    # 4. Calculator
    elif "calculate" in cmd or "compute" in cmd:
        expression = cmd.replace("calculate", "").replace("compute", "").strip()
        parsed_expr = expression.replace("plus", "+").replace("minus", "-").replace("times", "*").replace("multiplied by", "*").replace("divided by", "/").replace("divide", "/")
        try:
            clean_expr = "".join([c for c in parsed_expr if c in "0123456789+-*/. ()"])
            result = eval(clean_expr.strip())
            response = f"The answer to {expression} is {result}."
            action_meta = {"type": "math", "expr": expression, "result": result}
        except Exception:
            response = "Sorry, I could not compute that. Please say an expression like: 25 times 4."

    # 5. Jokes
    elif "joke" in cmd:
        jokes = [
            "Why do programmers wear glasses? Because they can't C-sharp!",
            "There are 10 types of people in the world: those who understand binary, and those who don't.",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
            "What is a programmer's favorite hangout place? Foo Bar!",
            "Why did the computer go to the doctor? Because it had a virus!"
        ]
        chosen_joke = random.choice(jokes)
        response = chosen_joke
        action_meta = {"type": "joke", "text": chosen_joke}

    # 6. Help/About
    elif "who are you" in cmd or "about yourself" in cmd:
        response = "I am your Day 13 Voice Assistant. I can tell the time, execute Google searches, calculate arithmetic, save text notes, and tell jokes."
        action_meta = {"type": "info"}

    # 7. Unrecognized
    else:
        response = f"I heard you say: '{command}'. Try asking for the time, tell me a joke, or calculate something."
        action_meta = {"type": "unrecognized"}

    return response, action_meta

# ----------------------------------------------------
# LAYOUT & INTERFACE
# ----------------------------------------------------

# Sidebar Notes & Controls
with st.sidebar:
    st.markdown("## ⚙️ Voice Settings")
    
    # Simple speech speed modifier
    speed_option = st.selectbox(
        "Voice Assistant Speed",
        ["Slow", "Normal", "Fast"],
        index=1
    )
    
    st.markdown("---")
    st.markdown("## 📝 Saved Notes")
    notes = read_notes()
    if notes:
        for note in notes[-8:]:  # Show last 8 notes
            # Extract timestamp and message
            parts = note.split("]", 1)
            time_str = parts[0].replace("[", "") if len(parts) > 1 else ""
            msg_str = parts[1].strip() if len(parts) > 1 else note
            
            st.markdown(f"""
            <div class="note-item">
                <div class="note-date">🕒 {time_str}</div>
                <div>{msg_str}</div>
            </div>
            """, unsafe_allow_html=True)
            
        if st.button("🗑️ Clear All Notes"):
            if clear_notes_file():
                st.success("Notes cleared!")
                time.sleep(0.5)
                st.rerun()
    else:
        st.info("No saved notes. Speak 'Write a note: Buy groceries' to test.")

# Main Application Banner
st.markdown("""
<div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-size: 40px; margin-bottom: 5px;">🎙️ Voice AI Assistant</h1>
    <p style="color: #9ca3af; font-size: 16px;">Day 13 - Speech Recognition & Command Execution Laboratory</p>
</div>
""", unsafe_allow_html=True)

# Main Grid (Left Column: Input/Output, Right Column: Theory/Specs)
col_left, col_right = st.columns([1.3, 1])

with col_left:
    st.markdown('<div class="glass-card">', unsafe_allow_html=True)
    st.subheader("🤖 Command Dashboard")
    
    input_mode = st.radio("Choose Input Mode", ["🎙️ Live Microphone", "📤 Upload Audio File", "⌨️ Text Command"], horizontal=True)
    
    # 1. LIVE MICROPHONE
    if input_mode == "🎙️ Live Microphone":
        st.write("Click the button below to activate the microphone. The assistant will listen, transcribe, and respond.")
        
        # Audio record button trigger
        if st.button("🎙️ LISTEN & EXECUTE", type="primary", use_container_width=True):
            status_container = st.empty()
            status_container.markdown('<div class="status-listening">🟢 Listening... Speak your command now.</div>', unsafe_allow_html=True)
            
            # Use speech recognition with Microphone
            recognizer = sr.Recognizer()
            try:
                with sr.Microphone() as source:
                    # Adjust for background noise
                    recognizer.adjust_for_ambient_noise(source, duration=0.8)
                    audio_data = recognizer.listen(source, timeout=5, phrase_time_limit=8)
                
                status_container.markdown("⏳ Processing speech transcription...")
                text = recognizer.recognize_google(audio_data)
                
                st.session_state.last_transcription = text
                
                # Execute command
                response, action = execute_command(text)
                st.session_state.last_response = response
                st.session_state.last_action = action
                
                # Append to history
                st.session_state.chat_history.append({"user": text, "assistant": response})
                
                status_container.empty()
                st.rerun()
                
            except sr.WaitTimeoutError:
                status_container.error("Timeout: No speech detected. Please try again.")
            except sr.UnknownValueError:
                status_container.error("Could not understand the audio. Make sure you are speaking clearly.")
            except sr.RequestError as e:
                status_container.error(f"Google speech API request error: {e}")
            except OSError as e:
                status_container.error(f"Microphone connection issue: {e}. Check device permissions.")
                st.info("💡 Try using 'Text Command' mode or uploading an audio file.")

    # 2. UPLOAD AUDIO FILE
    elif input_mode == "📤 Upload Audio File":
        uploaded_file = st.file_uploader("Upload a Speech WAV File", type=["wav"])
        if uploaded_file is not None:
            if st.button("Transcribe & Execute Uploaded Audio", use_container_width=True):
                recognizer = sr.Recognizer()
                with st.spinner("Processing uploaded audio file..."):
                    try:
                        with sr.AudioFile(uploaded_file) as source:
                            audio_data = recognizer.record(source)
                        text = recognizer.recognize_google(audio_data)
                        st.session_state.last_transcription = text
                        
                        # Execute command
                        response, action = execute_command(text)
                        st.session_state.last_response = response
                        st.session_state.last_action = action
                        
                        # Add history
                        st.session_state.chat_history.append({"user": text, "assistant": response})
                        st.rerun()
                    except Exception as e:
                        st.error(f"Transcribe Error: {e}")

    # 3. TEXT COMMAND
    else:
        text_input = st.text_input("Type command here... (E.g. 'tell me a joke', 'what time is it?')")
        if st.button("Submit Command", use_container_width=True) and text_input:
            st.session_state.last_transcription = text_input
            response, action = execute_command(text_input)
            st.session_state.last_response = response
            st.session_state.last_action = action
            st.session_state.chat_history.append({"user": text_input, "assistant": response})
            st.rerun()
            
    st.markdown('</div>', unsafe_allow_html=True)

    # Output Response Panel (shows if we have a last transcription)
    if st.session_state.last_transcription:
        st.markdown('<div class="glass-card">', unsafe_allow_html=True)
        st.subheader("🔊 Assistant Response")
        
        # User input display
        st.markdown(f"**You said:** *\"{st.session_state.last_transcription}\"*")
        
        # Wave animation
        st.markdown("""
        <div class="wave-container">
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
        </div>
        """, unsafe_allow_html=True)
        
        # Text display
        st.markdown(f"<div style='font-size:18px; margin: 15px 0; color:#cbd5e1;'><strong>Speech Output:</strong> {st.session_state.last_response}</div>", unsafe_allow_html=True)
        
        # Generate TTS Audio response dynamically
        audio_file = generate_voice_audio(st.session_state.last_response)
        if audio_file:
            try:
                st.audio(audio_file, format="audio/mp3", autoplay=True)
            except TypeError:
                st.audio(audio_file, format="audio/mp3")
            
        # Context-specific action card outputs
        action = st.session_state.last_action
        if action:
            st.markdown("---")
            if action["type"] == "clock":
                st.metric(label="⏰ Current Time", value=action["value"])
            elif action["type"] == "calendar":
                st.metric(label="📅 Current Date", value=action["value"])
            elif action["type"] == "link":
                st.success(f"🌐 Link launched in host browser!")
                st.link_button(f"Go to {action['label']}", action["url"])
            elif action["type"] == "search":
                st.success(f"🔍 Searched Google!")
                st.link_button(f"View Search Results", action["url"])
            elif action["type"] == "math":
                st.info(f"🔢 Expression: `{action['expr']}`  ➔  **Result: {action['result']}**")
            elif action["type"] == "joke":
                st.markdown(f"🎭 **Punchline Card:** *{action['text']}*")
            elif action["type"] == "note_saved":
                st.success(f"📝 Note added to sidebar list!")
                
        st.markdown('</div>', unsafe_allow_html=True)

# Right Column: Education & Voice command cheatsheet
with col_right:
    # Cheatsheet Card
    st.markdown('<div class="glass-card">', unsafe_allow_html=True)
    st.subheader("📜 Voice Commands List")
    st.write("Say any of these trigger words to execute commands:")
    
    st.markdown("""
    * <span class="cmd-badge">time</span> Ask: *What is the time?*
    * <span class="cmd-badge">date</span> or <span class="cmd-badge">day</span> Ask: *What day is it?*
    * <span class="cmd-badge">open youtube</span> launch YouTube page
    * <span class="cmd-badge">open google</span> launch Google home
    * <span class="cmd-badge">open github</span> launch GitHub
    * <span class="cmd-badge">search for [query]</span> search query on Google
    * <span class="cmd-badge">write a note [text]</span> save written note to sidebar
    * <span class="cmd-badge">read notes</span> reads back your notes
    * <span class="cmd-badge">calculate [math]</span> solve e.g. *calculate 5 plus 10*
    * <span class="cmd-badge">joke</span> request a programming joke
    """, unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

    # Theoretical Pipeline Explanation Card
    st.markdown('<div class="glass-card">', unsafe_allow_html=True)
    st.subheader("📚 Speech Recognition Basics")
    st.markdown("""
    The Voice AI Assistant follows a **Speech Recognition Pipeline** to convert physical vocal signals into actions:
    
    1. **Signal Capture (Microphone):**
       The microphone converts acoustic sound waves in the air into digital electrical signals.
    2. **Ambient Noise Calibration:**
       `recognizer.adjust_for_ambient_noise` calibrates the microphone threshold to match background noise, ignoring fans or room hums.
    3. **Acoustic Signal Parsing (Google Speech Web API):**
       Vocal features (phonemes) are extracted and compared against linguistic models using neural networks to transcribe spoken audio into plain English text.
    4. **Command Execution & Intent Extraction:**
       Python logic parses keywords/entities from the string (like mathematical operations or search targets) and triggers local OS functions.
    5. **Speech Synthesis (TTS):**
       Google Text-to-Speech (`gTTS`) or offline `pyttsx3` reconstructs digital speech from response text to speak back answers.
    """)
    st.markdown('</div>', unsafe_allow_html=True)

# Session Chat Log History Footer
if st.session_state.chat_history:
    st.markdown("---")
    st.subheader("💬 Command Transcript History")
    for chat in reversed(st.session_state.chat_history[-5:]): # last 5 interactions
        st.markdown(f"👤 **You:** {chat['user']}")
        st.markdown(f"🤖 **Assistant:** {chat['assistant']}")
        st.markdown("---")
