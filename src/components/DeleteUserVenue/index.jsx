import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function DeleteUserVenue(props) {
    const navigate = useNavigate();

    // Modal
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    // Delete venue
    const handleDeleteVenue = async () => {
        try {
            const response = await fetch(
                `https://api.noroff.dev/api/v1/holidaze/venues/${props.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' +
                            localStorage
                                .getItem('userToken')
                                .replace(/['"]+/g, ''),
                    },
                }
            );
            const data = response.text();
            if (data) {
                navigate(
                    `/profile/${localStorage
                        .getItem('userName')
                        .replace(/['"]+/g, '')}`
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Buttons enter keypress
    function handleKeyDownOpen(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleOpen();
        }
    }
    function handleKeyDownDelete(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleDeleteVenue();
        }
    }
    function handleKeyDownClose(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleClose();
        }
    }
    return (
        <Col>
            <Button
                variant='outline-danger'
                className='rounded-pill w-100'
                onClick={handleOpen}
                onKeyDown={handleKeyDownOpen}
            >
                Delete
            </Button>

            <Modal
                show={open}
                onHide={handleClose}
                animation={false}
                size='sm'
                className='mt-5'
            >
                <Modal.Body>
                    <p className='text-danger'>
                        Are you sure you want to delete this venue? Once deleted
                        it cannot be recovered.
                    </p>
                </Modal.Body>
                <Modal.Footer className='d-flex'>
                    <Button
                        variant='outline-danger rounded-pill'
                        className='px-4 w-100 col text-nowrap'
                        onClick={handleDeleteVenue}
                        onKeyDown={handleKeyDownDelete}
                    >
                        Delete
                    </Button>
                    <Button
                        variant='dark rounded-pill'
                        className='px-4 w-100 col'
                        onClick={handleClose}
                        onKeyDown={handleKeyDownClose}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
}

export default DeleteUserVenue;
