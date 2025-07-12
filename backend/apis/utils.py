import os
from django.conf import settings
import matplotlib.pyplot as plt

def save_plot(plot_image_path):
    image_path = os.path.join(settings.MEDIA_ROOT, plot_image_path)
    os.makedirs(os.path.dirname(image_path), exist_ok=True)  # Crea el directorio si no existe
    plt.savefig(image_path)
    plt.close()

    image_url = settings.MEDIA_URL + plot_image_path
    return image_url