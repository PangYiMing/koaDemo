import * as React from 'react';
import * as styles from './index.scss';

export default function() {
    return (
        <div className={styles.empty}>
            <div className={styles.icon} />
            <div className={styles.desc}>暂无内容</div>
        </div>
    );
}
