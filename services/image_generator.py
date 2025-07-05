import base64
import os
from openai import OpenAI
from PIL import Image
from io import BytesIO
from IPython.display import Image as IPImage, display

from services.prompt_generator import get_prompt, get_prompt_edit

client = OpenAI()


def generate_image(
    prompt, 
    quality, 
    size, 
    output_format,
    images_path = None
):

    if not images_path:
        result = client.images.generate(
            model="gpt-image-1",
            prompt=prompt,
            quality=quality,
            output_compression=50,
            output_format=output_format,
            size=size
        )
    else:
        result = client.images.edit(
            model="gpt-image-1",
            prompt=prompt,
            quality=quality,
            output_compression=50,
            output_format=output_format,
            size=size,
            image=images_path
        )

    return result

def save_image(result, image_path):
    # Save the image to a file
    image_base64 = result.data[0].b64_json
    image_bytes = base64.b64decode(image_base64)

    image = Image.open(BytesIO(image_bytes))
    image.save(image_path, format="JPEG", quality=95, optimize=True)
