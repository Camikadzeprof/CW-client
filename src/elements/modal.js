import React from "react";
import {createPortal} from "react-dom";
import "../css/modal.css"

const appModal = document.getElementById('modal-window');

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        appModal.appendChild(this.el);
        appModal.classList.add('active');
    }

    componentWillUnmount() {
        appModal.classList.remove('active');
        appModal.removeChild(this.el);
    }

    render() {
        return createPortal(
            <>{this.props.children}</>,
            this.el);
    }

}

export default Modal;