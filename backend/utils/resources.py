import os
from pathlib import Path
from typing import List, Dict

def get_templates() -> List[str]:
    """
    Retrieve all template image files from resources_content/templates directory.
    
    Returns:
        List of file paths to template images
    """
    templates_dir = Path("resources_content/templates")
    if not templates_dir.exists():
        return []
    
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'}
    template_files = []
    
    for file_path in templates_dir.iterdir():
        if file_path.is_file() and file_path.suffix.lower() in image_extensions:
            template_files.append(str(file_path))
    
    return sorted(template_files)

def get_elements() -> List[str]:
    """
    Retrieve all element image files from resources_content/elements directory.
    
    Returns:
        List of file paths to element images
    """
    elements_dir = Path("resources_content/elements")
    if not elements_dir.exists():
        return []
    
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'}
    element_files = []
    
    for file_path in elements_dir.iterdir():
        if file_path.is_file() and file_path.suffix.lower() in image_extensions:
            element_files.append(str(file_path))
    
    return sorted(element_files)

def get_avatars() -> List[str]:
    """
    Retrieve all avatar image files from resources_content/avatars directory.
    
    Returns:
        List of file paths to avatar images
    """
    avatars_dir = Path("resources_content/avatars")
    if not avatars_dir.exists():
        return []
    
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'}
    avatar_files = []
    
    for file_path in avatars_dir.iterdir():
        if file_path.is_file() and file_path.suffix.lower() in image_extensions:
            avatar_files.append(str(file_path))
    
    return sorted(avatar_files)

def get_images() -> List[str]:
    """
    Retrieve all image files from resources_content/images directory.
    
    Returns:
        List of file paths to images
    """
    images_dir = Path("resources_content/images")
    if not images_dir.exists():
        return []
    
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'}
    image_files = []
    
    for file_path in images_dir.iterdir():
        if file_path.is_file() and file_path.suffix.lower() in image_extensions:
            image_files.append(str(file_path))
    
    return sorted(image_files)

def get_all_resources() -> Dict[str, List[str]]:
    """
    Retrieve all image files from all subdirectories in resources_content.
    
    Returns:
        Dictionary with keys as directory names and values as lists of file paths
    """
    return {
        'templates': get_templates(),
        'elements': get_elements(),
        'avatars': get_avatars(),
        'images': get_images()
    }

def get_all_images() -> List[str]:
    """
    Retrieve all image files from the entire resources_content directory.
    
    Returns:
        List of all image file paths from all subdirectories
    """
    all_images = []
    resources = get_all_resources()
    
    for category, files in resources.items():
        all_images.extend(files)
    
    return sorted(all_images)