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
			{actions.map((action: ActionBlock) => (
				<li key={action.dataTestId}>
					<Action
						label={action.label}
						amountToken={action.amountToken}
						amountUsd={action.amountUsd}
						buttonComponent={() => action.buttonComponent()}
					/>
				</li>
			))}
		</ul>
	);
};

export default ActionsList;
