import React from 'react';

class Index extends React.Component {
    render() {
        return (
            <Portal ref="myPortal">
                <Modal title="My modal"> Modal content</Modal>
            </Portal>
        )
    }
}

export default Index;