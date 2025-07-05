import os

from services.prompt_generator import get_prompt, get_prompt_edit, get_aiweekend_prompt
from services.image_generator import get_image_generator_service

# Create imgs/ folder
destination_folder = "images_generated/"
os.makedirs(destination_folder, exist_ok=True)

quality = "low"
size = "1024x1536"
output_format = "jpeg"

# CAT WITH HAT
destination_path = f"{destination_folder}/cat_with_hat.jpg"
prompt = get_prompt_edit()
img1 = open("images/cat.jpeg", "rb")
img2 = open("images/hat.png", "rb")
images_lists = [img1, img2]

# AI WEEKEND
# destination_path = f"{destination_folder}/aiweekend.jpg"
# user_prompt = "A instagram history publishing a post about the AI weekend HACKATON"
# prompt = get_aiweekend_prompt(user_prompt)
# images_lists = None


image_generator_service = get_image_generator_service()
result = image_generator_service.generate_image(
        prompt=prompt,
        quality=quality, 
        size=size,
        output_format=output_format,
        images_list=images_lists
)
image_generator_service.save_image(result, destination_path)