import os
import torch
from torchvision import datasets, transforms, models
from torch import nn, optim
from torch.utils.data import DataLoader, Subset
from sklearn.utils.class_weight import compute_class_weight
from sklearn.model_selection import train_test_split
import numpy as np
from torchvision.models import resnet18, ResNet18_Weights

# Configuration
BATCH_SIZE = 16
EPOCHS = 20
LEARNING_RATE = 0.001
IMAGE_SIZE = 224
VAL_SPLIT = 0.15
TEST_SPLIT = 0.15
SEED = 42
MODEL_PATH = "nus_cat_classifier.pt"


torch.manual_seed(SEED)
np.random.seed(SEED)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
weights = ResNet18_Weights.DEFAULT

# Data transforms
train_transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.RandomResizedCrop(IMAGE_SIZE),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(15),
    transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
    transforms.ToTensor(),
    weights.transforms()
])

test_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    weights.transforms()
])

dataset = datasets.ImageFolder('Images/NUScats/', transform=train_transform)
class_names = dataset.classes
n_classes = len(class_names)
targets = [label for _, label in dataset]

class_weights = compute_class_weight('balanced', classes=np.arange(n_classes), y=targets)
class_weights = torch.tensor(class_weights, dtype=torch.float).to(device)

indices = list(range(len(dataset)))
train_idx, temp_idx, _, temp_labels = train_test_split(
    indices, targets, test_size=VAL_SPLIT + TEST_SPLIT, stratify=targets, random_state=SEED)

val_size = int(TEST_SPLIT / (VAL_SPLIT + TEST_SPLIT) * len(temp_idx))
val_idx, test_idx = temp_idx[val_size:], temp_idx[:val_size]

train_dataset = Subset(dataset, train_idx)
val_dataset = Subset(datasets.ImageFolder('Images/NUScats/', transform=test_transform), val_idx)
test_dataset = Subset(datasets.ImageFolder('Images/NUScats/', transform=test_transform), test_idx)

train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE)
test_loader = DataLoader(test_dataset, batch_size=BATCH_SIZE)

# Model setup
model = resnet18(weights=weights)
for param in model.parameters():
    param.requires_grad = False
for param in model.layer4.parameters():
    param.requires_grad = True

model.fc = nn.Linear(model.fc.in_features, n_classes)
model = model.to(device)

criterion = nn.CrossEntropyLoss(weight=class_weights)
optimizer = optim.Adam(filter(lambda p: p.requires_grad, model.parameters()), lr=LEARNING_RATE)
scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='min', factor=0.1, patience=3)

# Evaluation function
def evaluate_model(loader):
    model.eval()
    correct = 0
    total = 0
    with torch.no_grad():
        for inputs, labels in loader:
            inputs, labels = inputs.to(device), labels.to(device)
            outputs = model(inputs)
            _, predicted = torch.max(outputs, 1)
            correct += (predicted == labels).sum().item()
            total += labels.size(0)
    return 100 * correct / total

# Training loop with early stopping and checkpointing
def train_model():
    best_val_acc = 0
    patience = 5
    patience_counter = 0

    for epoch in range(EPOCHS):
        model.train()
        running_loss = 0.0

        for inputs, labels in train_loader:
            inputs, labels = inputs.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()

        val_acc = evaluate_model(val_loader)
        scheduler.step(running_loss)

        print(f"Epoch [{epoch+1}/{EPOCHS}], Loss: {running_loss/len(train_loader):.4f}, Val Acc: {val_acc:.2f}%")

        if val_acc > best_val_acc:
            best_val_acc = val_acc
            torch.save(model.state_dict(), MODEL_PATH)
            patience_counter = 0
            print("Model saved.")
        else:
            patience_counter += 1
            if patience_counter >= patience:
                print("Early stopping.")
                break

if __name__ == "__main__":
    train_model()
    model.load_state_dict(torch.load(MODEL_PATH))
    print("Final Test Evaluation:")
    test_acc = evaluate_model(test_loader)
    print(f"Test Accuracy: {test_acc:.2f}%")
