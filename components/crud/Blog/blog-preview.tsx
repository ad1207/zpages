export default function BlogPreview({ title, body, description, author, articleDate }) {
	return (
		<div>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
				{title === '' || title === undefined ? (
					<div style={{ paddingBottom: '8px', fontSize: '24px', color: '#ccc' }}>Type a Sample Title</div>
				) : (
					<div style={{ paddingBottom: '8px', fontSize: '24px' }}>{title}</div>
				)}
			</div>
			{author === '' || author === undefined ? (
				<div>
					<span style={{ paddingBottom: '8px', fontSize: '14px', color: 'grey' }}>{author},</span>
					<span>{articleDate}</span>
				</div>
			) : (
				''
			)}

			<div>{description}</div>

			<br />

			<div></div>
		</div>
	);
}
