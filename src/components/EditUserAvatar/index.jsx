import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function EditUserAvatar() {
    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Edit avatar
    const [editAvatarFormData, setEditAvatarFormData] = useState({
        avatar: '',
    });
    const [editAvatarSubmitAlert, setEditAvatarSubmitAlert] = useState('');
    let { name } = useParams();

    const handleEditAvatar = async (event) => {
        try {
            const response = await fetch(
                `https://api.noroff.dev/api/v1/holidaze/profiles/${name}/media`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' +
                            localStorage
                                .getItem('userToken')
                                .replace(/['"]+/g, ''),
                    },
                    body: JSON.stringify(editAvatarFormData),
                }
            );
            const data = await response.json();

            if (data.errors) {
                setEditAvatarSubmitAlert(data.errors[0].message);
            }

            if (data.name) {
                localStorage.setItem('userAvatar', editAvatarFormData.avatar);
                //setEditAvatarSubmitAlert('');
                //andleClose();
                window.location.reload(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Button
                variant='outline-success'
                className={
                    localStorage.getItem('userVenueManager')
                        ? 'w-100 rounded-pill'
                        : 'px-5 rounded-pill'
                }
                onClick={handleShow}
            >
                Edit avatar
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                size='sm'
                className='mt-5'
            >
                <Modal.Body>
                    <Form.Label>Media URL</Form.Label>
                    <Form.Control
                        type='url'
                        placeholder='Enter media URL'
                        value={editAvatarFormData.avatar}
                        onChange={(e) =>
                            setEditAvatarFormData({
                                ...editAvatarFormData,
                                avatar: e.target.value,
                            })
                        }
                        autoFocus
                    />
                    <Form.Text className='text-danger'>
                        {editAvatarSubmitAlert.substring(0, 62)}
                    </Form.Text>
                </Modal.Body>
                <Modal.Footer className='d-flex'>
                    <Button
                        variant='dark rounded-pill'
                        className='px-4 w-100 col'
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        variant='success rounded-pill'
                        className='px-4 w-100 col text-nowrap'
                        onClick={handleEditAvatar}
                    >
                        Edit avatar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditUserAvatar;
