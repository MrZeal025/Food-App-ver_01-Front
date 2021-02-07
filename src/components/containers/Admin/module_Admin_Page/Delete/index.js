import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

// notification
import { toast } from 'react-toastify';
import SuccessToast from '../../../../common/toastSuccess';
import ErrorToast from '../../../../common/toastError';

toast.configure();

const token = localStorage.getItem('accessToken');
const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization" : token
    },
};

export class index extends Component {

    // toast notification
    // pre loaded function for toast notification
    ErrorToast = (ERROR_MSG) => {
        toast(<ErrorToast ERROR_MSG={ERROR_MSG}/>,{
            className: "stack-toast-error",
            position: "bottom-left",
            autoClose: 8000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true
        });
    };
    
    SuccessToast = (SUCCESS_MSG) => {
        toast(<SuccessToast SUCCESS_MSG={SUCCESS_MSG}/>,{
            className: "stack-toast",
            position: "bottom-left",
            autoClose: 8000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true
        });
    };

    deleteData = async (_id) => {
        const { handleClose, removeRecipe } = this.props
        try {
            const deleteItem = await axios.delete(`/api/recipe/delete/${_id}`, config);
            removeRecipe(deleteItem.data.data.recipe._id);
            handleClose(false);
            this.SuccessToast(deleteItem.data.data.message);
        }
        catch(error) {
            console.log(error.response)
            this.ErrorToast(error.response.data.message)
        }
    }

    render() {
        const { handleClose, show, name, _id } = this.props
        return (
            <>
                <Button className="customButton" variant="danger" onClick={() => handleClose(true)}>
                    Remove Recipe
                </Button>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                    <Modal.Title>Remove Recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete the recipe named <strong>"{name}"?</strong>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={ () => handleClose(false)}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => this.deleteData(_id)}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default index
