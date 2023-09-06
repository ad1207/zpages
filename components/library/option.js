import styles from "../../styles/LeadPage.module.scss"
import { Edit,ContentCopy, Delete, ArrowDownward } from "@mui/icons-material"
import {section} from "../../utils/section"

const Option = (props) => {
	const { sectionName, index } = props;
	const handleEdit = async () => {
		console.log('handle edit method calll----------->index id--->', index);
		let initialData = {
			sectionName: sectionName,
			sectionIndex: index,
			isEdit: true,
		};
		// section.isEdit = true;
		section['currentSection'] = initialData;
		section['isEdit'] = true;
		section['mode'] = '';
		section['sectionIndex'] = index;
	};

	const handleDuplicate = () => {
		let initialData = {
			sectionName: sectionName,
			sectionIndex: index,
			isEdit: false,
		};
		section['currentSection'] = initialData;
		section['mode'] = 'duplicate';
		section['isEdit'] = false;
		section['sectionIndex'] = index;
	};

	const handleDelete = () => {
		let initialData = {
			sectionName: sectionName,
			sectionIndex: index,
			isEdit: false,
		};
		section['currentSection'] = initialData;
		section['mode'] = 'delete';
		section['isEdit'] = false;
		section['sectionIndex'] = index;
	};
	return (
		<div className={styles.flex_end}>
			<div className={styles.option} onClick={() => handleEdit()}>
				<Edit />
			</div>
			<div className={styles.option} onClick={() => handleDuplicate()}>
				<ContentCopy />
			</div>
			<div className={styles.option}>
				<ArrowDownward />
			</div>
			<div className={styles.option} style={{ backgroundColor: 'rgba(211, 68, 68, 0.979)' }} onClick={() => handleDelete()}>
				<Delete />
			</div>
		</div>
	);
};

export default Option;
