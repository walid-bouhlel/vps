import styles from './Loader.module.scss';

export const Loader = () => {
    return <div className={styles['loader-container']} ><div className={styles['custom-loader']}></div></div >
}