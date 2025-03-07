import React, {ForwardedRef} from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import styles from '@styles/styles';

type FormScrollViewProps = ScrollViewProps & {
    /** Form elements */
    children: React.ReactNode;
};

function FormScrollView({children, ...rest}: FormScrollViewProps, ref: ForwardedRef<ScrollView>) {
    return (
        <ScrollView
            style={[styles.w100, styles.flex1]}
            ref={ref}
            contentContainerStyle={styles.flexGrow1}
            keyboardShouldPersistTaps="handled"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        >
            {children}
        </ScrollView>
    );
}

FormScrollView.displayName = 'FormScrollView';

export default React.forwardRef(FormScrollView);
