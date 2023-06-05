import {Button, Modal} from "react-bootstrap";
import useActions from "../../helpers/hooks/useActions";

const DeleteMenuModal = ({closeCallback, id, showDeleteMenuModal}) => {
    const redux = useActions();
    const deleteMenuClick = async (id) => {
        fetch(`/menu/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(data => data.json())
            .then(({message}) => {
                closeCallback();
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
                show={showDeleteMenuModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Удаление блюда</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы действительно хотите удалить данное блюдо из меню?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => deleteMenuClick(id)}>Удалить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteMenuModal;