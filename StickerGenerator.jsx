import React from 'react';

const StickerGenerator = () => {
    const generateSticker = () => {
        // Functionality to generate a sticker
        console.log('Sticker generated');
    };

    return (
        <div>
            <h1>Sticker Generator</h1>
            <button onClick={generateSticker}>Generate Sticker</button>
        </div>
    );
};

export default StickerGenerator;