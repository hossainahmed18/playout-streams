import React, { useEffect, useRef } from 'react';
import shaka from 'shaka-player';
import {
  dashMediaFormat,
  widevineServerUri,
  widevineCertificateUri,
  widevineLicenceToken,
  widevineLicenceRequestHeader,
  fairplayServerUri,
  fairplayCertificateUri,
  widevineDrmType,
  fairplayDrmType
} from './constants';

const VideoPlayer =({ manifestUrl, isDrmEnabled, mediaFormat  })=> {
  const videoRef = useRef(null);

  useEffect(() => {
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      const player = new shaka.Player(videoRef.current);

      if(isDrmEnabled === true ){
        player.configure({
          drm: {
            servers: {
              [widevineDrmType] : widevineServerUri,
              [fairplayDrmType]: fairplayServerUri,
            },
            advanced: {
              [widevineDrmType]: {
                'serverCertificateUri': widevineCertificateUri,
              },
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
        if(mediaFormat === dashMediaFormat){
          request.headers[widevineLicenceRequestHeader] = widevineLicenceToken;
        }
      });
    
      player.getNetworkingEngine().registerResponseFilter((type, response) => {
        if (type !== shaka.net.NetworkingEngine.RequestType.LICENSE) {
          return;
        }
        console.log('In registerResponseFilter');
        console.log(response);
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

export default VideoPlayer;