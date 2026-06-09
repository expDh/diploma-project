// import styled from 'styled-components';

// const Overlay = styled.div`
//   position: fixed;
//   inset: 0;
//   background: rgba(0,0,0,0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Modal = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 400px;
// `;

// const Actions = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 10px;
//   margin-top: 20px;
// `;

// const Button = styled.button`
//   padding: 6px 12px;
//   cursor: pointer;
// `;

// const ConfirmDeleteModal = ({ open, user, onConfirm, onClose }) => {
//   if (!open) return null;

//   return (
//     <Overlay>
//       <Modal>
//         <h3>Подтверждение удаления</h3>
//         <p>
//           Вы точно хотите удалить пользователя <b>{user.email}</b>?
//         </p>

//         <Actions>
//           <Button onClick={onClose}>Отмена</Button>
//           <Button onClick={onConfirm}>Удалить</Button>
//         </Actions>
//       </Modal>
//     </Overlay>
//   );
// };

// export default ConfirmDeleteModal;
