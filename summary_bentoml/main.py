from transformers import AutoModelWithLMHead, AutoTokenizer
from service import TransformerService
import torch

if __name__ == '__main__':
    ts = TransformerService()
    model = AutoModelWithLMHead.from_pretrained("hyunwoongko/kobart")
    model.load_state_dict(torch.load("sd2.pt"))
    tokenizer = AutoTokenizer.from_pretrained("hyunwoongko/kobart")
    artifact = {"model": model, "tokenizer": tokenizer}
    ts.pack("BartModel", artifact)
    saved_path = ts.save()
