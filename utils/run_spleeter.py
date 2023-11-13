import sys
from spleeter.separator import Separator

# Use the path provided as the first command-line argument
audio_file_path = sys.argv[1]
output_dir_path = sys.argv[2]

print(audio_file_path)
print(output_dir_path)

# Use the Separator with the default 'spleeter:2stems' configuration
separator = Separator('spleeter:2stems')

separator.separate_to_file(audio_file_path, output_dir_path)
