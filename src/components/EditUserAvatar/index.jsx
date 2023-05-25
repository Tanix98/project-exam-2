import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function EditUserAvatar() {
    // Edit avatar api call loading state
    const [isLoading, setIsLoading] = useState(false);

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

    const handleEditAvatar = async () => {
        try {
            setIsLoading(true);
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
                setIsLoading(false);
                setEditAvatarSubmitAlert(data.errors[0].message);
            }

            if (data.name) {
                setIsLoading(false);
                localStorage.setItem('userAvatar', editAvatarFormData.avatar);
                //setEditAvatarSubmitAlert('');
                //andleClose();
                window.location.reload(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Buttons enter keypress
    function handleKeyDownClose(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleClose();
        }
    }
    function handleKeyDownEdit(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleEditAvatar();
        }
    }
    function handleKeyDownOpen(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleShow();
        }
    }

    return (
        <Col>
            <Button
                variant='outline-primary'
                className='w-100 rounded-pill'
                onClick={handleShow}
                onKeyDown={handleKeyDownOpen}
            >
                Edit avatar
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                size='sm'
                className='mt-3'
            >
                <Modal.Body>
                    <Form.Label>Media URL</Form.Label>
                    <Form.Control
                        name='media'
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
                    <p className='text-danger'>
                        {editAvatarSubmitAlert.substring(0, 62)}
                    </p>
                </Modal.Body>
                <Modal.Footer className='d-flex'>
                    {isLoading && (
                        <div className='text-center vw-100'>
                            <div className='lds-dual-ring'></div>
                            <p>Loading...</p>
                        </div>
                    )}
                    {isLoading ? (
                        <Button
                            variant='primary rounded-pill'
                            className='px-4 w-100 col text-nowrap'
                            onClick={handleEditAvatar}
                            onKeyDown={handleKeyDownEdit}
                            disabled
                        >
                            Edit avatar
                        </Button>
                    ) : (
                        <Button
                            variant='primary rounded-pill'
                            className='px-4 w-100 col text-nowrap'
                            onClick={handleEditAvatar}
                            onKeyDown={handleKeyDownEdit}
                        >
                            Edit avatar
                        </Button>
                    )}
                    {isLoading ? (
                        <Button
                            variant='dark rounded-pill'
                            className='px-4 w-100 col'
                            onClick={handleClose}
                            onKeyDown={handleKeyDownClose}
                            disabled
                        >
                            Close
                        </Button>
                    ) : (
                        <Button
                            variant='dark rounded-pill'
                            className='px-4 w-100 col'
                            onClick={handleClose}
                            onKeyDown={handleKeyDownClose}
                        >
                            Close
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </Col>
    );
}

export default EditUserAvatar;
