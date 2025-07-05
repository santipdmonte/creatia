import os

from services.image_generator import generate_image, save_image
from services.prompt_generator import get_prompt, get_prompt_edit


# Create imgs/ folder
destination_folder = "images_generated/"
os.makedirs(destination_folder, exist_ok=True)

# prompt = get_prompt()
# destination_path = f"{destination_folder}/glorptak.jpg"

destination_path = f"{destination_folder}/cat_with_hat.jpg"
prompt = get_prompt_edit()
img1 = open("images/cat.jpeg", "rb")
img2 = open("images/hat.png", "rb")
images_path = [img1, img2]

quality = "low" # medium, high, or low
size = "1024x1536" # 1024x1024, 1024x1536, 1536x1024
output_format = "jpeg" # jpeg, png, webp **PNG for transparent backgrounds**


result1 = generate_image(prompt, quality, size, output_format, images_path)
save_image(result1, destination_path)