import VideoPlayer from '../VideoPlayer';

const NonDrmHls = () => {
  const manifestUrl = 'https://content.uplynk.com/channel/8c309167501a4b4788f40103e14c8a56.m3u8?ts=1715753100';
  return (
    <>
      <h1>hls with non drm</h1>
      <VideoPlayer manifestUrl={manifestUrl} />
    </>
  );
}
export default NonDrmHls;