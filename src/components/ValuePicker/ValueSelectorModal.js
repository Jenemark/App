import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import Modal from '@components/Modal';
import ScreenWrapper from '@components/ScreenWrapper';
import SelectionList from '@components/SelectionList';
import styles from '@styles/styles';
import CONST from '@src/CONST';

const propTypes = {
    /** Whether the modal is visible */
    isVisible: PropTypes.bool.isRequired,

    /** Current value selected  */
    currentValue: PropTypes.string,

    /** Items to pick from */
    items: PropTypes.arrayOf(PropTypes.shape({value: PropTypes.string, label: PropTypes.string})),

    /** The selected item */
    selectedItem: PropTypes.shape({value: PropTypes.string, label: PropTypes.string}),

    /** Label for values */
    label: PropTypes.string,

    /** Function to call when the user selects a item */
    onItemSelected: PropTypes.func,

    /** Function to call when the user closes the modal */
    onClose: PropTypes.func,
};

const defaultProps = {
    currentValue: '',
    items: [],
    selectedItem: {},
    label: '',
    onClose: () => {},
    onItemSelected: () => {},
};

function ValueSelectorModal({currentValue, items, selectedItem, label, isVisible, onClose, onItemSelected}) {
    const [sectionsData, setSectionsData] = useState([]);

    useEffect(() => {
        const itemsData = _.map(items, (item) => ({value: item.value, keyForList: item.value, text: item.label, isSelected: item === selectedItem}));
        setSectionsData(itemsData);
    }, [items, selectedItem]);

    return (
        <Modal
            type={CONST.MODAL.MODAL_TYPE.RIGHT_DOCKED}
            isVisible={isVisible}
            onClose={onClose}
            onModalHide={onClose}
            hideModalContentWhileAnimating
            useNativeDriver
        >
            <ScreenWrapper
                style={[styles.pb0]}
                includePaddingTop={false}
                includeSafeAreaPaddingBottom={false}
                testID="ValueSelectorModal"
            >
                <HeaderWithBackButton
                    title={label}
                    onBackButtonPress={onClose}
                />
                <SelectionList
                    sections={[{data: sectionsData}]}
                    onSelectRow={onItemSelected}
                    initiallyFocusedOptionKey={currentValue}
                />
            </ScreenWrapper>
        </Modal>
    );
}

ValueSelectorModal.propTypes = propTypes;
ValueSelectorModal.defaultProps = defaultProps;
ValueSelectorModal.displayName = 'ValueSelectorModal';

export default ValueSelectorModal;
