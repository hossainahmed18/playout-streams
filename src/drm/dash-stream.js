import VideoPlayer from '../VideoPlayer';
import { dashMediaFormat } from '../constants';

const DrmDash = () => {
  const manifestUrl = 'https://d3pd91ann4jo3.cloudfront.net/out/v1/702926311b774ebe8edb6e03d00acfd2/14391cb3275747959942e560fed4ab60/320fb1fe8f0a41598a1add2a0c825434/index.mpd';

  return (
    <>
      <h1>Dash with drm</h1>
      <VideoPlayer manifestUrl={manifestUrl} mediaFormat={dashMediaFormat} isDrmEnabled={true}/>
    </>

  );
}
export default DrmDash;
