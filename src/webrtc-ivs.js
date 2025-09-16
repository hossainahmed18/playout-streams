
import React, { useEffect, useRef, useState } from "react";
import { Stage, StageEvents, SubscribeType } from "amazon-ivs-web-broadcast";

export default function App() {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let stage;

    async function init() {
      try {
        const res = await fetch(""); 
        if (!res.ok) throw new Error("Failed to fetch token");
        const responseBody = await res.json();
        const strategy = {
          stageStreamsToPublish() {
            return [];
          },
          shouldPublishParticipant() {
            return false;
          },
          shouldSubscribeToParticipant(participant) {
            return SubscribeType.AUDIO_VIDEO;
          }
        };
        stage = new Stage(responseBody.participantToken.token, strategy);
        stage.on(StageEvents.STAGE_PARTICIPANT_STREAMS_ADDED, (participant, streams) => {
          console.log("Participant streams added:", participant.id, streams);
          if (videoRef.current) {
            const mediaStream = new MediaStream();
            streams.forEach((stream) => {
              console.log("Adding stream track:", stream.streamType, stream.mediaStreamTrack);
              mediaStream.addTrack(stream.mediaStreamTrack);
            });
            console.log("Setting srcObject with tracks:", mediaStream.getTracks().length);
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play().catch(e => console.log("Play failed:", e));
          }
        });
        stage.on(StageEvents.STAGE_PARTICIPANT_LEFT, (participant) => {
          console.log("Participant left:", participant.id);
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
        });
        stage.on(StageEvents.STAGE_CONNECTION_STATE_CHANGED, (state) => {
          console.log("Connection state changed:", state);
        });
        stage.on(StageEvents.STAGE_PARTICIPANT_STREAMS_REMOVED, (participant, streams) => {
          console.log("Participant streams removed:", participant.id);
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
        });

        await stage.join();
        console.log("Successfully joined stage as viewer");
      } catch (err) {
        console.error("Viewer error:", err);
        setError(err.message);
      }
    }

    init();
    return () => {
      if (stage) {
        console.log("Leaving stage...");
        stage.leave();
      }
    };
  }, []);

  return (
    <div className="viewer-container" style={{ padding: "20px", maxWidth: "800px", margin: "5%" }}>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        controls={true}
        style={{ 
          width: "640px", 
          height: "480px", 
          borderRadius: "12px",
          background: "#000",
          border: "2px solid #333"
        }}
        onLoadedMetadata={() => console.log("Video metadata loaded")}
        onLoadedData={() => console.log("Video data loaded")}
        onPlay={() => console.log("Video started playing")}
        onError={(e) => console.log("Video error:", e)}
      />
    </div>
  );
}
