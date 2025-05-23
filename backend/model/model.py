import torch
from torchvision import models

class_names = ['ashy', 'belle', 'buddy', 'coco', 'flower', 'fred', 'kit', 
               'lily', 'm33y thai', 'oreo', 'pip', 'plum', 'putu', 'toothless']

def load_model(path):
    model = models.resnet18()
    model.fc = torch.nn.Linear(model.fc.in_features, len(class_names))
    model.load_state_dict(torch.load(path, map_location='cpu'))
    model.eval()
    return model

def predict(model, image_tensor):
    with torch.no_grad():
        outputs = model(image_tensor)
        _, predicted = torch.max(outputs, 1)
        return class_names[predicted.item()]
