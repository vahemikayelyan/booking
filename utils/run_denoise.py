import noisereduce
import librosa
import soundfile

# Load audio file
file_path = 'public/uploads/nikos_vertis/accompaniment.wav'
y, sr = librosa.load(file_path, sr=None)

# Perform noise reduction
reduced_noise = noisereduce.reduce_noise(y, sr)

# Save the result using soundfile.write
soundfile.write('public/uploads/nikos_vertis/denoised.wav', reduced_noise, sr)
