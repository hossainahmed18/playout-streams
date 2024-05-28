import VideoPlayer from '../VideoPlayer';

const NonDrmHls = () => {
  const manifestUrl = '';
  return (
    <>
      <h1>hls with non drm</h1>
      <VideoPlayer manifestUrl={manifestUrl} />
    </>
  );
}
export default NonDrmHls;