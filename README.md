# JARVIS Phone Starter

A phone-friendly Progressive Web App (PWA) prototype. It can be opened in Android Chrome and added to the Home screen.

## Use it on your Android phone
1. Extract this ZIP using your phone's Files app.
2. Open the folder in a code editor such as Acode or Spck Editor.
3. To install as a PWA, the files must be hosted over HTTPS (or localhost). A simple option is to create a private GitHub repository, upload these files, enable GitHub Pages, and open the published HTTPS address in Chrome.
4. In Chrome, open the site menu (⋮) and choose **Add to Home screen** or **Install app**, if shown.
5. Allow microphone permission when prompted. Voice recognition depends on browser/device support.

## What works now
- Mobile-first JARVIS chat interface
- Hindi speech input (Chrome SpeechRecognition support required)
- Hindi/English speech output using available device voices
- Male/Female voice preference tries to match installed voice names
- Basic local demo replies
- PWA manifest and offline app-shell cache

## What is not connected yet
This is not a real AI assistant yet. The replies are demo responses. For real AI, create a small HTTPS backend that calls your chosen AI provider, then connect this app to that backend. Keep API keys on the backend only—never inside app.js or any public frontend file.

## Phone-only path
You can edit the frontend on your phone. A cloud development environment or hosted backend is needed for a production AI service. An APK build is a later optional step; a PWA can be installed from Chrome without Android Studio.
