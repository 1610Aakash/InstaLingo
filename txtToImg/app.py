import torch
from torch import autocast
from diffusers import StableDiffusionPipeline
from authtoken import auth_token  # Ensure your HuggingFace token is in authtoken.py

def main():
    print("=== InstaLingo AI Image Generator ===")
    prompt = input("Enter a prompt to generate an image: ").strip()

    if not prompt:
        print("No prompt entered. Exiting.")
        return

    model_id = "CompVis/stable-diffusion-v1-4"
    device = "cuda" if torch.cuda.is_available() else "cpu"
    torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

    # Load model
    print("Loading model... This may take a moment.")
    pipe = StableDiffusionPipeline.from_pretrained(
        model_id,
        revision="fp16",
        torch_dtype=torch_dtype,
        use_auth_token=auth_token
    )
    pipe.to(device)

    # Generate image
    print("Generating image...")
    if device == "cuda":
        with autocast(device):
            result = pipe(prompt, guidance_scale=8.5)
    else:
        result = pipe(prompt, guidance_scale=8.5)

    # Save image
    image = result.images[0]
    image_path = "generated_image.png"
    image.save(image_path)

    print(f"✅ Image saved as '{image_path}'.")

if __name__ == "__main__":
    main()





