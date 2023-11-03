import VideoPlayer from '../VideoPlayer';

const DrmDash = () => {
  const manifestUrl = '';
  return (
    <>
      <h1>Dash with drm</h1>
      <VideoPlayer manifestUrl={manifestUrl} />
    </>

  );
}
export default DrmDash;
