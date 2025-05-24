import h5py
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
from torchvision import models, transforms
from PIL import Image

# ---- Custom Dataset ----
class H5ImageDataset(Dataset):
    def __init__(self, images, labels, transform=None):
        self.images = images
        self.labels = labels
        self.transform = transform

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        img = self.images[idx]
        img = Image.fromarray((img * 255).astype(np.uint8))  # convert to PIL image
        if self.transform:
            img = self.transform(img)
        return img, self.labels[idx]

# ---- Load H5 Data ----
def load_data():
    with h5py.File("Images/CatsNoCats/train.h5", "r") as f:
        train_x = np.array(f["train_set_x"][:]) / 255.0
        train_y = np.array(f["train_set_y"][:]).reshape(-1)
    with h5py.File("Images/CatsNoCats/test.h5", "r") as f:
        test_x = np.array(f["test_set_x"][:]) / 255.0
        test_y = np.array(f["test_set_y"][:]).reshape(-1)
    return train_x, train_y, test_x, test_y

# ---- Main Training ----
def main():
    train_x, train_y, test_x, test_y = load_data()

    # ImageNet-compatible transforms
    train_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(15),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    test_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    train_dataset = H5ImageDataset(train_x, torch.tensor(train_y).long(), train_transform)
    test_dataset = H5ImageDataset(test_x, torch.tensor(test_y).long(), test_transform)
    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=32)

    # ---- Load Pretrained Model ----
    model = models.resnet18(pretrained=True)
    model.fc = nn.Linear(model.fc.in_features, 2)  # binary classification
    model = model.train()

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=1e-4)
    scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=3, gamma=0.5)

    print("Training model with ResNet18...")
    for epoch in range(10):
        model.train()
        running_loss = 0
        for images, labels in train_loader:
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()
        scheduler.step()
        print(f"Epoch {epoch+1} - Loss: {running_loss:.4f}")

    # ---- Evaluate ----
    model.eval()
    correct = total = 0
    with torch.no_grad():
        for images, labels in test_loader:
            outputs = model(images)
            _, predicted = torch.max(outputs, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
    print(f"Final Test Accuracy: {100 * correct / total:.2f}%")

    # Save model
    torch.save(model.state_dict(), "cat_resnet_classifier.pt")

if __name__ == "__main__":
    main()
