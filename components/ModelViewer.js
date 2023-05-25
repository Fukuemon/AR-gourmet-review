import { useEffect } from 'react';

const ModelViewer = ({ src }) => {
    useEffect(() => {
        import("@google/model-viewer");
    }, []);

    return (
        <model-viewer 
        style={{ width: '100%', height: '100%' }}
        className="w-1/2 h-1/2" 
        src={src} 
        auto-rotate 
        camera-controls 
        ar></model-viewer>
    );
};

export default ModelViewer;