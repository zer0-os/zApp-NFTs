import { ReactNode, useEffect, useRef, useState } from 'react';

//////////////////////////
// Dynamic Size Wrapper //
//////////////////////////

export interface DynamicSizeWrapperProps {
	className?: string;
	children: ReactNode;
}

export const DynamicSizeWrapper = ({
	className,
	children,
}: DynamicSizeWrapperProps) => {
	const ref = useRef<HTMLDivElement>();
	const [breakpoints, setBreakpoints] = useState<string | undefined>();

	useEffect(() => {
		if (!ref) {
			return;
		}

		const resizeObserver = new ResizeObserver((event) => {
			const width = event[0].contentBoxSize[0].inlineSize;
			const breakpointWidths = Array.from(
				{ length: Math.ceil(width / 50) },
				(_, i) => i * 50,
			);
			setBreakpoints(breakpointWidths.join('-'));
		});

		resizeObserver.observe(ref.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, [ref]);

	return (
		<div
			className={className}
			ref={ref}
			data-container-breakpoints={breakpoints}
		>
			{children}
		</div>
	);
};
