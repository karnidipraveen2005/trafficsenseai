import cv2
import os

def enhance_image(input_path, output_path=None, clip_limit=9.0, tile_grid_size=(8, 8)):
    """
    Enhances poor visibility/lighting in traffic camera images using CLAHE 
    (Contrast Limited Adaptive Histogram Equalization) on the L-channel of the LAB color space.
    
    This algorithm was migrated and refined from the original `Dont_change/first.py` and `views.py`.
    
    Args:
        input_path (str): Absolute or relative path to the input image file.
        output_path (str, optional): Path to save the enhanced image. If None, it just returns the array.
        clip_limit (float): Threshold for contrast limiting (default: 9.0).
        tile_grid_size (tuple): Grid size for histogram equalization (default: 8x8).
        
    Returns:
        numpy.ndarray: The enhanced image array in BGR format, ready for display or further ML pipelines.
    """
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Input image not found at path: {input_path}")
        
    # 1. Read the image in Color (BGR)
    img = cv2.imread(input_path, 1)
    if img is None:
        raise ValueError(f"OpenCV could not decode the image from {input_path}. Ensure it's a valid format.")
        
    # 2. Convert image from BGR to LAB color model
    # The LAB color space is ideal because it separates luminance (L) from color data (A and B).
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    
    # 3. Split the LAB image into distinct L, A, and B channels
    l, a, b = cv2.split(lab)
    
    # 4. Initialize and apply CLAHE specifically to the L (Lightness) channel
    # This enhances local contrast without massively shifting the color palette.
    clahe = cv2.createCLAHE(clipLimit=clip_limit, tileGridSize=tile_grid_size)
    cl = clahe.apply(l)
    
    # 5. Merge the CLAHE enhanced L-channel back with the original A and B channels
    limg = cv2.merge((cl, a, b))
    
    # 6. Convert the enhanced LAB image back to standard BGR model for OpenCV
    final_img = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)
    
    # 7. Save output to disk if an output path was provided
    if output_path:
        # Ensure the directory exists
        os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
        cv2.imwrite(output_path, final_img)
        print(f"Successfully saved enhanced image to: {output_path}")
        
    return final_img


if __name__ == "__main__":
    # Example execution guard for testing this module as a standalone script
    print("TrafficSenseAI Image Enhancement Module.")
    print("Import `enhance_image` into your Django views or Celery workers for traffic analysis.")
