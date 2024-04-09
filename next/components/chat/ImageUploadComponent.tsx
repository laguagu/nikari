import { useState, useRef, useEffect } from 'react';

function ImageUploadComponent() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let stream = videoRef.current.srcObject as MediaStream;
        let tracks = stream.getTracks();

        tracks.forEach(function(track) {
          track.stop();
        });

        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return (
    <div className='flex justify-evenly'>
      <button onClick={handleCameraClick}>Käytä kameraa</button>
      <button onClick={handleFileClick}>Lisää kuva</button>
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
        accept="image/*"
      />

      {selectedOption === 'camera' && <video ref={videoRef} autoPlay={true} />}
      {selectedOption === 'file' && imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '50%', height: 'auto' }} />}
    </div>
  );
}

export default ImageUploadComponent;