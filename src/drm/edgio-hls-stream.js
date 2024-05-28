import React from 'react';
import VideoPlayerEdgio from '../VideoPlayerEdgio';

import {
    hlsMediaFormat
} from './../constants';

const EdgioHlsWithDrm = () => {
    const manifestUrl = '';
    return (
        <>
            <h1>Edgio drm with Hls</h1>
            <VideoPlayerEdgio manifestUrl={manifestUrl} mediaFormat={hlsMediaFormat} isDrmEnabled={true} />
        </>
    );
}

export default EdgioHlsWithDrm;