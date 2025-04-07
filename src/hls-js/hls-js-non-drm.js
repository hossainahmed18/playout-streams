import VideoPlayerHlsJs from "../VideoPlayerHlsJs";

const NonDrmHlsJs = () => {
  
  const manifestUrl = "";
  return (
    <>
      <h1>hls-js with non drm</h1>
      <VideoPlayerHlsJs src={manifestUrl} />
    </>
  );
}
export default NonDrmHlsJs;