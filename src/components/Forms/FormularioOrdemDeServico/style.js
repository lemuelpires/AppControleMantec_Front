import styled from 'styled-components';

export const FormGroup = styled.div`
  margin-bottom: 15px;
  color: #333;

  label {
    color: #d9d9d9;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 20em;
    height: 1em;
`;

export const Button = styled.button`
 
`;

export const Titulo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: white;
  h2 {
    margin: 0;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

export const Espacamento = styled.div`
  display:flex;
  flex-direction: column;
`;

export const Form = styled.form`
display: flex;
flex-direction: column;
width: 100%;
justify-content: center;
`;

export const Container = styled.div`
display:flex;
  flex-direction: row;
  justify-content: center;
  align-itens:center;
  line-height: 0.8em;
`;

export const EspacamentoButton = styled.div`
display: flex;
justify-content: center;
gap: 3em;
`;

export const EspacamentoContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-itens:center;
  gap:4em;
`;

export const Select = styled.select`
 -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: default;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex
;
    -webkit-box-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    min-height: 38px;
    outline: 0 !important;
    position: relative;
    -webkit-transition: all 100ms;
    transition: all 100ms;
    background-color: hsla(0, 0%, 42%, 1.00);
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    width: 100%;
`;
