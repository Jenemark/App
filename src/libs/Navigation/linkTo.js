import {
    getStateFromPath,
    getActionFromState,
} from '@react-navigation/core';
import _ from 'lodash';
import NAVIGATORS from '../../NAVIGATORS';
import linkingConfig from './linkingConfig';
import getTopmostReportId from './getTopmostReportId';

export default function linkTo(navigation, path, type) {
    const normalizedPath = !path.startsWith('/') ? `/${path}` : path;
    if (navigation === undefined) {
        throw new Error("Couldn't find a navigation object. Is your component inside a screen in a navigator?");
    }

    const state = linkingConfig.getStateFromPath
        ? linkingConfig.getStateFromPath(normalizedPath, linkingConfig.config)
        : getStateFromPath(normalizedPath, linkingConfig.config);

    if (!state) {
        throw new Error('Failed to parse the path to a navigation state.');
    }

    let root = navigation;
    let current;

    // Traverse up to get the root navigation
    // eslint-disable-next-line no-cond-assign
    while ((current = root.getParent())) {
        root = current;
    }

    const action = getActionFromState(state, linkingConfig.config);

    // If action type is different than NAVIGATE we can't change it to the PUSH safely
    if (action.type === 'NAVIGATE') {
        // If this action is navigating to the report screen and the top most navigator is different from the one we want to navigate - PUSH
        if (action.payload.name === NAVIGATORS.CENTRAL_PANE_NAVIGATOR && getTopmostReportId(root.getState()) !== getTopmostReportId(state)) {
            action.type = 'PUSH';

        // If this action is navigating to the RightModalNavigator and the last route on the root navigator is also RightModalNavigator
        // then we want to replace the current RHP state with new one
        } else if (type === 'REPLACE') {
            action.type = 'REPLACE';

        // If this action is navigating to the RightModalNavigator and the last route on the root navigator is not RightModalNavigator then push
        } else if (action.payload.name === NAVIGATORS.RIGHT_MODAL_NAVIGATOR && _.last(root.getState().routes).name !== NAVIGATORS.RIGHT_MODAL_NAVIGATOR) {
            action.type = 'PUSH';
        }
    }

    if (action !== undefined) {
        root.dispatch(action);
    } else {
        root.reset(state);
    }
}
