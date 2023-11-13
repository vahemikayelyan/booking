import noisereduce
import librosa
import soundfile

# Load audio file
file_path = 'public/output/harut/vocals.wav'
y, sr = librosa.load(file_path, sr=None)

# Perform noise reduction
reduced_noise = noisereduce.reduce_noise(y, sr)

# Save the result using soundfile.write
soundfile.write('public/output/harut/denoised.wav', reduced_noise, sr)
