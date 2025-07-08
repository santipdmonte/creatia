from datetime import datetime
import uuid
from pathlib import Path
import base64
from PIL import Image
from io import BytesIO

def save_image(result, image_path):
    # Save the image to a file
    image_base64 = result.data[0].b64_json
    image_bytes = base64.b64decode(image_base64)

    image = Image.open(BytesIO(image_bytes))
    image.save(image_path, format="JPEG", quality=95, optimize=True)

def generate_image_path(
        save_directory: str,
        filename_prefix: str,
        index: int,
        output_format: str
    ) -> str:
        """
        Generate a unique file path for saving images.
        """
        # Create directory if it doesn't exist
        Path(save_directory).mkdir(parents=True, exist_ok=True)
        
        # Generate unique filename with timestamp and index
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_id = str(uuid.uuid4())[:8]
        filename = f"{filename_prefix}_{index}_{timestamp}_{unique_id}.{output_format.lower()}"
        
        return str(Path(save_directory) / filename)