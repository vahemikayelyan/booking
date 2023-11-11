import librosa

# Load the audio file
y, sr = librosa.load('public/output/harut/vocals_denoised.wav')

# Detect onsets
onsets = librosa.onset.onset_detect(y=y, sr=sr)

# Convert frame indices to time
onset_times = librosa.frames_to_time(onsets, sr=sr)

# Write the onset times to a file
with open('vocal_start_times.txt', 'w') as file:
    for time in onset_times:
        file.write(f"Vocal starts at: {time} seconds\n")
