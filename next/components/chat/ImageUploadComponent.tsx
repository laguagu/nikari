import { useState, useRef, useEffect } from 'react';

interface ImageUploadComponentProps {
  onCapture: (imageSrc: string) => void;
}

function ImageUploadComponent({ onCapture }: ImageUploadComponentProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); // Lisätty canvasRef

  useEffect(() => {
    console.log(imagePreview,"imagePreview");
  }, [imagePreview]);

  const handleCameraClick = async () => {
    setSelectedOption('camera');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const handleFileClick = () => {
    setSelectedOption('file');
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        setImagePreview(imageDataUrl);
        onCapture(imageDataUrl);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let stream = videoRef.current.srcObject as MediaStream;
        let tracks = stream.getTracks();

        tracks.forEach(track => track.stop());

        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return (
    <div className='flex justify-evenly'>
      <button onClick={handleCameraClick}>Käytä kameraa</button>
      <button onClick={handleFileClick}>Lisää kuva</button>
      <button onClick={captureImage}>Ota kuvankaappaus</button> {/* Lisätty nappula kuvankaappauksen ottamiseen */}
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
        accept="image/*"
      />
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas> {/* Lisätty piilotettu canvas-elementti */}

      {selectedOption === 'camera' && <video ref={videoRef} autoPlay={true} />}
      {selectedOption === 'file' && imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '50%', height: 'auto' }} />}
    </div>
  );
}

export default ImageUploadComponent;