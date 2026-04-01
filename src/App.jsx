import React, { useState } from 'react';
import './StickerGenerator.css'; // Ensure relevant styles are defined

const StickerGenerator = () => {
    const [inputValue, setInputValue] = useState('');
    const [stickerUrl, setStickerUrl] = useState('');

    const generateSticker = async () => {
        if (!inputValue) return;
        // Integrated with Hugging Face API for generating sticker
        const response = await fetch('https://api.huggingface.co/models/YOUR_MODEL_NAME', {
            method: 'POST',
            headers: { 
                'Authorization': 'Bearer YOUR_HUGGINGFACE_API_KEY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputValue })
        });
        const data = await response.json();
        setStickerUrl(data.stickerUrl); // Adapt based on actual response
    };

    return (
        <div className="sticker-generator">
            <input
                type="text"
                placeholder="Enter text for sticker"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="text-input"
            />
            <button onClick={generateSticker} className="generate-button">GERAR FIGURINHA</button>
            {stickerUrl && <img src={stickerUrl} alt="Generated sticker" className="sticker-image" />}
        </div>
    );
};

export default StickerGenerator;
