import librosa
import numpy as np
import soundfile as sf

# Load the audio file
y, sr = librosa.load('public/harut.mp3')

# Perform a short-time Fourier transform (STFT)
D = librosa.stft(y)

# Compute the magnitude of the STFT
S, phase = librosa.magphase(D)

# Estimate the noise power by averaging the first few frames
# (Assuming that the first few frames contain only noise)
n_fft = 2048 # The number of samples per STFT window
hop_length = 512 # Number of samples between successive STFT columns
n_noise_frames = 10 # Number of frames to average for noise estimate
noise_power = np.mean(np.abs(D[:, :n_noise_frames])**2, axis=1)

# Compute the spectral floor (i.e., the noise threshold)
# This value might need to be adjusted, and the method can be improved
spectral_floor = 0.02 * np.sqrt(noise_power)

# Apply the spectral floor to the magnitude
S_clean = S - spectral_floor[:, np.newaxis]
S_clean = np.maximum(S_clean, 0.0)

# Reconstruct the audio signal from the modified STFT
y_clean = librosa.istft(S_clean * phase)

# Save the denoised audio
sf.write('public/output/harut_denoised.wav', y_clean, sr)
