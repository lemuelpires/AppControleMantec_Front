export const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    width: '100%',
    maxWidth: '850px',
    inset: 'auto',
    zIndex: 10000,
  },
};