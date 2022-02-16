import React from 'react';

const ModalDetails = props => {

    if (!props.show) {
        return null
    }

    return (
        <div className='modal'>
            <div className='modalContent'>
                <div className='modalHeader'>
                    <h4 className='modalTitle'>Modal Title</h4>
                </div>
                <div className='modalBody'>
                    This is modal content
                </div>
                <div className='modalFooter'>
                    <button>Close</button>
                </div>
            </div>
          
        </div>
    );
}

export default ModalDetails;