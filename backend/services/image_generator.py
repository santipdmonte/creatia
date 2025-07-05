import base64
from openai import OpenAI
from PIL import Image
from io import BytesIO
from pydantic import BaseModel
from enum import Enum
from typing import Optional, Union, List, Any

# class Quality(str, Enum):
#     low = "low"
#     medium = "medium"
#     high = "high"

# class Size(str, Enum):
#     square = "1024x1024"
#     landscape = "1536x1024"
#     portrait = "1024x1536"

# class OutputFormat(str, Enum):
#     png = "png"
#     jpeg = "jpeg"
#     webp = "webp"

class ImageGeneratorService:
    def __init__(self):
        self.client = OpenAI()

    def generate_image(
        self,
        prompt: str,
        quality: str = "medium", # low, medium, high, auto
        size: str = "1024x1024", # 1024x1024, 1536x1024, 1024x1536, 256x256, 512x512, 1792x1024, 1024x1792
        output_format: str = "png", # png, jpeg, webp
        images_list: Optional[List[Any]] = None
    ):

        if not images_list:
            result = self.client.images.generate(
                model="gpt-image-1",
                prompt=prompt,
                quality=quality,
                output_compression=50,
                output_format=output_format,
                size=size
            )
        else:
            result = self.client.images.edit(
                model="gpt-image-1",
                prompt=prompt,
                quality=quality,
                output_compression=50,
                output_format=output_format,
                size=size,
                image=images_list
            )

        return result

    def save_image(self, result, image_path):
        # Save the image to a file
        image_base64 = result.data[0].b64_json
        image_bytes = base64.b64decode(image_base64)

        image = Image.open(BytesIO(image_bytes))
        image.save(image_path, format="JPEG", quality=95, optimize=True)


def get_image_generator_service() -> ImageGeneratorService:
    return ImageGeneratorService()
