from utils.resources import get_templates, get_elements, get_avatars, get_images


class ResourcesService:
    def __init__(self):
        pass

    def get_templates(self):
        return get_templates()

    def get_elements(self):
        return get_elements()
    
    def get_avatars(self):
        return get_avatars()
    
    def get_images(self):
        return get_images()
    

def get_resources_service() -> ResourcesService:
    return ResourcesService()