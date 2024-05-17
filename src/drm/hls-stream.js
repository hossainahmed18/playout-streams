import VideoPlayer from '../VideoPlayer';
import { hlsMediaFormat } from '../constants';

const DrmHls = () => {
  const manifestUrl = '';

  return (
    <>
      <h1>Dash with Hls</h1>
      <VideoPlayer manifestUrl={manifestUrl} mediaFormat={hlsMediaFormat} isDrmEnabled={true} />
    </>

  );
}
export default DrmHls;