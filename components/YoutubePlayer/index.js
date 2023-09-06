import {Close, ZoomOutMap} from "@mui/icons-material"

const YoutubePlayer = () => {
	// const videoPlayer = useSelector(state => state.layout.videoPlayer);

	// if (!videoPlayer.visible) {
	//     return null;
	// }

	return (
		<div className="custom-youtube-player">
			<iframe
				id="player"
				type="text/html"
				style={{ width: '100%', height: '100%' }}
				src={`http://www.youtube.com/embed/M7lc1UVf-VE?`}
				frameBorder="0"
			></iframe>
			<div className="close d-flex justify-content-center">
				<Close />
			</div>
			<div className="handle d-flex justify-content-center">
				<ZoomOutMap />
			</div>
		</div>
	);
};

export default YoutubePlayer;