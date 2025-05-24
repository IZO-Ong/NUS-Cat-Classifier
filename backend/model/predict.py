import torch
from torchvision import models

def load_model(path, class_list):
    model = models.resnet18()
    model.fc = torch.nn.Linear(model.fc.in_features, len(class_list))
    model.load_state_dict(torch.load(path, map_location='cpu'))
    model.eval()
    model.class_names = class_list
    return model

def predict(model, image_tensor):
    with torch.no_grad():
        outputs = model(image_tensor)
        _, predicted = torch.max(outputs, 1)
        return model.class_names[predicted.item()]
