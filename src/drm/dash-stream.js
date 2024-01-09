import VideoPlayer from '../VideoPlayer';
import { dashMediaFormat } from '../constants';

const DrmDash = () => {
  const manifestUrl = '';

  return (
    <>
      <h1>Dash with drm</h1>
      <VideoPlayer manifestUrl={manifestUrl} mediaFormat={dashMediaFormat} isDrmEnabled={true}/>
    </>

  );
}
export default DrmDash;
