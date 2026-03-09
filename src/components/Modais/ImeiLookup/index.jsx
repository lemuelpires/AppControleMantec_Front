import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import {
  ImeiModalOverlay,
  ImeiModalContent,
  ImeiModalHeader,
  ImeiModalTitle,
  ImeiModalCloseButton,
  ImeiModalForm,
  ImeiModalInput,
  ImeiModalButton,
} from './style';

const IMEI_INFO_BASE = 'https://www.imei.info/pt/?imei=';

const ImeiLookupModal = ({ isOpen, onClose }) => {
  const [imei, setImei] = useState('');

  const imeiValue = imei.trim();
  const imeiUrl = useMemo(() => (
    imeiValue ? `${IMEI_INFO_BASE}${encodeURIComponent(imeiValue)}` : ''
  ), [imeiValue]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!imeiValue) return;

    window.open(imeiUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ImeiModalOverlay onClick={onClose}>
      <ImeiModalContent onClick={(event) => event.stopPropagation()}>
        <ImeiModalHeader>
          <ImeiModalTitle>Consultar IMEI</ImeiModalTitle>
          <ImeiModalCloseButton type="button" onClick={onClose} aria-label="Fechar">
            <FaTimes size={16} />
          </ImeiModalCloseButton>
        </ImeiModalHeader>
        <ImeiModalForm onSubmit={handleSubmit}>
          <ImeiModalInput
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Digite o IMEI"
            value={imei}
            onChange={(event) => setImei(event.target.value)}
            aria-label="Digite o IMEI"
          />
          <ImeiModalButton type="submit" disabled={!imeiValue}>
            Ver modelo
          </ImeiModalButton>
        </ImeiModalForm>
      </ImeiModalContent>
    </ImeiModalOverlay>
  );
};

ImeiLookupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImeiLookupModal;
