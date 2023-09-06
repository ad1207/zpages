import styles from "../../styles/Template.module.scss"
import Image from "next/image"

const ListTemplate = ({onHandleClose}) =>{

    return(
    <div className={styles.temp_wrap}>
        <div className={styles.left}>

       
        <div style={{ marginTop: '20px' }} >Lead Capture - Template gallery </div>
        <div style={{ marginTop: '20px' }}>Use templates to quickly get started. Modern
SEO ready templates for better conversion.</div>


        </div>
        <div className={styles.right}>
        <div className={styles.dialog_pop}>
							<div style={{ fontSize: '20px' }}>&emsp;</div>
							<div style={{ cursor: 'pointer' }}>
								<Image src='/static/images/close.svg' alt='edit' width={16} height={16} onClick={onHandleClose} />
							</div>
						</div>

        </div>
    </div>
    );


}

export default ListTemplate;