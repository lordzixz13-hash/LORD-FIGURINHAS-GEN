import React, { useState } from 'react';
import StickerGenerator from './StickerGenerator';
import './index.css';

function App() {
    return (
        <div className="card">
            <h1>🎨 LORD FIGURINHAS GEN</h1>
            <p>Gere figurinhas incríveis com IA</p>
            <StickerGenerator />
        </div>
    );
}

export default App;