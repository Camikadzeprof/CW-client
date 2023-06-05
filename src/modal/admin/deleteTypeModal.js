import {Button, Modal} from "react-bootstrap";
import useActions from "../../helpers/hooks/useActions";

const DeleteTypeModal = ({closeCallback, typeName, showDeleteTypeModal}) => {
    const redux = useActions();
    const deleteTypeClick = async (typeName) => {
        fetch(`/type/${typeName}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(data => data.json())
            .then(({message}) => {
                closeCallback();
                fetch('/type', {
                    method: 'GET'
                })
                    .then(data => data.json())
                    .then(types => {
                        redux.getTypes(types);
                    })
                fetch('/menu', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(data => data.json())
                    .then(menus => {
                        redux.getMenu(menus);
                    })
                    .catch(e => {
                        console.log(e.message)
                    })
            })
            .catch(e => {
                alert(e.message);
            })
    }
    return(
        <>
            <Modal
                show={showDeleteTypeModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Удалить тип</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы действительно хотите удалить данный тип?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => deleteTypeClick(typeName)}>Удалить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteTypeModal;