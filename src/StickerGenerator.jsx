import React, { useState } from 'react';

const StickerGenerator = () => {
    const [inputValue, setInputValue] = useState('');
    const [stickerUrl, setStickerUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const generateSticker = async () => {
        if (!inputValue.trim()) {
            setError('Por favor, digite algo para gerar uma figurinha');
            return;
        }

        setLoading(true);
        setError('');
        setStickerUrl('');

        try {
            const apiKey = process.env.REACT_APP_HUGGINGFACE_API_KEY;
            if (!apiKey) {
                throw new Error('API Key do Hugging Face não configurada');
            }

            const response = await fetch(
                'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-v1-5',
                {
                    headers: { Authorization: `Bearer ${apiKey}` },
                    method: 'POST',
                    body: JSON.stringify({ inputs: inputValue }),
                }
            );

            if (!response.ok) throw new Error('Erro ao gerar figurinha');

            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            setStickerUrl(imageUrl);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sticker-generator">
            <input
                type="text"
                placeholder="Ex: Gato cyberpunk roxo neon"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="text-input"
                onKeyPress={(e) => e.key === 'Enter' && generateSticker()}
                disabled={loading}
            />
            <button onClick={generateSticker} className="generate-button" disabled={loading}>
                {loading ? '⏳ GERANDO...' : '✨ GERAR FIGURINHA'}
            </button>
            {error && <p className="error-message">{error}</p>}
            {stickerUrl && (
                <div>
                    <img src={stickerUrl} alt="Generated sticker" className="sticker-image" />
                    <a href={stickerUrl} download="figurinha.png" className="download-button">
                        📥 Baixar Figurinha
                    </a>
                </div>
            )}
        </div>
    );
};

export default StickerGenerator;