import { Button } from '../Button';
import './style.scss';

interface ImodalProps {
    message: string,
    onClose: () => void;
    callback: (onClose: () => void) => void;
    theme?: string
}

export const Modal: React.FC<ImodalProps> = ({ onClose, message, callback, theme }) => {

    return (
        <div
            className={`modal theme-${theme === 'dark' ? 'dark' : 'light'}`}>
            <div className='modal__content'>
                <div className='modal__body'>
                    <p>{message}</p>
                </div>
                <div className='modal__footer'>
                    <Button className='modal__yes'
                        onClick={() => callback(onClose)}
                    >Yes</Button>
                    <Button className='modal__no'
                        onClick={onClose}
                    >No</Button>
                </div>
            </div>
        </div>
    )
}

