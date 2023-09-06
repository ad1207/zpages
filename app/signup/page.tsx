import styles from '../../styles/Home.module.scss';
import SignupComponent from '../../components/auth/SignupComponent';

const ForgotPassword = () => {
	return (
		<>
			<div>
				<div className={styles.login_wrap}>
					<div className={styles.login_left}>
						<div className={styles.form_block}>
							<SignupComponent />
						</div>
					</div>
					<div className={styles.login_right}>
						<div className={styles.login_right_wrap}>
							<div className={styles.right_hero}></div>
							<div className={styles.right_bottom_promo}>
								<div className={styles.right_bottom_promo_l1}>New templates to help you stand out</div>
								<div className={styles.right_bottom_promo_l2}>Landing page / Banners / Blog templates —-designed by # Webb partners-—</div>
								<div className={styles.right_bottom_promo_l3}>
									<span className={styles.xplore_templates}>Explore Templates</span>
								</div>
							</div>
							<div className={styles.right_bottom_footer}>&nbsp;</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;