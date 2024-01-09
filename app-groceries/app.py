from flask import Flask,request, jsonify
from flask_restful import Api
from flask_cors import CORS
from torchvision import models, transforms
from PIL import Image
import torch
from gevent.pywsgi import WSGIServer


app = Flask(__name__)
CORS(app)
api = Api(app)

model_path = '/Users/syahirghariff/Space/UM/WQF7002 AIT/Project/vgg_fruit_classifier2.pth'
model = models.vgg16(pretrained=False, num_classes=3)
model.load_state_dict(torch.load(model_path, map_location=torch.device('mps')))
model.eval()

# Define the image transformations
data_transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        image_file = request.files['image']
        image = Image.open(image_file)

        input_tensor = data_transform(image)
        input_batch = input_tensor.unsqueeze(0)

        with torch.no_grad():
            output = model(input_batch)

        return jsonify({'result': 'success', 'predictions': output.tolist()})

    except Exception as e:
        return jsonify({'result': 'error', 'message': str(e)})



if __name__ == '__main__':
    #app.run(debug=True)
    http_server = WSGIServer(('',5000), app)
    http_server.serve_forever()


