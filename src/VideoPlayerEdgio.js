import React, { useEffect, useRef } from 'react';
import shaka from 'shaka-player';
import {
  fairplayDrmType,
  hlsMediaFormat,
  fairplayServerUri,
  fairplayCertificateUri,
} from './constants';

const VideoPlayerEdgio = ({ manifestUrl, isDrmEnabled, mediaFormat }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    shaka.polyfill.installAll();
    if (mediaFormat === hlsMediaFormat) {
      shaka.polyfill.PatchedMediaKeysApple.install();
    }

    if (shaka.Player.isBrowserSupported()) {
      const player = new shaka.Player(videoRef.current);

      if (isDrmEnabled === true) {
        player.configure({
          drm: {
            servers: {
              [fairplayDrmType]: fairplayServerUri,
            },
            advanced: {
              [fairplayDrmType]: {
                'serverCertificateUri': fairplayCertificateUri,
              },
            },
          },
        });
      }

      player.getNetworkingEngine().registerRequestFilter((type, request) => {
        console.log('In registerRequestFilter');
        if (type !== shaka.net.NetworkingEngine.RequestType.LICENSE) {
          return;
        }
        const skdUri = shaka.util.StringUtils.fromBytesAutoDetect(request.initData);
        const licenseServerUri = skdUri.replace('skd://', 'https://');
        request.drmInfo.licenseServerUri = licenseServerUri;
        request.uris[0] = licenseServerUri;
        const originalPayload = new Uint8Array(request.body);
        const base64Payload = shaka.util.Uint8ArrayUtils.toStandardBase64(originalPayload);
        request.headers['Content-Type'] = 'application/json';
        request.body = JSON.stringify({ spc: base64Payload });
      });
      player.getNetworkingEngine().registerResponseFilter((type, response) => {
        if (type !== shaka.net.NetworkingEngine.RequestType.LICENSE) {
          return;
        }
        let utf8ResponseData = shaka.util.StringUtils.fromUTF8(response.data);
        utf8ResponseData = utf8ResponseData.trim();
        const jsonResponseData = JSON.parse(utf8ResponseData);
        response.data = shaka.util.Uint8ArrayUtils.fromBase64(jsonResponseData.ckc).buffer;
      });

      player.load(manifestUrl)
        .then(() => {
          console.log('The video has been loaded.');
        })
        .catch((error) => {
          console.error('Error loading the video:', error);
        });

    } else {
      console.error('Browser not supported.');
    }
  }, [manifestUrl]);

  return (
    <div>
      <video ref={videoRef} width="640" height="360" controls autoPlay />
    </div>
  );
}

export default VideoPlayerEdgio;