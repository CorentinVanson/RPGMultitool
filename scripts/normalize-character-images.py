from pathlib import Path
from PIL import Image


TARGET_RATIO = 1, 1
directories = (Path('public/images/npcs'), Path('public/images/enemies'))
paths = [path for directory in directories for path in sorted(directory.glob('*.png'))]


def crop_height(image: Image.Image, target_height: int) -> Image.Image:
    while image.height > target_height:
        alpha = image.getchannel('A')
        top = alpha.crop((0, 0, image.width, 1)).getbbox() is None
        bottom = alpha.crop((0, image.height - 1, image.width, image.height)).getbbox() is None
        if top:
            image = image.crop((0, 1, image.width, image.height))
        elif bottom:
            image = image.crop((0, 0, image.width, image.height - 1))
        else:
            image = image.crop((0, 0, image.width, image.height - 1))
    return image


for path in paths:
    image = Image.open(path)
    alpha = image.getchannel('A') if 'A' in image.getbands() else None
    bounds = alpha.getbbox() if alpha else image.getbbox()
    if not bounds:
        print(f'{path}: image vide, ignoree')
        continue

    image = image.crop(bounds)
    width, height = image.size
    target_width = min(width, round(height * TARGET_RATIO[0] / TARGET_RATIO[1]))
    target_height = min(height, round(width * TARGET_RATIO[1] / TARGET_RATIO[0]))
    if height > target_height:
        image = crop_height(image, target_height)
    elif width > target_width:
        left = (width - target_width) // 2
        image = image.crop((left, 0, left + target_width, height))
    image.save(path, format='PNG', optimize=True)
    print(path)