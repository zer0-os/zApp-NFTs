import classNames from 'classnames/bind';

import styles from './FormErrorText.module.scss';

const cx = classNames.bind(styles);

export interface FormErrorTextProps {
	className?: string;
	text: string;
}

export const FormErrorText = ({ className, text }: FormErrorTextProps) => (
	<span className={cx(styles.Error, className)}>{text}</span>
);
