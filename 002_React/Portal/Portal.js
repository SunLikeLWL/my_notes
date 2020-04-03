import React from 'react';
 import ReactDOM, { findDOMNode } from 'react-dom';
  import CSSPropertyOperations from 'react/lib/CSSPropertyOperations';
   export default class Portal extends React.Component {
    constructor() {
        // ...  
    }
    openPortal(props = this.props) {
        this.setState({
            active: true
        });
        this.renderPortal(props);
        this.props.onOpen(this.node);
    }
    closePortal(isUnmounted = false) {
        const resetPortalState = () => {
            if (this.node) {
                ReactDOM.unmountComponentAtNode(this.node);
                document.body.removeChild(this.node);
            }
            this.portal = null;
            this.node = null;
            if (isUnmounted !== true) {
                this.setState({ active: false });
            }
        };
        if (this.state.active) {
            if (this.props.beforeClose) {
                this.props.beforeClose(this.node, resetPortalState);
            } else {
                resetPortalState();
            }
            this.props.onClose();
        }
    }
    renderPortal(props) {
        if (!this.node) {
            this.node = document.createElement('div');
            // 在节点增加到 DOM 之前，执行 CSS 防止无效的重绘 
            this.applyClassNameAndStyle(props);
            document.body.appendChild(this.node);
        } else {
            // 当新的 props 传下来的时候，更新 CSS
            this.applyClassNameAndStyle(props);
        } let children = props.children;
        // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b 
        if (typeof props.children.type === 'function') {
            children = React.cloneElement(props.children, {
                closePortal: this.closePortal
            });
        }
        this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            children,
            this.node,
            this.props.onUpdate
        );
    }
    render() {
        if (this.props.openByClickOn) {
            return React.cloneElement(this.props.openByClickOn, {
                onClick: this.handleWrapperClick
            });
        }
        return null;
    }
}