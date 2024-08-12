import { useRef, useState } from "react";

export const FileUploadComponent = () => {
  const [imageURL, setImageURL] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageDataUrl = URL.createObjectURL(file);
      setImageURL(imageDataUrl); // Näyttää valitun kuvan esikatselun
      // await handleSetMaterials(imageDataUrl); // Käynnistä materiaalien tunnistus
    }
  };

  return (
    <div>
      <button onClick={() => fileInputRef.current!.click()}>Lisää kuva</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
      />
      {imageURL && <img src={imageURL} width={100} alt="Esikatselu" />}
    </div>
  );
};
