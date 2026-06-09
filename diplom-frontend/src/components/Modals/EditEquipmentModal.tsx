import React, { useState, useEffect } from 'react';
import { Overlay, Modal, Actions, Button, Input, Label } from '../Modals/EditEquipmentModal.styled';

interface EditEquipmentModalProps {
  open: boolean;
  equipment: any;
  onClose: () => void;
  onSave: (updatedData: any) => void;
}

const EditEquipmentModal: React.FC<EditEquipmentModalProps> = ({
  open,
  equipment,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    inventory_number: '',
    status: '',
    count: '',
  });

  useEffect(() => {
    if (equipment) {
      setFormData({
        name: equipment.name || '',
        model: equipment.model || '',
        inventory_number: equipment.inventory_number || '',
        status: equipment.status || '',
        count: equipment.count || '',
      });
    }
  }, [equipment]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <h3>Редактировать оборудование</h3>
        <Label>Название</Label>
        <Input name="name" value={formData.name} onChange={handleChange} />

        <Label>Модель</Label>
        <Input name="model" value={formData.model} onChange={handleChange} />

        {/* <Label>Инв. №</Label>
        <Input name="inventory_number" value={formData.inventory_number} onChange={handleChange} /> */}

        {/* <Label>Статус</Label>
        <Input name="status" value={formData.status} onChange={handleChange} />

        <Label>Количество</Label>
        <Input name="count" value={formData.count} onChange={handleChange} /> */}

        <Actions>
          <Button onClick={onClose}>Отмена</Button>
          <Button onClick={handleSave}>Сохранить</Button>
        </Actions>
      </Modal>
    </Overlay>
  );
};

export default EditEquipmentModal;