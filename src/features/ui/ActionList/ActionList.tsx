//- Component Imports
import Action from '../Action/Action';

//- Types Imports
import { ActionBlock } from '../../../lib/types/actions';

// Styles
import styles from './ActionsList.module.scss';

type ActionsProps = { actions: ActionBlock[] };

const ActionsList = ({ actions }: ActionsProps) => {
	return (
		<ul className={styles.Container}>
			{actions.map((action: ActionBlock, index: number) => (
				<li key={action.dataTestId}>
					<Action
						label={action.label}
						amountToken={action.amountToken}
						amountUsd={action.amountUsd}
						buttonComponent={() => action.buttonComponent(index !== 0)}
					/>
				</li>
			))}
		</ul>
	);
};

export default ActionsList;
